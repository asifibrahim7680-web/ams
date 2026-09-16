import React, { useState } from 'react';
import { GlassReveal, GlassRevealShape } from './ui/glass-reveal';
import { Sparkles, Compass, Eye, Sliders, Shield, Zap, RefreshCw } from 'lucide-react';

export const GlassRevealShowcase: React.FC = () => {
  const [currentShape, setCurrentShape] = useState<GlassRevealShape>('portal');
  const [lensSize, setLensSize] = useState<number>(0.34);
  const [distortion, setDistortion] = useState<number>(0.4);
  const [aberration, setAberration] = useState<number>(0.05);
  const [wobble, setWobble] = useState<number>(0.5);

  // Futuristic AMSFROST 2026 Imagery
  // Base: Dark cybernetic schematics & code terminal
  // Reveal: Radiant sky-blue quantum holographic core & hackathon arena
  const baseImg = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop';
  const revealImg = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop';

  return (
    <section id="glass-reveal" className="py-20 px-3 sm:px-6 lg:px-8 relative overflow-hidden bg-black/70 border-t border-b border-sky-400/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-400/40 text-sky-300 font-mono-tech text-xs uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>REACT BITS PRO • GLASS REVEAL</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            REFRACTIVE <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">GLASS LENS</span>
          </h2>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Hover and drag over the viewport to refract the underlying blueprint through the pointer-following optical glass lens with real-time chromatic aberration and wave portals.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visualizer Window */}
          <div className="lg:col-span-8 bg-zinc-950/90 rounded-2xl border border-sky-400/30 p-2 sm:p-3 shadow-[0_0_30px_rgba(56,189,248,0.15)] relative">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 mb-2 font-mono text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-[0_0_6px_#38BDF8]" />
                <span className="ml-2 text-zinc-300 font-semibold tracking-wider uppercase">AMSFROST_OPTICAL_CORE.SH</span>
              </div>
              <div className="flex items-center gap-2 text-sky-400 font-mono">
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline uppercase">POINTER_TRACKING_ACTIVE</span>
              </div>
            </div>

            {/* The React Bits Pro Glass Reveal Component */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
              <GlassReveal
                image={baseImg}
                revealImage={revealImg}
                shape={currentShape}
                lensSize={lensSize}
                distortion={distortion}
                aberration={aberration}
                wobble={wobble}
                wobbleSpeed={1.5}
                borderColor="#38BDF8"
                borderWidth={1.6}
                damping={0.14}
                className="w-full h-full"
              >
                {/* HUD Overlay inside lens container */}
                <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-400/30 text-sky-300 font-mono text-[10px] sm:text-xs">
                      SHAPE: <span className="font-bold text-white uppercase">{currentShape}</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-400/30 text-zinc-300 font-mono text-[10px] sm:text-xs flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-sky-400" />
                      <span>WARP {Math.round(distortion * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-sky-400/30 max-w-[280px]">
                      <div className="text-[10px] text-sky-400 font-mono font-bold tracking-wider">AMSFROST 2026 ARCHITECTURE</div>
                      <div className="text-xs text-white font-medium mt-0.5">Move pointer to reveal the quantum innovation layer</div>
                    </div>
                    <div className="hidden sm:block text-right font-mono text-[10px] text-zinc-400">
                      <span>REFRACTION: GLSL_WEBGL</span>
                    </div>
                  </div>
                </div>
              </GlassReveal>
            </div>
          </div>

          {/* Interactive Parameters Panel */}
          <div className="lg:col-span-4 bg-zinc-950/90 rounded-2xl border border-sky-400/30 p-5 shadow-lg flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Lens Parameters</h3>
            </div>

            {/* Shape Selectors */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">
                Outline Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['portal', 'blob', 'circle', 'square'] as GlassRevealShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setCurrentShape(shape)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      currentShape === shape
                        ? 'bg-sky-400 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-sky-400/40'
                    }`}
                  >
                    <span>{shape}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              {/* Lens Size */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>LENS SIZE</span>
                  <span className="text-sky-400 font-bold">{Math.round(lensSize * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.55"
                  step="0.01"
                  value={lensSize}
                  onChange={(e) => setLensSize(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Distortion */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>RADIAL DISTORTION</span>
                  <span className="text-sky-400 font-bold">{(distortion).toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="-0.3"
                  max="0.8"
                  step="0.05"
                  value={distortion}
                  onChange={(e) => setDistortion(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Chromatic Aberration */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>CHROMATIC ABERRATION</span>
                  <span className="text-sky-400 font-bold">{(aberration * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.1"
                  step="0.005"
                  value={aberration}
                  onChange={(e) => setAberration(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Wobble / Ripple */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>WOBBLE / RIPPLE</span>
                  <span className="text-sky-400 font-bold">{(wobble * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={wobble}
                  onChange={(e) => setWobble(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentShape('portal');
                  setLensSize(0.34);
                  setDistortion(0.4);
                  setAberration(0.05);
                  setWobble(0.5);
                }}
                className="text-[11px] font-mono text-zinc-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
              <span className="text-[10px] font-mono text-zinc-500">SKY BLUE #38BDF8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassRevealShowcase;
