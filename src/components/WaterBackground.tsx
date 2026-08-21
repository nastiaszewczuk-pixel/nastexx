import React, { useEffect, useRef, useState } from 'react';
import { Waves, Sparkles, Sun, Heart, Droplets, Palette, Wind } from 'lucide-react';

export type BackgroundTheme = 'water' | 'sunset' | 'pink_lemonade' | 'desert' | 'lipgloss';

interface WaterBackgroundProps {
  children?: React.ReactNode;
  currentTheme?: BackgroundTheme;
  onThemeChange?: (theme: BackgroundTheme) => void;
}

const STORAGE_KEY = 'anastasiya_bg_theme_v2';

export const WaterBackground: React.FC<WaterBackgroundProps> = ({ 
  children, 
  currentTheme: externalTheme,
  onThemeChange: externalOnThemeChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Internal theme state with localStorage persistence
  const [theme, setThemeState] = useState<BackgroundTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as BackgroundTheme | null;
      if (saved === 'water' || saved === 'sunset' || saved === 'pink_lemonade' || saved === 'desert' || saved === 'lipgloss') {
        if (saved === 'desert') return 'sunset';
        if (saved === 'lipgloss') return 'pink_lemonade';
        return saved;
      }
    } catch {
      // fallback
    }
    return externalTheme || 'water';
  });

  const [waveSpeed, setWaveSpeed] = useState<'gentle' | 'flowing' | 'surge'>('flowing');
  const [showRipples, setShowRipples] = useState<boolean>(true);
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number; speed: number; color?: string }[]>([]);

  // Keep internal theme in sync with external prop if provided
  useEffect(() => {
    if (externalTheme && externalTheme !== theme) {
      setThemeState(externalTheme);
    }
  }, [externalTheme]);

  const handleSelectTheme = (newTheme: BackgroundTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
      window.dispatchEvent(new CustomEvent('portfolio_bg_theme_change', { detail: newTheme }));
    } catch (e) {
      console.warn('Failed to save theme in localStorage:', e);
    }
    if (externalOnThemeChange) {
      externalOnThemeChange(newTheme);
    }
  };

  // Listen to window custom event for external sync
  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<BackgroundTheme>;
      if (customEvent.detail && customEvent.detail !== theme) {
        setThemeState(customEvent.detail);
      }
    };
    window.addEventListener('portfolio_bg_theme_change', handleCustomChange);
    return () => window.removeEventListener('portfolio_bg_theme_change', handleCustomChange);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Wave parameters & particles
    let step = 0;
    const speedMultiplier = waveSpeed === 'gentle' ? 0.6 : waveSpeed === 'surge' ? 1.5 : 1.0;

    // Floating particles (water caustics / desert silica dust / lip gloss sparkles)
    const sparkles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: Math.random() * 0.3 - 0.15,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2
    }));

    const render = () => {
      step += 0.018 * speedMultiplier;

      // ================= 1. THEME GRADIENTS & WAVE CONFIG =================
      if (theme === 'water') {
        // BLUE FLOWING OCEAN WATER
        const baseGradient = ctx.createLinearGradient(0, 0, width, height);
        baseGradient.addColorStop(0, '#001270'); // Deep Indigo Trench
        baseGradient.addColorStop(0.35, '#0022FF'); // Electric Blue
        baseGradient.addColorStop(0.7, '#0038FF'); // Vivid Cobalt
        baseGradient.addColorStop(1, '#001899'); // Deep Current
        ctx.fillStyle = baseGradient;
        ctx.fillRect(0, 0, width, height);

        const drawFlowingWave = (
          baseY: number,
          amplitude: number,
          frequency: number,
          speedOffset: number,
          fillColor: string,
          strokeColor?: string
        ) => {
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 12) {
            const wave1 = Math.sin(x * frequency + step * speedOffset) * amplitude;
            const wave2 = Math.cos(x * (frequency * 0.6) - step * (speedOffset * 0.8)) * (amplitude * 0.5);
            const wave3 = Math.sin(x * 0.001 + step * 0.5) * (amplitude * 0.3);
            const y = baseY + wave1 + wave2 + wave3;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
          if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        };

        drawFlowingWave(height * 0.22, 45, 0.0025, 0.7, 'rgba(0, 20, 150, 0.45)');
        drawFlowingWave(height * 0.42, 55, 0.0035, 1.1, 'rgba(0, 45, 255, 0.4)', 'rgba(100, 180, 255, 0.25)');
        drawFlowingWave(height * 0.62, 60, 0.0045, 1.4, 'rgba(0, 70, 255, 0.35)', 'rgba(140, 210, 255, 0.3)');
        drawFlowingWave(height * 0.82, 40, 0.006, 1.8, 'rgba(26, 115, 255, 0.3)', 'rgba(255, 255, 255, 0.35)');

        // Crossing currents
        ctx.save();
        ctx.globalAlpha = 0.18;
        for (let i = 0; i < 4; i++) {
          const streamY = ((step * 45 * speedMultiplier + i * (height / 3.5)) % (height + 200)) - 100;
          ctx.beginPath();
          ctx.moveTo(0, streamY);
          ctx.bezierCurveTo(
            width * 0.3, streamY - 40 * Math.sin(step + i),
            width * 0.7, streamY + 40 * Math.cos(step + i),
            width, streamY
          );
          ctx.lineWidth = 12 + i * 8;
          ctx.strokeStyle = i % 2 === 0 ? '#4da6ff' : '#ffffff';
          ctx.stroke();
        }
        ctx.restore();

        // Aqua Caustics Sparkles
        sparkles.forEach((s) => {
          s.y -= s.speedY * speedMultiplier;
          s.x += s.speedX + Math.sin(step + s.pulse) * 0.3;
          s.pulse += 0.03;
          if (s.y < -10) s.y = height + 10;
          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;

          const currentOpacity = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 230, 255, ${currentOpacity})`;
          ctx.shadowColor = '#80d4ff';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else if (theme === 'sunset' || theme === 'desert') {
        // ================= 2. SUNSET WARM WAVES =================
        const baseGradient = ctx.createLinearGradient(0, 0, width, height);
        baseGradient.addColorStop(0, '#7A3800'); // Deep Ochre / Terracotta
        baseGradient.addColorStop(0.3, '#B85D00'); // Warm Amber
        baseGradient.addColorStop(0.65, '#E59500'); // Radiant Golden Sand
        baseGradient.addColorStop(1, '#FFB703'); // Sunlit Solar Gold
        ctx.fillStyle = baseGradient;
        ctx.fillRect(0, 0, width, height);

        const drawDuneWave = (
          baseY: number,
          amplitude: number,
          frequency: number,
          speedOffset: number,
          fillColor: string,
          strokeColor?: string
        ) => {
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 10) {
            const dune1 = Math.sin(x * frequency + step * speedOffset * 0.8) * amplitude;
            const dune2 = Math.sin(x * (frequency * 0.4) + step * (speedOffset * 0.5)) * (amplitude * 0.6);
            const windRipples = Math.cos(x * 0.03 + step * 0.4) * 4;
            const y = baseY + dune1 + dune2 + windRipples;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
          if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        };

        drawDuneWave(height * 0.25, 50, 0.002, 0.5, 'rgba(120, 50, 0, 0.45)');
        drawDuneWave(height * 0.45, 60, 0.003, 0.8, 'rgba(210, 110, 0, 0.4)', 'rgba(255, 215, 0, 0.35)');
        drawDuneWave(height * 0.65, 70, 0.004, 1.1, 'rgba(240, 160, 0, 0.35)', 'rgba(255, 235, 120, 0.4)');
        drawDuneWave(height * 0.85, 45, 0.0055, 1.4, 'rgba(255, 210, 50, 0.3)', 'rgba(255, 255, 220, 0.6)');

        // Flowing Warm Sunset Mirage / Wind Streams
        ctx.save();
        ctx.globalAlpha = 0.22;
        for (let i = 0; i < 4; i++) {
          const streamY = ((step * 35 * speedMultiplier + i * (height / 3.2)) % (height + 200)) - 100;
          ctx.beginPath();
          ctx.moveTo(0, streamY);
          ctx.bezierCurveTo(
            width * 0.35, streamY - 30 * Math.sin(step + i),
            width * 0.65, streamY + 30 * Math.cos(step + i),
            width, streamY
          );
          ctx.lineWidth = 14 + i * 8;
          ctx.strokeStyle = i % 2 === 0 ? '#FFE600' : '#FFF3B0';
          ctx.stroke();
        }
        ctx.restore();

        // Golden Silica Dust & Solar Glimmers
        sparkles.forEach((s) => {
          s.y -= s.speedY * 0.8 * speedMultiplier;
          s.x += (s.speedX + 0.2) + Math.sin(step + s.pulse) * 0.4;
          s.pulse += 0.035;
          if (s.y < -10) s.y = height + 10;
          if (s.x > width + 10) s.x = -10;

          const currentOpacity = s.opacity * (0.65 + 0.35 * Math.sin(s.pulse));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 235, 140, ${currentOpacity})`;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 7;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else {
        // ================= 3. PINK LEMONADE SPARKLING PINK WAVES =================
        const baseGradient = ctx.createLinearGradient(0, 0, width, height);
        baseGradient.addColorStop(0, '#59002B'); // Deep Glossy Berry
        baseGradient.addColorStop(0.3, '#800F2F'); // Rich Magenta Rose
        baseGradient.addColorStop(0.65, '#C9184A'); // High-Shine Hot Pink
        baseGradient.addColorStop(1, '#FF4D6D'); // Translucent Jelly Rose
        ctx.fillStyle = baseGradient;
        ctx.fillRect(0, 0, width, height);

        const drawGlossWave = (
          baseY: number,
          amplitude: number,
          frequency: number,
          speedOffset: number,
          fillColor: string,
          strokeColor?: string,
          isHighGloss?: boolean
        ) => {
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 10) {
            const jelly1 = Math.sin(x * frequency + step * speedOffset * 0.9) * amplitude;
            const jelly2 = Math.cos(x * (frequency * 0.5) - step * (speedOffset * 0.6)) * (amplitude * 0.5);
            const y = baseY + jelly1 + jelly2;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
          if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = isHighGloss ? 2.5 : 1.5;
            ctx.stroke();
          }
        };

        drawGlossWave(height * 0.22, 45, 0.0022, 0.6, 'rgba(128, 15, 47, 0.5)');
        drawGlossWave(height * 0.42, 55, 0.0032, 0.9, 'rgba(201, 24, 74, 0.45)', 'rgba(255, 117, 143, 0.35)');
        drawGlossWave(height * 0.62, 65, 0.0042, 1.2, 'rgba(255, 77, 109, 0.4)', 'rgba(255, 179, 193, 0.45)', true);
        drawGlossWave(height * 0.82, 40, 0.006, 1.6, 'rgba(255, 143, 163, 0.35)', 'rgba(255, 255, 255, 0.7)', true);

        // High-Shine Gloss Reflection Streaks
        ctx.save();
        ctx.globalAlpha = 0.25;
        for (let i = 0; i < 4; i++) {
          const streamY = ((step * 40 * speedMultiplier + i * (height / 3.4)) % (height + 200)) - 100;
          ctx.beginPath();
          ctx.moveTo(0, streamY);
          ctx.bezierCurveTo(
            width * 0.3, streamY - 35 * Math.sin(step + i),
            width * 0.7, streamY + 35 * Math.cos(step + i),
            width, streamY
          );
          ctx.lineWidth = 15 + i * 8;
          ctx.strokeStyle = i % 2 === 0 ? '#FFF0F3' : '#FF758F';
          ctx.stroke();
        }
        ctx.restore();

        // Holographic Pink Glitter
        sparkles.forEach((s) => {
          s.y -= s.speedY * speedMultiplier;
          s.x += s.speedX + Math.sin(step + s.pulse) * 0.35;
          s.pulse += 0.04;
          if (s.y < -10) s.y = height + 10;
          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;

          const currentOpacity = s.opacity * (0.7 + 0.3 * Math.sin(s.pulse));
          
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.pulse * 0.5);
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 230, 240, ${currentOpacity})`;
          ctx.shadowColor = '#FF007F';
          ctx.shadowBlur = 8;
          
          const starR = s.size * 1.3;
          ctx.moveTo(0, -starR);
          ctx.quadraticCurveTo(0, 0, starR, 0);
          ctx.quadraticCurveTo(0, 0, 0, starR);
          ctx.quadraticCurveTo(0, 0, -starR, 0);
          ctx.quadraticCurveTo(0, 0, 0, -starR);
          ctx.fill();
          ctx.restore();
        });
      }

      // ================= 4. INTERACTIVE POINTER RIPPLES =================
      if (showRipples && ripplesRef.current.length > 0) {
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.012;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          
          // Theme-based ripple colors
          if (theme === 'water') {
            ctx.strokeStyle = `rgba(200, 240, 255, ${r.alpha})`;
          } else if (theme === 'sunset' || theme === 'desert') {
            ctx.strokeStyle = `rgba(255, 245, 180, ${r.alpha})`;
          } else {
            ctx.strokeStyle = `rgba(255, 215, 235, ${r.alpha})`;
          }
          
          ctx.lineWidth = 2;
          ctx.stroke();

          // Second inner reverberation ring
          if (r.radius > 15) {
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
            if (theme === 'water') {
              ctx.strokeStyle = `rgba(100, 200, 255, ${r.alpha * 0.6})`;
            } else if (theme === 'sunset' || theme === 'desert') {
              ctx.strokeStyle = `rgba(255, 215, 0, ${r.alpha * 0.6})`;
            } else {
              ctx.strokeStyle = `rgba(255, 105, 180, ${r.alpha * 0.6})`;
            }
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, waveSpeed, showRipples]);

  // Pointer Interaction
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!showRipples) return;
    if (Math.random() > 0.25) return;
    
    ripplesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      radius: 4,
      maxRadius: 85 + Math.random() * 40,
      alpha: 0.75,
      speed: 1.8 + Math.random() * 1.2
    });

    if (ripplesRef.current.length > 25) {
      ripplesRef.current.shift();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!showRipples) return;
    for (let j = 0; j < 3; j++) {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: j * 8 + 2,
        maxRadius: 120 + j * 30,
        alpha: 0.9 - j * 0.2,
        speed: 2.2 + j * 0.8
      });
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      {/* 1. Dynamic Canvas Waves Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full object-cover"
      />

      {/* 2. Flowing CSS Shimmer Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: theme === 'water' 
            ? `
                radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
                linear-gradient(45deg, rgba(0, 100, 255, 0.15) 25%, transparent 25%, transparent 75%, rgba(0, 100, 255, 0.15) 75%),
                linear-gradient(-45deg, rgba(0, 150, 255, 0.15) 25%, transparent 25%, transparent 75%, rgba(0, 150, 255, 0.15) 75%)
              `
            : theme === 'desert'
            ? `
                radial-gradient(ellipse at 50% 0%, rgba(255, 240, 180, 0.5) 0%, transparent 60%),
                linear-gradient(45deg, rgba(255, 180, 0, 0.2) 25%, transparent 25%, transparent 75%, rgba(255, 180, 0, 0.2) 75%),
                linear-gradient(-45deg, rgba(255, 230, 0, 0.2) 25%, transparent 25%, transparent 75%, rgba(255, 230, 0, 0.2) 75%)
              `
            : `
                radial-gradient(ellipse at 50% 0%, rgba(255, 220, 240, 0.6) 0%, transparent 60%),
                linear-gradient(45deg, rgba(255, 0, 128, 0.2) 25%, transparent 25%, transparent 75%, rgba(255, 0, 128, 0.2) 75%),
                linear-gradient(-45deg, rgba(255, 105, 180, 0.2) 25%, transparent 25%, transparent 75%, rgba(255, 105, 180, 0.2) 75%)
              `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          animation: 'bgFlow 20s linear infinite'
        }}
      />

      {/* 3. Floating Interactive Theme Switcher & HUD Indicator */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-wrap items-center gap-2 select-none">
        
        {/* Main Neo-Brutalist HUD Badge with White Block Background */}
        <div className="bg-white text-black border-2 border-black p-1.5 px-3 font-mono text-[11px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center gap-2.5 backdrop-blur-md">
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0022FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0022FF]"></span>
            </span>

            <span className="text-black uppercase font-black tracking-wider flex items-center gap-1">
              <span>
                {theme === 'water' ? 'water' : theme === 'sunset' || theme === 'desert' ? 'sunset' : 'pink lemonade'}
              </span>
            </span>
          </div>

          {/* Theme Selector Pills - No Emojis */}
          <div className="flex items-center gap-1 border-l-2 border-black pl-2">
            <button
              onClick={() => handleSelectTheme('water')}
              className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border transition-all cursor-pointer ${
                theme === 'water'
                  ? 'bg-[#0022FF] text-white border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-zinc-100 text-black border-black hover:bg-[#FFE600]'
              }`}
              title="Switch to water theme"
            >
              water
            </button>

            <button
              onClick={() => handleSelectTheme('sunset')}
              className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border transition-all cursor-pointer ${
                theme === 'sunset' || theme === 'desert'
                  ? 'bg-[#FFE600] text-black border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-zinc-100 text-black border-black hover:bg-[#FFE600]'
              }`}
              title="Switch to sunset theme"
            >
              sunset
            </button>

            <button
              onClick={() => handleSelectTheme('pink_lemonade')}
              className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border transition-all cursor-pointer ${
                theme === 'pink_lemonade' || theme === 'lipgloss'
                  ? 'bg-[#FF007F] text-white border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-zinc-100 text-black border-black hover:bg-[#FFB6C1]'
              }`}
              title="Switch to pink lemonade theme"
            >
              pink lemonade
            </button>
          </div>

          {/* Wave Speed Selector */}
          <div className="border-l-2 border-black pl-2 hidden sm:flex items-center gap-1">
            <button
              onClick={() => setWaveSpeed(waveSpeed === 'gentle' ? 'flowing' : waveSpeed === 'flowing' ? 'surge' : 'gentle')}
              className="hover:text-[#0022FF] transition-colors text-[10px] text-zinc-700 font-bold uppercase cursor-pointer"
              title="Toggle current speed"
            >
              SPEED: [{waveSpeed}]
            </button>
          </div>

        </div>
      </div>

      {/* 4. Main Portfolio Content Layer */}
      <div className="relative z-10">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bgFlow {
          0% { background-position: 0% 0%, 0 0, 0 0; }
          50% { background-position: 50% 100%, 120px 60px, -60px 120px; }
          100% { background-position: 0% 0%, 240px 120px, -120px 240px; }
        }
      `}} />
    </div>
  );
};
