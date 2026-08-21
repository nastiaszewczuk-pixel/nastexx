import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause,
  Video, 
  ExternalLink, 
  Sparkles,
  Layers,
  Phone,
  Check,
  Copy,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Repeat,
  Film
} from 'lucide-react';
import { useShowreel } from '../utils/useShowreel';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const { videoUrl, videoName } = useShowreel();
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  
  // Video Player & Controls State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'VIDEO' | 'SCENES'>('VIDEO');

  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync activeTab if videoUrl changes
  useEffect(() => {
    if (videoUrl) {
      setActiveTab('VIDEO');
      setIsPlaying(true);
    }
  }, [videoUrl]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('neizydeizy@gmail.com').catch((e) => console.warn('Clipboard error:', e));
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleLoop = () => {
    if (!videoRef.current) return;
    videoRef.current.loop = !videoRef.current.loop;
    setIsLooping(videoRef.current.loop);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch((err: Error) => {
        console.warn('Fullscreen not supported:', err.message);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 5 Real Showreel Scenes extracted from portfolio
  const showreelScenes = [
    {
      id: 'dior',
      title: 'Dior Paris FW Backstage',
      role: 'Content Creator',
      headline: '20+ Million Views for Dior Paris FW',
      highlight: '10+ Million Accounts Reached',
      accentBg: 'bg-[#FFE600]',
      tagColor: 'bg-black text-[#FFE600]',
      desc: 'Viral aesthetic storytelling, luxury narrative pacing, and massive global reach.'
    },
    {
      id: 'fluently',
      title: 'Fluently English App',
      role: 'Content Creator & Growth',
      headline: '50+ Million Views in 6 Months',
      highlight: '100K+ New Followers & 3K+ Subscriptions',
      accentBg: 'bg-[#FFE600]',
      tagColor: 'bg-black text-[#FFE600]',
      desc: 'Formulated organic short-form viral hooks that generated 50M+ impressions and scaled paid users from scratch.'
    },
    {
      id: 'hair-salon',
      title: 'Hair Salon (Paramatma)',
      role: 'SMM Specialist',
      headline: '10+ Million Views in 1 Month',
      highlight: '5K+ New Client Followers',
      accentBg: 'bg-[#39FF14]',
      tagColor: 'bg-black text-[#39FF14]',
      desc: 'Transformed studio styling into viral video series driving instant client booking lift.'
    },
    {
      id: 'fashion-show',
      title: 'Fashion Show Backstage',
      role: 'Photo & Video Production',
      headline: 'Outsiders Division (126K) & Dominnico (150K)',
      highlight: 'Runway & Backstage Content in Spain',
      accentBg: 'bg-[#FFE600]',
      tagColor: 'bg-black text-[#FFE600]',
      desc: 'High-energy on-site camera direction, styling captures, and rapid turnaround edits in Spain.'
    },
    {
      id: 'nyc-ugc',
      title: 'Fitness App Shootings // NYC',
      role: 'Associate Producer',
      headline: 'NYC On-Set Creative Logistics',
      highlight: 'Location Scouting & Model Coordination',
      accentBg: 'bg-cyan-300',
      tagColor: 'bg-black text-cyan-300',
      desc: 'Sourced shoot locations, scheduled shoots, and coordinated models & crew members in NYC.'
    }
  ];

  const currentScene = showreelScenes[activeSceneIndex];

  return (
    <div 
      id="showreel-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm overflow-y-auto font-sans"
      onClick={onClose}
    >
      <div 
        id="showreel-modal-container"
        className="relative w-full max-w-4xl bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-7 text-black my-auto selection:bg-[#0022FF] selection:text-white max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brutalist Window Header Bar */}
        <div className="bg-[#FFE600] border-2 border-black p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-black text-[#FFE600] p-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-wider block text-zinc-900">
                OFFICIAL SHOWREEL // 2026
              </span>
              <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-black">
                ANASTASIYA SHAU // VIDEO SHOWREEL
              </h2>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="close-showreel-btn"
              onClick={onClose}
              className="bg-black text-white hover:bg-[#0022FF] border-2 border-black p-1.5 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ml-1"
              title="Close [ESC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 bg-black p-1 border-2 border-black font-mono text-xs font-black">
            <button
              onClick={() => setActiveTab('VIDEO')}
              className={`px-3 py-1 uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'VIDEO'
                  ? 'bg-[#FFE600] text-black'
                  : 'text-white hover:text-[#FFE600]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>SHOWREEL VIDEO</span>
            </button>
            <button
              onClick={() => setActiveTab('SCENES')}
              className={`px-3 py-1 uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'SCENES'
                  ? 'bg-[#39FF14] text-black'
                  : 'text-white hover:text-[#39FF14]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CASE STUDY SCENES (5)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-600">
            <span className="bg-[#39FF14] text-black px-2 py-0.5 border border-black font-mono text-[10px] font-black">
              4K MASTER
            </span>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="border-3 border-black bg-zinc-100 p-2.5 sm:p-3.5 mb-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Active Screen Frame */}
          <div className="aspect-video w-full bg-black border-2 border-black flex flex-col items-center justify-center relative overflow-hidden group">
            
            {activeTab === 'VIDEO' && (videoUrl || '/showreel-video.mp4') ? (
              <>
                <video
                  ref={videoRef}
                  src={videoUrl || '/showreel-video.mp4'}
                  playsInline
                  autoPlay
                  loop={isLooping}
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Video Info Watermark Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
                  <span className="bg-black/90 text-[#39FF14] px-2 py-0.5 font-mono text-[10px] font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                    ★ {videoName || 'SHOWREEL 2026'}
                  </span>
                  <span className="bg-[#FFE600] text-black px-1.5 py-0.5 font-mono text-[9px] font-black border border-black">
                    4K MASTER
                  </span>
                </div>

                {/* Big Centered Play/Pause on hover or when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-[#FFE600] border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-black ml-1 text-black" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Case Studies Scene Showcase Screen */
              <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center relative">
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                <div className="relative z-10 max-w-lg flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#FFE600] border-3 border-black flex items-center justify-center text-black mb-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>

                  <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${currentScene.accentBg} text-black mb-2`}>
                    {currentScene.role} // {currentScene.title}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {currentScene.headline}
                  </h3>

                  <p className="text-xs sm:text-sm font-black text-[#FFE600] mt-1 font-mono uppercase">
                    ★ {currentScene.highlight} ★
                  </p>

                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed max-w-md">
                    {currentScene.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveTab('VIDEO')}
                      className="bg-[#39FF14] text-black hover:bg-white border-2 border-black px-4 py-1.5 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>WATCH SHOWREEL</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Brutalist Video Control Bar (when video is active) */}
          {activeTab === 'VIDEO' && (videoUrl || '/showreel-video.mp4') && (
            <div className="mt-2.5 pt-2 border-t-2 border-black flex flex-col gap-2 font-mono text-xs">
              {/* Progress Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-zinc-700 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-zinc-300 accent-black rounded-none cursor-pointer"
                />
                <span className="text-[10px] font-bold text-zinc-700 w-10">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlay}
                    className="bg-[#FFE600] hover:bg-black hover:text-[#FFE600] text-black border-2 border-black px-2.5 py-1 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`border-2 border-black px-2.5 py-1 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer ${
                      isMuted ? 'bg-red-100 text-red-900' : 'bg-white text-black hover:bg-zinc-100'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isMuted ? 'MUTED' : 'MUTE'}</span>
                  </button>

                  <button
                    onClick={toggleLoop}
                    className={`border-2 border-black px-2 py-1 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer ${
                      isLooping ? 'bg-[#39FF14] text-black' : 'bg-white text-zinc-600'
                    }`}
                    title="Toggle Loop"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">LOOP</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="bg-white hover:bg-zinc-100 text-black border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    title="Restart Video"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFullscreen}
                    className="bg-white hover:bg-black hover:text-white text-black border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5 Neo-Brutalist Chapter Selector Buttons */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-black" />
              <h4 className="text-xs font-black font-mono uppercase tracking-wider">
                FEATURED CASE STUDIES // JUMP TO SCENE
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-500">
              CLICK TO EXPLORE STATS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {showreelScenes.map((scene, idx) => {
              const isSelected = activeSceneIndex === idx && activeTab === 'SCENES';
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setActiveTab('SCENES');
                  }}
                  className={`p-2.5 text-left border-2 border-black transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? `${scene.accentBg} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5 font-black`
                      : 'bg-white hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                      <span>0{idx + 1}</span>
                      <span className="truncate max-w-[80px]">{scene.role.split(' ')[0]}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-tight line-clamp-1">
                      {scene.title}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold mt-1.5 block border-t border-black/30 pt-1 text-black truncate">
                    {scene.highlight.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions / Contact */}
        <div className="border-t-2 border-black pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            <button
              onClick={handleCopyEmail}
              className="border-2 border-black bg-white hover:bg-[#FFE600] px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'COPIED EMAIL!' : 'neizydeizy@gmail.com'}</span>
            </button>

            <a
              href="https://wa.me/34675151651"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black bg-white hover:bg-[#FFE600] px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>+34 675 151 651</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="showreel-instagram-link"
              href="https://instagram.com/nastexx"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black bg-[#FFE600] hover:bg-black hover:text-[#FFE600] px-3.5 py-1.5 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5"
            >
              <span>INSTAGRAM [@NASTEXX]</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              id="showreel-close-action-btn"
              onClick={onClose}
              className="bg-black text-white hover:bg-[#0022FF] border-2 border-black px-4 py-1.5 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              CLOSE [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
