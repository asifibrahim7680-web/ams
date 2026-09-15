import React, { useEffect, useRef } from 'react';

export interface EclipseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Playback rate of the corona drift. Default: 1 */
  speed?: number;
  /** Radius of the dark disc relative to the panel height. Default: 0.33 */
  radius?: number;
  /** Width of the disc's soft edge as a fraction of its radius. Default: 0.55 */
  edgeSoftness?: number;
  /** How far the corona extends from the disc. Default: 1 */
  reach?: number;
  /** Amplitude of the noise rippling the corona. Default: 1 */
  turbulence?: number;
  /** Strength of the rotating angular streaks. Default: 1 */
  streaks?: number;
  /** Overall intensity of the corona. Default: 1 */
  brightness?: number;
  /** Rate at which the palette cycles. Default: 1 */
  colorCycle?: number;
  /** Up to four palette colours. Omit for the full spectrum. Default: undefined */
  colors?: string[];
  /** Panel backdrop, or "transparent". Default: "#101519" */
  backgroundColor?: string;
  /** Colour of the disc itself. Default: "#101519" */
  coreColor?: string;
  /** Master opacity of the effect. Default: 1 */
  opacity?: number;
  /** Let the pointer stir the corona like a liquid. Default: true */
  cursorInteraction?: boolean;
  /** How strongly pointer motion drags and swirls the corona. Default: 1 */
  cursorStrength?: number;
  /** Size of the stirred region relative to the panel height. Default: 0.3 */
  cursorRadius?: number;
  /** Freeze the animation. Default: false */
  paused?: boolean;
  /** Upper device pixel ratio bound. Default: 1.75 */
  dpr?: number;
  /** Extra classes applied to the root. */
  className?: string;
  /** Content layered above the effect. */
  children?: React.ReactNode;
}

// Convert hex color to normalized RGB [0-1]
function hexToRgb(hex: string): [number, number, number] {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return [0.063, 0.082, 0.098]; // #101519
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

// Convert background color to RGBA [0-1]
function parseBgColor(colorStr: string): [number, number, number, number] {
  if (!colorStr || colorStr === 'transparent') {
    return [0, 0, 0, 0];
  }
  const rgb = hexToRgb(colorStr);
  return [rgb[0], rgb[1], rgb[2], 1];
}

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_speed;
uniform float u_radius;
uniform float u_edgeSoftness;
uniform float u_reach;
uniform float u_turbulence;
uniform float u_streaks;
uniform float u_brightness;
uniform float u_colorCycle;
uniform float u_opacity;
uniform float u_cursorStrength;
uniform float u_cursorRadius;
uniform float u_hasCustomColors;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec3 u_coreColor;
uniform vec4 u_bgColor;

// 2D Hash function
float hash(vec2 p) {
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(16.0 * fract(p.x * p.y * (p.x + p.y)));
}

// 2D Value Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractal Brownian Motion
float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    f += amp * noise(p);
    p = rot * p;
    amp *= 0.5;
  }
  return f;
}

void main() {
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 mouseNorm = (u_mouse - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  
  // Interactive pointer fluid displacement
  vec2 diff = st - mouseNorm;
  float mouseDist = length(diff);
  float mouseInfluence = smoothstep(u_cursorRadius, 0.0, mouseDist) * (0.18 * u_cursorStrength);
  vec2 stWarped = st - diff * mouseInfluence;

  float dist = length(stWarped);
  float angle = atan(stWarped.y, stWarped.x);

  float t = u_time * u_speed * 0.7;

  // Turbulences & rotating coronal stream rays
  float rayNoise = sin(angle * (u_streaks * 10.0 + 2.0) + t * 0.5) * 0.14;
  float turbulence1 = fbm(vec2(dist * 5.0 - t * 0.8, angle * 3.0 + t * 0.3)) * u_turbulence;
  float turbulence2 = fbm(vec2(dist * 8.0 + t * 0.4, angle * 5.0 - t * 0.5)) * u_turbulence * 0.5;
  
  float coronaDist = dist - rayNoise * 0.08 - turbulence1 * 0.12 - turbulence2 * 0.06;

  // Coronal spectral emission falloff outside the eclipse disk
  float innerGlow = smoothstep(u_radius - u_edgeSoftness, u_radius + u_edgeSoftness * 1.5, coronaDist);
  float outerFalloff = exp(-pow(max(0.0, coronaDist - u_radius) / (u_reach * 0.45 + 0.05), 1.3));
  float coronaIntensity = outerFalloff * innerGlow * u_brightness;

  // Dark central eclipse disc core mask
  float discMask = smoothstep(u_radius - u_edgeSoftness, u_radius, dist);

  // Spectral chromatic cycling & color blending
  float colorPhase = fract(u_time * u_colorCycle * 0.1 + coronaDist * 1.5 + angle * 0.159);
  vec3 col = vec3(0.0);
  
  if (u_hasCustomColors > 0.5) {
    if (colorPhase < 0.25) {
      float localT = colorPhase / 0.25;
      col = mix(u_color1, u_color2, localT);
    } else if (colorPhase < 0.5) {
      float localT = (colorPhase - 0.25) / 0.25;
      col = mix(u_color2, u_color3, localT);
    } else if (colorPhase < 0.75) {
      float localT = (colorPhase - 0.5) / 0.25;
      col = mix(u_color3, u_color4, localT);
    } else {
      float localT = (colorPhase - 0.75) / 0.25;
      col = mix(u_color4, u_color1, localT);
    }
  } else {
    // Full spectrum rainbow corona when colors prop is omitted
    col = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + colorPhase));
  }

  // Add coronal rim highlights
  float rim = smoothstep(u_radius, u_radius + 0.03, dist) * (1.0 - smoothstep(u_radius + 0.03, u_radius + 0.12, dist));
  vec3 rimColor = mix(col, vec3(1.0, 1.0, 1.0), 0.8) * rim * 1.8;

  vec3 coronaOutput = col * coronaIntensity + rimColor;

  // Base background & core disc color blending
  vec3 baseTone = mix(u_coreColor, u_bgColor.rgb, discMask);
  vec3 finalColor = mix(baseTone, coronaOutput + baseTone, clamp(coronaIntensity + rim * 0.6, 0.0, 1.0));

  float coronaAlpha = clamp(coronaIntensity + rim * 0.6, 0.0, 1.0);
  float finalAlpha = mix(u_bgColor.a, 1.0, coronaAlpha) * u_opacity;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export const Eclipse: React.FC<EclipseProps> = ({
  speed = 1.0,
  radius = 0.33,
  edgeSoftness = 0.55,
  reach = 1.0,
  turbulence = 1.0,
  streaks = 1.0,
  brightness = 1.0,
  colorCycle = 1.0,
  colors,
  backgroundColor = 'transparent',
  coreColor = '#101519',
  opacity = 1.0,
  cursorInteraction = true,
  cursorStrength = 1.0,
  cursorRadius = 0.3,
  paused = false,
  dpr = 1.75,
  className = '',
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;

    // Compile shader helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uRadius = gl.getUniformLocation(program, 'u_radius');
    const uEdgeSoftness = gl.getUniformLocation(program, 'u_edgeSoftness');
    const uReach = gl.getUniformLocation(program, 'u_reach');
    const uTurbulence = gl.getUniformLocation(program, 'u_turbulence');
    const uStreaks = gl.getUniformLocation(program, 'u_streaks');
    const uBrightness = gl.getUniformLocation(program, 'u_brightness');
    const uColorCycle = gl.getUniformLocation(program, 'u_colorCycle');
    const uOpacity = gl.getUniformLocation(program, 'u_opacity');
    const uCursorStrength = gl.getUniformLocation(program, 'u_cursorStrength');
    const uCursorRadius = gl.getUniformLocation(program, 'u_cursorRadius');
    const uHasCustomColors = gl.getUniformLocation(program, 'u_hasCustomColors');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uColor3 = gl.getUniformLocation(program, 'u_color3');
    const uColor4 = gl.getUniformLocation(program, 'u_color4');
    const uCoreColor = gl.getUniformLocation(program, 'u_coreColor');
    const uBgColor = gl.getUniformLocation(program, 'u_bgColor');

    // Parse colors
    const hasCustom = colors && colors.length > 0;
    gl.uniform1f(uHasCustomColors, hasCustom ? 1.0 : 0.0);

    if (hasCustom && colors) {
      const c1 = hexToRgb(colors[0] || '#FFFFFF');
      const c2 = hexToRgb(colors[1] || colors[0] || '#E4E4E7');
      const c3 = hexToRgb(colors[2] || colors[1] || '#A1A1AA');
      const c4 = hexToRgb(colors[3] || colors[2] || '#71717A');
      gl.uniform3f(uColor1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uColor2, c2[0], c2[1], c2[2]);
      gl.uniform3f(uColor3, c3[0], c3[1], c3[2]);
      gl.uniform3f(uColor4, c4[0], c4[1], c4[2]);
    }

    const coreRgb = hexToRgb(coreColor);
    gl.uniform3f(uCoreColor, coreRgb[0], coreRgb[1], coreRgb[2]);

    const bgRgba = parseBgColor(backgroundColor);
    gl.uniform4f(uBgColor, bgRgba[0], bgRgba[1], bgRgba[2], bgRgba[3]);

    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uRadius, radius);
    gl.uniform1f(uEdgeSoftness, edgeSoftness * 0.1);
    gl.uniform1f(uReach, reach);
    gl.uniform1f(uTurbulence, turbulence);
    gl.uniform1f(uStreaks, streaks);
    gl.uniform1f(uBrightness, brightness);
    gl.uniform1f(uColorCycle, colorCycle);
    gl.uniform1f(uOpacity, opacity);
    gl.uniform1f(uCursorStrength, cursorStrength);
    gl.uniform1f(uCursorRadius, cursorRadius);

    let animationFrameId: number;
    let accumulatedTime = 0;
    let lastTime = performance.now();

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, dpr);
      const width = Math.max(rect.width, 100);
      const height = Math.max(rect.height, 100);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let targetMouseX = canvas.width / 2;
    let targetMouseY = canvas.height / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const render = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      if (!paused) {
        accumulatedTime += delta;
      }
      gl.uniform1f(uTime, accumulatedTime);

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;
      gl.uniform2f(uMouse, currentMouseX, canvas.height - currentMouseY);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorInteraction) return;
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, dpr);
      targetMouseX = (e.clientX - rect.left) * pixelRatio;
      targetMouseY = (e.clientY - rect.top) * pixelRatio;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(vbo);
      }
    };
  }, [
    speed,
    radius,
    edgeSoftness,
    reach,
    turbulence,
    streaks,
    brightness,
    colorCycle,
    colors,
    backgroundColor,
    coreColor,
    opacity,
    cursorInteraction,
    cursorStrength,
    cursorRadius,
    paused,
    dpr,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};

export default Eclipse;
