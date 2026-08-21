import React, { useState, useRef } from 'react';
import { 
  Users, 
  Maximize2, 
  Instagram, 
  Mail, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Plus, 
  Upload, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Check
} from 'lucide-react';
import { 
  useCreatorCollab,
  CreatorMediaItem
} from '../utils/useCreatorCollab';
import { CreatorStatsAlbumModal } from './CreatorStatsAlbumModal';
import { AddCreatorMediaModal } from './AddCreatorMediaModal';

interface CreatorCollabSectionProps {
  onOpenInstagram?: () => void;
}

export function CreatorCollabSection({ onOpenInstagram }: CreatorCollabSectionProps) {
  const {
    metrics,
    demographics,
    collabFormats,
    mediaItems,
    statProofs,
    addMediaItem,
    addMediaItemFiles,
    updateMediaItem,
    removeMediaItem,
    resetMediaToDefaults
  } = useCreatorCollab();

  // Filters & tabs
  const [activeProofCategory, setActiveProofCategory] = useState<string>('ALL');
  
  // Screenshots / Stats Album Modal State
  const [showStatsAlbumModal, setShowStatsAlbumModal] = useState<boolean>(false);
  const [selectedProofIndex, setSelectedProofIndex] = useState<number>(0);

  // Media Player Modal
  const [activeVideoModal, setActiveVideoModal] = useState<CreatorMediaItem | null>(null);

  // Add / Edit Reel Modal State
  const [showAddMediaModal, setShowAddMediaModal] = useState<boolean>(false);
  const [editingMedia, setEditingMedia] = useState<CreatorMediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [actionNotice, setActionNotice] = useState<string>('');

  // Video playback state in modal
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      await addMediaItemFiles(files);
      showNotification(`Added ${files.length} new reel asset(s)!`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveMedia = async (itemData: Omit<CreatorMediaItem, 'id' | 'createdAt'> & { id?: string; fileBlob?: Blob }) => {
    if (itemData.id) {
      // Edit existing
      await updateMediaItem(itemData.id, itemData);
      showNotification('Reel updated successfully!');
      if (activeVideoModal?.id === itemData.id) {
        setActiveVideoModal(prev => prev ? { ...prev, ...itemData } : null);
      }
    } else {
      // Add new
      await addMediaItem(itemData);
      showNotification('New creator reel added!');
    }
  };

  const handleDeleteMedia = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Remove this video reel from showcase?')) {
      await removeMediaItem(id);
      if (activeVideoModal?.id === id) {
        setActiveVideoModal(null);
      }
      showNotification('Reel removed from showcase.');
    }
  };

  const handleEditMedia = (media: CreatorMediaItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingMedia(media);
    setShowAddMediaModal(true);
  };

  const handlePrevModalReel = () => {
    if (!activeVideoModal || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(m => m.id === activeVideoModal.id);
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setActiveVideoModal(mediaItems[prevIndex]);
  };

  const handleNextModalReel = () => {
    if (!activeVideoModal || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(m => m.id === activeVideoModal.id);
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setActiveVideoModal(mediaItems[nextIndex]);
  };

  const filteredStatProofs = activeProofCategory === 'ALL'
    ? statProofs
    : statProofs.filter(p => p.category === activeProofCategory);

  const openProofAt = (index: number) => {
    setSelectedProofIndex(index);
    setShowStatsAlbumModal(true);
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsMuted(modalVideoRef.current.muted);
  };

  return (
    <section id="section-creator" className="mb-16 scroll-mt-20">
      
      {/* 2.1 SECTION HEADER BANNER */}
      <div className="border-3 border-black bg-[#FFE600] p-6 sm:p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-black text-[#39FF14] px-3 py-1 font-mono text-xs font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                CREATOR KIT // STATS &amp; COLLABS
              </span>
              <span className="bg-[#0022FF] text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider border border-black hidden sm:inline-block">
                @NASTEXX
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black leading-none italic">
              Creator &amp; Collabs
            </h2>
            <p className="text-base sm:text-lg font-bold text-black/85 mt-2 max-w-2xl font-mono">
              Visual storytelling, viral organic reach, verified statistics &amp; brand partnerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com/nastexx"
              target="_blank"
              rel="noreferrer"
              className="border-3 border-black bg-black text-[#FFE600] hover:bg-[#0022FF] hover:text-white px-5 py-3 font-mono font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>@NASTEXX</span>
              <ArrowUpRight className="w-4 h-4 ml-0.5" />
            </a>

            <a
              href="mailto:neizydeizy@gmail.com?subject=Brand%20Collaboration%20Inquiry%20//%20Anastasiya"
              className="border-3 border-black bg-white hover:bg-[#39FF14] text-black px-5 py-3 font-mono font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>BOOK COLLAB</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2.2 TOP KEY PERFORMANCE METRICS BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((m, idx) => (
          <div 
            key={idx}
            className="border-3 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-wider">
                  METRIC // 0{idx + 1}
                </span>
                <span className="bg-black text-[#39FF14] text-[9px] font-mono font-bold px-1.5 py-0.5">
                  VERIFIED
                </span>
              </div>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black block mb-1">
                {m.value}
              </span>
              <h3 className="text-sm font-black uppercase text-black">
                {m.label}
              </h3>
            </div>
            
            <p className="text-xs font-mono text-zinc-600 mt-3 pt-2 border-t border-black/20 leading-relaxed">
              {m.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* 2.3 AUDIENCE DEMOGRAPHICS & ENGAGEMENT METRICS */}
      <div className="mb-12">
        <div className="border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-black" />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Audience Demographics
              </h3>
            </div>
            <span className="bg-[#FFE600] text-black border border-black font-mono text-[10px] font-black px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              META INSIGHTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender Distribution Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-black">
                <span>GENDER SPLIT</span>
                <span>{demographics.genderSplit.female} F / {demographics.genderSplit.male} M</span>
              </div>
              <div className="w-full h-6 border-2 border-black flex overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div 
                  className="bg-[#0022FF] text-white flex items-center justify-center font-mono text-[10px] font-black"
                  style={{ width: demographics.genderSplit.female }}
                >
                  {demographics.genderSplit.female}
                </div>
                <div 
                  className="bg-[#FFE600] text-black flex items-center justify-center font-mono text-[10px] font-black"
                  style={{ width: demographics.genderSplit.male }}
                >
                  {demographics.genderSplit.male}
                </div>
              </div>
              <p className="text-[11px] font-mono text-zinc-500 pt-1">
                Predominantly female audience with high lifestyle &amp; fashion affinity.
              </p>
            </div>

            {/* Age Breakdown Bars */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-black uppercase block">
                AGE DISTRIBUTION (CORE: {demographics.primaryAge})
              </span>
              <div className="space-y-2">
                {demographics.ageGroups.map((ag) => (
                  <div key={ag.range} className="space-y-0.5">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span>{ag.range}</span>
                      <span>{ag.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 border border-black overflow-hidden">
                      <div 
                        className="h-full bg-black"
                        style={{ width: `${ag.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Geographies / Locations */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-black uppercase block">
                TOP GEOGRAPHIC REACH
              </span>
              <div className="flex flex-wrap gap-2">
                {demographics.topLocations.map((loc) => (
                  <span 
                    key={loc}
                    className="border-2 border-black bg-zinc-50 px-2.5 py-1 text-xs font-mono font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    📍 {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600">
            <span>High purchasing power &amp; global reach</span>
            <span className="font-bold text-black bg-[#39FF14] border border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              VERIFIED CREATOR METRICS
            </span>
          </div>
        </div>
      </div>

      {/* 2.4 COLLABORATION FORMATS & DELIVERABLES */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-3">
          <div>
            <span className="text-xs font-mono font-black text-[#0022FF] uppercase tracking-widest block">
              // PARTNERSHIP PACKAGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight italic mt-0.5">
              Available Collaboration Formats
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-zinc-600 hidden sm:inline-block">
            // TAILORED FOR VIRAL REACH &amp; CONVERSIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collabFormats.map((cf) => (
            <div 
              key={cf.id}
              className="border-3 border-black bg-white p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#FFE600] text-black px-2 py-0.5 font-mono text-[10px] font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase">
                    {cf.badge || cf.tag || 'PACKAGE'}
                  </span>
                  <span className="font-mono text-xs font-black text-black">
                    0{cf.id.slice(-1)}
                  </span>
                </div>

                <h4 className="text-base font-black uppercase tracking-tight text-black mt-2 mb-1.5">
                  {cf.title}
                </h4>

                <p className="text-xs text-zinc-700 leading-relaxed font-sans mb-4">
                  {cf.description}
                </p>

                <div className="border-t border-black/15 pt-3 mb-4">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1.5">
                    DELIVERABLES:
                  </span>
                  <ul className="space-y-1">
                    {cf.deliverables.map((del, i) => (
                      <li key={i} className="text-xs font-mono font-bold text-black flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-black rounded-none"></span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-[11px] font-mono font-black text-[#0022FF]">
                  {cf.turnaround}
                </span>
                <a
                  href={`mailto:neizydeizy@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(cf.title)}`}
                  className="bg-black hover:bg-[#FFE600] hover:text-black text-white px-3 py-1 font-mono text-xs font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                >
                  SELECT
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.5 INTERACTIVE STATISTICS & SCREENSHOTS GALLERY */}
      <div className="mb-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b-2 border-black pb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-mono font-black text-[#0022FF] uppercase tracking-widest">
                // STATISTICS
              </span>
              <span className="bg-[#FFE600] text-black border border-black font-mono text-[9px] font-black px-1.5 py-0.2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase">
                {statProofs.length} SCREENSHOTS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight italic">
              Statistics ({statProofs.length})
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedProofIndex(0);
                setShowStatsAlbumModal(true);
              }}
              className="border-2 border-black bg-[#FFE600] hover:bg-black hover:text-[#39FF14] px-4 py-2 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>FULLSCREEN VIEWER</span>
            </button>
          </div>
        </div>

        {/* 11 Screenshots Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStatProofs.map((proof, idx) => {
            const originalIndex = statProofs.findIndex(p => p.id === proof.id);
            return (
              <div 
                key={proof.id}
                onClick={() => openProofAt(originalIndex >= 0 ? originalIndex : 0)}
                className="border-3 border-black bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden"
              >
                {/* Image Thumbnail Container */}
                <div className="aspect-[4/3] bg-zinc-950 border-b-2 border-black relative overflow-hidden flex items-center justify-center p-1">
                  <img 
                    src={proof.imageUrl} 
                    alt={proof.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="bg-black text-[#39FF14] px-2 py-0.5 font-mono text-[9px] font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      0{originalIndex + 1}
                    </span>
                    <span className="bg-black/90 text-[#FFE600] px-2 py-0.5 font-mono text-[9px] font-bold border border-black">
                      {proof.periodOrDate || proof.category}
                    </span>
                  </div>

                  {/* Expand Overlay On Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <div className="bg-[#FFE600] text-black border-2 border-black px-3 py-1 font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>VIEW FULLSCREEN</span>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="bg-[#FFE600] border border-black px-2 py-1 mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[9px] font-mono font-bold text-black/70 block uppercase leading-none">
                        KEY METRIC
                      </span>
                      <span className="text-xs font-mono font-black text-black block truncate mt-0.5">
                        {proof.metricTag}
                      </span>
                    </div>

                    <h4 className="text-xs font-black uppercase text-black line-clamp-2 leading-snug mb-2">
                      {proof.title}
                    </h4>

                    <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed font-mono">
                      {proof.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-black/15 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="truncate max-w-[140px]">{proof.source || 'Meta Insights'}</span>
                    <span className="text-[#0022FF] font-bold group-hover:underline">OPEN &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2.7 CREATOR REEL VIDEOS & UGC SAMPLES */}
      <div className="mb-14">
        {/* Hidden File Input for direct upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="video/*,image/*"
          multiple
          className="hidden"
        />

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="mb-4 bg-[#39FF14] text-black border-2 border-black p-3 font-mono text-xs font-black uppercase flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice('')} className="p-1 hover:bg-black hover:text-[#39FF14] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-black pb-3">
          <div>
            <span className="text-xs font-mono font-black text-[#0022FF] uppercase tracking-widest block">
              // VIDEO SAMPLES &amp; FORMATS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight italic mt-0.5">
              Creator Video Reels &amp; UGC Assets ({mediaItems.length})
            </h3>
          </div>

          {/* Action Buttons for Adding & Managing Media */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Viewer Mode: No Add/Edit buttons */}
          </div>
        </div>

        {mediaItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="border-3 border-dashed border-black bg-zinc-50 aspect-[9/16] flex flex-col items-center justify-center p-6 text-center gap-4">
                <div className="w-16 h-16 bg-black text-zinc-300 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Play className="w-8 h-8 fill-zinc-300 ml-1" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight text-black">Coming Soon</h4>
                  <p className="text-xs font-mono text-zinc-600 mt-1">Life chapter {i}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full mx-auto">
            {mediaItems.slice(0, 4).map((media) => (
              <div 
                key={media.id}
                className="border-3 border-black bg-white flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group overflow-hidden relative"
              >
                <div 
                  onClick={() => setActiveVideoModal(media)}
                  className="aspect-[9/16] bg-zinc-950 border-b-2 border-black relative overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  {media.type === 'video' ? (
                    <video 
                      src={media.url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                  ) : media.type === 'embed' ? (
                    <iframe src={media.url} className="w-full h-full pointer-events-none" frameBorder="0" scrolling="no" allowTransparency />
                  ) : (
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#FFE600] border-3 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span className="bg-black text-[#39FF14] px-2.5 py-1 font-mono text-[10px] font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                      {media.formatTag}
                    </span>
                  </div>

                  {/* Quick Card Edit/Delete Action Icons - Removed for Viewer */}
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-black text-[#0022FF] truncate mr-2">
                        {media.metrics}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 truncate">
                        {media.clientOrNiche}
                      </span>
                    </div>
                    <h4 className="text-base font-black uppercase text-black mb-1 line-clamp-1">
                      {media.title}
                    </h4>
                    <p className="text-xs text-zinc-600 font-mono line-clamp-2">
                      {media.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/15 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideoModal(media)}
                      className="border-2 border-black bg-black text-[#FFE600] hover:bg-[#0022FF] hover:text-white px-3 py-1.5 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>WATCH REEL</span>
                    </button>
                    <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">
                      {media.type === 'video' ? '4K REEL' : 'STILL ASSET'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2.8 STATS SCREENSHOTS ALBUM MODAL */}
      <CreatorStatsAlbumModal
        isOpen={showStatsAlbumModal}
        onClose={() => setShowStatsAlbumModal(false)}
        statProofs={statProofs}
        initialIndex={selectedProofIndex}
      />

      {/* 2.9 ADD & EDIT REEL MODAL - Removed for Viewer */}

      {/* 2.10 VIDEO MODAL PREVIEW */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-sans"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="border-3 border-black bg-white w-full max-w-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev / Next Modal Arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevModalReel}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black text-[#FFE600] hover:bg-[#39FF14] hover:text-black border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                  title="Previous Reel"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextModalReel}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black text-[#FFE600] hover:bg-[#39FF14] hover:text-black border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                  title="Next Reel"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Video Screen */}
            <div className="relative bg-black md:w-1/2 aspect-[9/16] flex items-center justify-center overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black">
              {activeVideoModal.type === 'video' ? (
                <video 
                  ref={modalVideoRef}
                  src={activeVideoModal.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : activeVideoModal.type === 'embed' ? (
                <iframe src={activeVideoModal.url} className="w-full h-full" frameBorder="0" scrolling="no" allowTransparency allowFullScreen />
              ) : (
                <img
                  src={activeVideoModal.url}
                  alt={activeVideoModal.title}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Play / Mute Floating Controls (Video Only) */}
              {activeVideoModal.type === 'video' && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <button
                    onClick={toggleModalPlay}
                    className="bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border border-white hover:border-black p-2 font-mono text-xs font-bold cursor-pointer transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleModalMute}
                    className="bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border border-white hover:border-black p-2 font-mono text-xs font-bold cursor-pointer transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* Info Side */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#FFE600] text-black px-2.5 py-0.5 font-mono text-xs font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {activeVideoModal.formatTag}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveVideoModal(null)}
                      className="border-2 border-black p-1 hover:bg-black hover:text-white cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-black mb-2">
                  {activeVideoModal.title}
                </h3>

                <div className="bg-[#39FF14] text-black border border-black p-2 font-mono font-black text-xs uppercase mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  METRIC: {activeVideoModal.metrics}
                </div>

                <p className="text-xs font-mono text-zinc-700 leading-relaxed mb-4">
                  {activeVideoModal.description}
                </p>

                {activeVideoModal.clientOrNiche && (
                  <div className="border border-black p-2.5 bg-zinc-50 font-mono text-xs mb-4">
                    <span className="font-bold text-zinc-600 block text-[10px]">NICHE / CATEGORY:</span>
                    <span className="font-black text-black">{activeVideoModal.clientOrNiche}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-black space-y-2">
                <a
                  href="mailto:neizydeizy@gmail.com?subject=Inquiry%20about%20Video%20Format%20//%20Anastasiya"
                  className="border-2 border-black bg-[#0022FF] text-white hover:bg-black p-2.5 text-center font-mono font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] block cursor-pointer"
                >
                  REQUEST THIS REEL FORMAT
                </a>

                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="border-2 border-black bg-white hover:bg-zinc-100 p-2 text-center font-mono font-bold text-xs uppercase w-full cursor-pointer"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
