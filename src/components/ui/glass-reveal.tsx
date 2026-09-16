import React, { useEffect, useRef, useState, useCallback } from 'react';

export type GlassRevealShape = 'circle' | 'square' | 'blob' | 'portal';

export interface GlassRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer/base image URL */
  image: string;
  /** Inner/revealed image URL refracted through the lens */
  revealImage: string;
  /** Lens outline shape: 'circle' | 'square' | 'blob' | 'portal'. Default: 'portal' */
  shape?: GlassRevealShape;
  /** Relative lens size (0.1 to 0.8). Default: 0.32 */
  lensSize?: number;
  /** Edge softness / feathering (0 to 0.5). Default: 0.06 */
  edgeSoftness?: number;
  /** Radial lens distortion/warp factor. Negative pinches, positive magnifies. Default: 0.35 */
  distortion?: number;
  /** Chromatic aberration / color fringing (0 to 0.1). Default: 0.04 */
  aberration?: number;
  /** Wobble intensity for blob and portal oscillations (0 to 1). Default: 0.45 */
  wobble?: number;
  /** Speed of wobble oscillation. Default: 1.2 */
  wobbleSpeed?: number;
  /** Wave ripple frequency for portal shape. Default: 14.0 */
  waveFrequency?: number;
  /** Speed of portal ripple waves. Default: 2.2 */
  waveSpeed?: number;
  /** Rim light border glow color (hex). Default: '#38BDF8' (sky blue) */
  borderColor?: string;
  /** Rim border intensity factor. Default: 1.4 */
  borderWidth?: number;
  /** Inertia/damping factor for pointer follow (0 to 1). Default: 0.12 */
  damping?: number;
  /** Freeze animations. Default: false */
  paused?: boolean;
  /** Custom overlay content inside container */
  children?: React.ReactNode;
  /** Additional container classes */
  className?: string;
  /** Alt description */
  alt?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return [0.22, 0.74, 0.97]; // Sky Blue #38BDF8
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FS_SOURCE = `
precision highp float;
varying vec2 v_uv;

uniform sampler2D u_texBase;
uniform sampler2D u_texReveal;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_shape; // 0: circle, 1: square, 2: blob, 3: portal
uniform float u_lensSize;
uniform float u_edgeSoftness;
uniform float u_distortion;
uniform float u_aberration;
uniform float u_wobble;
uniform float u_wobbleSpeed;
uniform float u_waveFrequency;
uniform float u_waveSpeed;
uniform vec3 u_borderColor;
uniform float u_borderWidth;

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = v_uv - u_mouse;
  p.x *= aspect;

  float d = 0.0;
  float angle = atan(p.y, p.x);
  float dist = length(p);

  if (u_shape == 0) {
    // Circle
    d = dist - u_lensSize;
  } else if (u_shape == 1) {
    // Rounded Square
    vec2 b = vec2(u_lensSize * 0.95);
    vec2 q = abs(p) - b + vec2(0.04);
    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.04;
  } else if (u_shape == 2) {
    // Organic Blob
    float t = u_time * u_wobbleSpeed;
    float deform = sin(3.0 * angle + t) * 0.12 * u_wobble +
                   cos(5.0 * angle - t * 0.8) * 0.08 * u_wobble +
                   sin(7.0 * angle + t * 1.5) * 0.04 * u_wobble;
    d = dist - (u_lensSize * (1.0 + deform));
  } else {
    // Rippling Portal
    float t = u_time * u_waveSpeed;
    float ripple = sin(dist * u_waveFrequency - t) * 0.06 * u_wobble +
                   cos(4.0 * angle + u_time * 0.7) * 0.03 * u_wobble;
    d = dist - (u_lensSize + ripple);
  }

  // Refraction and Chromatic Aberration
  float r = clamp(dist / max(u_lensSize, 0.001), 0.0, 1.8);
  float warp = u_distortion * (1.0 - r * r * 0.8);
  vec2 dir = (dist > 0.0001) ? normalize(p) : vec2(0.0);

  vec2 distortedUV = v_uv - (dir * warp * 0.12) / vec2(aspect, 1.0);

  // RGB Spectral Splitting
  float aberration = u_aberration * (r * r + 0.15);
  vec2 rUV = distortedUV - (dir * aberration * 0.04) / vec2(aspect, 1.0);
  vec2 gUV = distortedUV;
  vec2 bUV = distortedUV + (dir * aberration * 0.04) / vec2(aspect, 1.0);

  float rChan = texture2D(u_texReveal, clamp(rUV, 0.0, 1.0)).r;
  float gChan = texture2D(u_texReveal, clamp(gUV, 0.0, 1.0)).g;
  float bChan = texture2D(u_texReveal, clamp(bUV, 0.0, 1.0)).b;
  vec4 revealColor = vec4(rChan, gChan, bChan, 1.0);

  vec4 baseColor = texture2D(u_texBase, clamp(v_uv, 0.0, 1.0));

  // Masking lens border
  float edgeSmooth = max(u_edgeSoftness, 0.005);
  float mask = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

  // Optical Rim Highlight
  float rimDist = abs(d);
  float rim = smoothstep(0.015 * u_borderWidth, 0.0, rimDist);
  vec3 rimHighlight = u_borderColor * rim * 1.5;

  vec3 finalColor = mix(baseColor.rgb, revealColor.rgb, mask) + rimHighlight;
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const GlassReveal: React.FC<GlassRevealProps> = ({
  image,
  revealImage,
  shape = 'portal',
  lensSize = 0.32,
  edgeSoftness = 0.06,
  distortion = 0.35,
  aberration = 0.04,
  wobble = 0.45,
  wobbleSpeed = 1.2,
  waveFrequency = 14.0,
  waveSpeed = 2.2,
  borderColor = '#38BDF8',
  borderWidth = 1.4,
  damping = 0.12,
  paused = false,
  children,
  className = '',
  alt = 'AMSFROST Interactive Glass Reveal',
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const currentMouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle pointer tracking
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    targetMouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    // Create shader program
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('GlassReveal Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('GlassReveal Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uShape = gl.getUniformLocation(program, 'u_shape');
    const uLensSize = gl.getUniformLocation(program, 'u_lensSize');
    const uEdgeSoftness = gl.getUniformLocation(program, 'u_edgeSoftness');
    const uDistortion = gl.getUniformLocation(program, 'u_distortion');
    const uAberration = gl.getUniformLocation(program, 'u_aberration');
    const uWobble = gl.getUniformLocation(program, 'u_wobble');
    const uWobbleSpeed = gl.getUniformLocation(program, 'u_wobbleSpeed');
    const uWaveFrequency = gl.getUniformLocation(program, 'u_waveFrequency');
    const uWaveSpeed = gl.getUniformLocation(program, 'u_waveSpeed');
    const uBorderColor = gl.getUniformLocation(program, 'u_borderColor');
    const uBorderWidth = gl.getUniformLocation(program, 'u_borderWidth');
    const uTexBase = gl.getUniformLocation(program, 'u_texBase');
    const uTexReveal = gl.getUniformLocation(program, 'u_texReveal');

    // Create 1x1 placeholder texture while images load
    const createPlaceholderTexture = (r: number, g: number, b: number) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([r, g, b, 255])
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    };

    const texBase = createPlaceholderTexture(15, 23, 42); // slate 900
    const texReveal = createPlaceholderTexture(56, 189, 248); // sky 400

    let baseLoaded = false;
    let revealLoaded = false;

    // Load actual images
    const imgBase = new Image();
    imgBase.crossOrigin = 'anonymous';
    imgBase.src = image;
    imgBase.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texBase);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgBase);
      baseLoaded = true;
    };

    const imgReveal = new Image();
    imgReveal.crossOrigin = 'anonymous';
    imgReveal.src = revealImage;
    imgReveal.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texReveal);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgReveal);
      revealLoaded = true;
    };

    let animationFrameId: number;
    let startTime = performance.now();

    const shapeId = shape === 'circle' ? 0 : shape === 'square' ? 1 : shape === 'blob' ? 2 : 3;
    const borderRgb = hexToRgb(borderColor);

    const render = () => {
      if (!canvas) return;

      // Handle canvas resize
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Smooth mouse lerp
      const cur = currentMouseRef.current;
      const tgt = targetMouseRef.current;
      cur.x += (tgt.x - cur.x) * damping;
      cur.y += (tgt.y - cur.y) * damping;

      const elapsed = paused ? 0 : (performance.now() - startTime) / 1000;

      gl.useProgram(program);

      // Bind textures
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texBase);
      gl.uniform1i(uTexBase, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texReveal);
      gl.uniform1i(uTexReveal, 1);

      // Pass uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1i(uShape, shapeId);
      gl.uniform1f(uLensSize, lensSize);
      gl.uniform1f(uEdgeSoftness, edgeSoftness);
      gl.uniform1f(uDistortion, distortion);
      gl.uniform1f(uAberration, aberration);
      gl.uniform1f(uWobble, wobble);
      gl.uniform1f(uWobbleSpeed, wobbleSpeed);
      gl.uniform1f(uWaveFrequency, waveFrequency);
      gl.uniform1f(uWaveSpeed, waveSpeed);
      gl.uniform3f(uBorderColor, borderRgb[0], borderRgb[1], borderRgb[2]);
      gl.uniform1f(uBorderWidth, borderWidth);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(texBase);
      gl.deleteTexture(texReveal);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [
    image,
    revealImage,
    shape,
    lensSize,
    edgeSoftness,
    distortion,
    aberration,
    wobble,
    wobbleSpeed,
    waveFrequency,
    waveSpeed,
    borderColor,
    borderWidth,
    damping,
    paused,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        // Gently reset toward center on leave
        targetMouseRef.current = { x: 0.5, y: 0.5 };
      }}
      className={`relative overflow-hidden rounded-2xl cursor-crosshair select-none ${className}`}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ touchAction: 'none' }}
      />

      {/* Layered Content Overlay */}
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default GlassReveal;
