import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  Check, 
  Copy, 
  Maximize2, 
  Eye
} from 'lucide-react';
import { CreatorStatProofItem } from '../utils/useCreatorCollab';

interface CreatorStatsAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  statProofs: CreatorStatProofItem[];
  initialIndex?: number;
  onAddStatProof?: (proof: Omit<CreatorStatProofItem, 'id' | 'createdAt'>) => Promise<CreatorStatProofItem>;
  onAddStatProofFiles?: (files: File[], defaultTitle?: string) => Promise<void>;
  onRemoveStatProof?: (id: string) => Promise<void>;
  onUpdateStatProof?: (id: string, updates: Partial<CreatorStatProofItem>) => Promise<void>;
  onResetStatProofsToDefaults?: () => Promise<void>;
}

export function CreatorStatsAlbumModal({
  isOpen,
  onClose,
  statProofs,
  initialIndex = 0
}: CreatorStatsAlbumModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isFullscreenImage, setIsFullscreenImage] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(initialIndex >= 0 && initialIndex < statProofs.length ? initialIndex : 0);
      setActiveCategory('ALL');
    }
  }, [isOpen, initialIndex, statProofs.length]);

  // Filter items based on selected category tab
  const filteredProofs = activeCategory === 'ALL'
    ? statProofs
    : statProofs.filter(item => item.category === activeCategory);

  // Ensure selected index stays within bounds
  useEffect(() => {
    if (selectedIndex >= filteredProofs.length) {
      setSelectedIndex(Math.max(0, filteredProofs.length - 1));
    }
  }, [filteredProofs.length, selectedIndex]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, filteredProofs.length - 1)));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => (prev < filteredProofs.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredProofs.length, isFullscreenImage]);

  if (!isOpen) return null;

  const currentItem = filteredProofs[selectedIndex] || filteredProofs[0];

  const handlePrev = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, filteredProofs.length - 1)));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev < filteredProofs.length - 1 ? prev + 1 : 0));
  };

  const handleCopyData = (item: CreatorStatProofItem) => {
    const textToCopy = `[${item.metricTag}] ${item.title} - ${item.description} (Source: ${item.source || 'Meta Insights'}, Period: ${item.periodOrDate || 'Recent'})`;
    navigator.clipboard.writeText(textToCopy).catch((e) => console.warn('Clipboard error:', e));
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { key: 'ALL', label: 'ALL PROOFS' },
    { key: 'REACH', label: 'REACH & IMPRESSIONS' },
    { key: 'VIRAL_REELS', label: '20M+ VIRAL REELS' },
    { key: 'DEMOGRAPHICS', label: 'DEMOGRAPHICS' },
    { key: 'CONVERSIONS', label: 'CONVERSIONS' },
    { key: 'ENGAGEMENT', label: 'ENGAGEMENT' }
  ];

  const categoryCounts = {
    ALL: statProofs.length,
    REACH: statProofs.filter(p => p.category === 'REACH').length,
    VIRAL_REELS: statProofs.filter(p => p.category === 'VIRAL_REELS').length,
    DEMOGRAPHICS: statProofs.filter(p => p.category === 'DEMOGRAPHICS').length,
    CONVERSIONS: statProofs.filter(p => p.category === 'CONVERSIONS').length,
    ENGAGEMENT: statProofs.filter(p => p.category === 'ENGAGEMENT').length
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in font-sans">
      <div className="border-3 border-black bg-white w-full max-w-6xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="border-b-3 border-black bg-[#FFE600] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black text-[#39FF14] border-2 border-black flex items-center justify-center font-mono font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-lg uppercase tracking-tight text-black flex items-center gap-1.5">
                  Statistics &amp; Verified Proofs
                </h3>
                <span className="bg-black text-[#39FF14] px-2 py-0.5 font-mono text-[10px] font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  {statProofs.length} SCREENSHOTS
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-800 hidden sm:inline-block">
                // REACH INSIGHTS, 20M+ REEL METRICS, AUDIENCE DEMOGRAPHICS &amp; CONVERSIONS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="border-2 border-black bg-white hover:bg-black hover:text-white p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer ml-1"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div className="border-b-2 border-black bg-zinc-100 px-4 py-2 flex items-center gap-1.5 overflow-x-auto flex-shrink-0">
          {categories.map((cat) => {
            const count = categoryCounts[cat.key as keyof typeof categoryCounts] || 0;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-[#39FF14] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                    : 'bg-white text-zinc-700 hover:bg-zinc-200 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1 py-0.2 border ${isActive ? 'bg-[#FFE600] text-black border-black' : 'bg-zinc-200 text-zinc-800 border-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= MODAL BODY / MAIN STAGE ================= */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow flex flex-col justify-between">
          
          {currentItem ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT: Screenshot Display Stage */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative border-3 border-black bg-zinc-950 p-2 sm:p-3 w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group">
                  
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] max-h-[50vh] w-full bg-black border border-zinc-800 overflow-hidden flex items-center justify-center">
                    <img 
                      src={currentItem.imageUrl} 
                      alt={currentItem.title}
                      className="w-full h-full object-contain cursor-zoom-in"
                      onClick={() => setIsFullscreenImage(true)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick navigation arrows */}
                    {filteredProofs.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                          title="Previous screenshot [←]"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                          title="Next screenshot [→]"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Watermark badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                      <span className="bg-black text-[#39FF14] px-2 py-0.5 font-mono text-[10px] font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                        PROVED METRIC 0{selectedIndex + 1}
                      </span>
                    </div>

                    {/* Click to expand overlay */}
                    <div 
                      onClick={() => setIsFullscreenImage(true)}
                      className="absolute bottom-2 right-2 bg-black/80 hover:bg-[#39FF14] text-white hover:text-black px-2 py-1 font-mono text-[10px] font-black border border-white hover:border-black flex items-center gap-1 cursor-pointer transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>FULLSCREEN</span>
                    </div>
                  </div>

                  {/* Counter & Indicator */}
                  <div className="mt-2 flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
                    <span className="text-[#39FF14] font-bold">
                      SCREENSHOT {selectedIndex + 1} OF {filteredProofs.length}
                    </span>
                    <span className="text-zinc-400">
                      ORIGINAL RESOLUTION PROOF
                    </span>
                  </div>

                </div>
              </div>

              {/* RIGHT: Detailed Breakdown & Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                <div className="border-3 border-black bg-yellow-50 p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#0022FF] text-white px-2.5 py-0.5 font-mono text-xs font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {currentItem.category.replace('_', ' ')}
                    </span>
                    <span className="bg-[#FFE600] text-black px-2.5 py-0.5 font-mono text-xs font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      VERIFIED
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase block">
                      KEY METRIC ACHIEVED
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black font-mono text-black uppercase tracking-tight">
                      {currentItem.metricTag}
                    </h4>
                  </div>

                  <div>
                    <h5 className="text-base sm:text-lg font-black uppercase tracking-tight text-black">
                      {currentItem.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-800 font-mono mt-1 leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>

                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-black/20 text-xs font-mono">
                    <div className="border border-black p-2 bg-white">
                      <span className="font-bold text-zinc-500 block text-[9px] uppercase">PLATFORM / SOURCE</span>
                      <span className="font-black text-black">{currentItem.source || 'Meta Insights'}</span>
                    </div>

                    <div className="border border-black p-2 bg-white">
                      <span className="font-bold text-zinc-500 block text-[9px] uppercase">DATE / TIMEFRAME</span>
                      <span className="font-black text-black">{currentItem.periodOrDate || 'Recent'}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  {currentItem.statsHighlights && currentItem.statsHighlights.length > 0 && (
                    <div className="pt-2 border-t border-black/20">
                      <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase block mb-1.5">
                        PROOF HIGHLIGHTS:
                      </span>
                      <ul className="space-y-1">
                        {currentItem.statsHighlights.map((h, i) => (
                          <li key={i} className="text-xs font-mono font-bold text-black flex items-center justify-between">
                            <span className="text-zinc-600">{h.label}</span>
                            <span className="bg-[#FFE600] text-black px-1.5 py-0.5 border border-black">{h.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-3 border-t-2 border-black flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyData(currentItem)}
                        className="border border-black bg-white hover:bg-black hover:text-[#39FF14] px-3 py-1.5 font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        {copiedId === currentItem.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span>COPIED STATS</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY METRICS</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => setIsFullscreenImage(true)}
                      className="border border-black bg-[#FFE600] hover:bg-black hover:text-white px-3 py-1.5 font-mono text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>FULLSCREEN</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ) : null}

          {/* ================= THUMBNAILS GRID ================= */}
          {filteredProofs.length > 0 && (
            <div className="mt-6 pt-4 border-t-2 border-black flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-black uppercase text-zinc-700 tracking-wider">
                  // SCREENSHOTS ({filteredProofs.length})
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Click thumbnail to view
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredProofs.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`border-2 p-1.5 bg-white cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${
                      idx === selectedIndex
                        ? 'border-black bg-[#FFE600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                        : 'border-black/40 hover:border-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-zinc-900 border border-black overflow-hidden mb-1.5 flex items-center justify-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1 left-1 bg-black text-[#39FF14] text-[8px] font-mono font-black px-1">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-black uppercase truncate block text-black">
                        {item.metricTag}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-700 truncate block leading-tight">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ================= FULLSCREEN LIGHTBOX ================= */}
      {isFullscreenImage && currentItem && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
          onClick={() => setIsFullscreenImage(false)}
        >
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white border-b border-zinc-800 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FFE600] text-black px-2 py-0.5 font-mono text-xs font-black">
                  {currentItem.metricTag}
                </span>
                <h3 className="font-black text-sm sm:text-base uppercase tracking-tight">
                  {currentItem.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {currentItem.source || 'Meta Insights'} // {currentItem.periodOrDate || 'Recent'}
              </span>
            </div>

            <button
              onClick={() => setIsFullscreenImage(false)}
              className="bg-[#FFE600] text-black border-2 border-black p-2 font-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="flex-grow flex items-center justify-center p-2 sm:p-4 max-w-5xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={currentItem.imageUrl} 
              alt={currentItem.title}
              className="max-h-full max-w-full object-contain border-2 border-zinc-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div 
            className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <span>CLICK ANYWHERE OUTSIDE OR PRESS ESC TO CLOSE</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="bg-zinc-800 hover:bg-[#FFE600] text-white hover:text-black px-3 py-1 border border-zinc-600 font-black cursor-pointer"
              >
                &larr; PREV
              </button>
              <button
                onClick={handleNext}
                className="bg-zinc-800 hover:bg-[#FFE600] text-white hover:text-black px-3 py-1 border border-zinc-600 font-black cursor-pointer"
              >
                NEXT &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
