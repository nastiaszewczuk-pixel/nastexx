import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Video as VideoIcon, 
  ExternalLink,
  Link as LinkIcon, 
  Check, 
  Copy, 
  Image as ImageIcon
} from 'lucide-react';
import { AlbumMediaItem, ProjectLinkItem, DEFAULT_ALBUMS_DATA } from '../utils/usePortfolioAlbums';

interface ProjectAlbumModalProps {
  projectId: string | null;
  isOpen: boolean;
  onClose: () => void;
  albumItems: AlbumMediaItem[];
  links?: ProjectLinkItem[];
  onAddMediaFiles?: (projectId: string, files: File[]) => void;
  onAddMediaUrl?: (projectId: string, mediaData: { url: string; name: string; caption?: string; type?: 'image' | 'video' }) => void;
  onRemoveMedia?: (projectId: string, mediaId: string) => void;
  onResetAlbum?: (projectId: string) => void;
}

export const ProjectAlbumModal: React.FC<ProjectAlbumModalProps> = ({
  projectId,
  isOpen,
  onClose,
  albumItems,
  links = []
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen || !projectId) return null;

  const projectMeta = DEFAULT_ALBUMS_DATA[projectId] || {
    title: 'Project Case Study',
    subtitle: 'Creative Production & Content Strategy',
    tag: 'FEATURED',
    metric: 'Case Study Highlights',
    role: 'Creator & Director',
    desc: 'Content creation and media production case study.',
    accent: 'bg-[#FFE600]'
  };

  const safeIndex = selectedIndex >= albumItems.length ? Math.max(0, albumItems.length - 1) : selectedIndex;
  const currentItem: AlbumMediaItem | undefined = albumItems[safeIndex] || albumItems[0];

  const handlePrev = () => {
    if (albumItems.length === 0) return;
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : albumItems.length - 1));
  };

  const handleNext = () => {
    if (albumItems.length === 0) return;
    setSelectedIndex((prev) => (prev < albumItems.length - 1 ? prev + 1 : 0));
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url).catch((e) => console.warn('Clipboard error:', e));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div 
      id="album-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm overflow-y-auto font-sans"
      onClick={onClose}
    >
      <div 
        id="album-modal-container"
        className="relative w-full max-w-5xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-7 md:p-8 text-black my-auto selection:bg-[#0022FF] selection:text-white max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Album Header Bar */}
        <div className="border-3 border-black bg-[#FFE600] p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3">
            <span className="bg-black text-[#39FF14] px-2.5 py-1 text-xs font-mono font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ALBUM {projectId}
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-black/80">
                {projectMeta.role} // {projectMeta.tag}
              </span>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
                {projectMeta.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white text-black font-mono text-xs font-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hidden sm:inline-block">
              {projectMeta.metric}
            </span>

            <button
              id="close-album-modal-btn"
              onClick={onClose}
              className="bg-black text-white hover:bg-[#0022FF] border-2 border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Close [ESC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photo Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            <span className="bg-zinc-100 px-2.5 py-1 border border-black font-black">
              {albumItems.length} MEDIA {albumItems.length === 1 ? 'FILE' : 'FILES'}
            </span>
            <span className="text-zinc-600 text-[11px] hidden sm:inline">
              // PRODUCTION STILLS, SHORT-FORM CLIPS &amp; CAMPAIGN ASSETS
            </span>
          </div>
        </div>

        {/* Main Stage Display (Photo Viewer / Video Player) */}
        <div className="relative border-3 border-black bg-zinc-950 p-2 sm:p-3 mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {albumItems.length > 0 && currentItem ? (
            <div className="relative aspect-video sm:aspect-[16/10] max-h-[46vh] w-full bg-black border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
              {currentItem.type === 'video' ? (
                <video
                  key={currentItem.id}
                  src={currentItem.url}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  key={currentItem.id}
                  src={currentItem.url}
                  alt={currentItem.name || 'Album media'}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Navigation Arrows */}
              {albumItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    title="Previous media"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#FFE600] text-white hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    title="Next media"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Current Item Badges */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <div className="bg-black/85 text-white border border-zinc-600 px-2.5 py-1 text-xs font-mono font-bold flex items-center gap-2">
                  <span className="text-[#39FF14]">
                    {safeIndex + 1} / {albumItems.length}
                  </span>
                  <span className="truncate max-w-[200px] sm:max-w-md">
                    {currentItem.caption || currentItem.name}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full bg-zinc-900 border-2 border-zinc-800 flex flex-col items-center justify-center p-6 text-center">
              <ImageIcon className="w-10 h-10 text-zinc-500 mb-2" />
              <h4 className="text-white text-lg font-black uppercase tracking-tight">ALBUM MEDIA</h4>
            </div>
          )}
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-zinc-600">
              // ALBUM FILMSTRIP ({albumItems.length} ITEMS)
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              CLICK THUMBNAIL TO VIEW MEDIA
            </span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 items-center">
            {albumItems.map((item, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative flex-shrink-0 w-18 sm:w-22 aspect-square bg-zinc-900 border-2 border-black overflow-hidden transition-all cursor-pointer ${
                    isSelected 
                      ? 'ring-4 ring-[#39FF14] scale-105 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white">
                      <VideoIcon className="w-5 h-5 text-[#39FF14]" />
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[9px] font-mono text-center truncate px-1">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Places for Links Section */}
        {links.length > 0 && (
          <div className="border-2 border-black bg-yellow-50 p-4 sm:p-5 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-3 border-b border-black/20 pb-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#0022FF]" />
                <h4 className="text-xs font-black font-mono uppercase tracking-wider">
                  PROJECT EXTERNAL LINKS [{links.length} {links.length === 1 ? 'PLACE' : 'PLACES'}]
                </h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-600 font-bold">
                // CLICK TO VISIT DESTINATIONS
              </span>
            </div>

            <div className={`grid grid-cols-1 ${links.length === 1 ? 'sm:grid-cols-1' : links.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3`}>
              {links.map((link, idx) => {
                return (
                  <div 
                    key={link.id}
                    className="border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="bg-black text-[#39FF14] text-[9px] font-mono font-black px-1.5 py-0.5">
                          SLOT 0{idx + 1}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopyLink(link.url, idx)}
                            className="text-zinc-600 hover:text-black p-1 hover:bg-zinc-100 rounded cursor-pointer"
                            title="Copy URL"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <span className="text-xs font-black uppercase tracking-tight block text-black truncate mb-1">
                        {link.label}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-black/10">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-black hover:bg-[#0022FF] text-white hover:text-white font-mono text-[11px] font-bold px-2.5 py-1.5 flex items-center justify-between transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <span className="truncate max-w-[170px]">{link.url.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0 ml-1" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Project Description & Highlights Box */}
        <div className="border-2 border-black bg-zinc-50 p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-black uppercase text-[#0022FF] block">
              // CASE_STUDY_DETAILS
            </span>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-black mt-0.5">
              {projectMeta.subtitle}
            </h4>
            {projectMeta.desc && (
              <p className="text-xs sm:text-sm text-zinc-700 mt-1 max-w-2xl leading-relaxed">
                {projectMeta.desc}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-black text-white hover:bg-[#0022FF] border-2 border-black px-6 py-2.5 text-xs font-black uppercase font-mono shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              CLOSE ALBUM
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
