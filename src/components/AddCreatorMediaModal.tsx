import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, Video, Image as ImageIcon, Play, Check, AlertCircle, Sparkles } from 'lucide-react';
import { CreatorMediaItem } from '../utils/useCreatorCollab';

interface AddCreatorMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<CreatorMediaItem, 'id' | 'createdAt'> & { id?: string; fileBlob?: Blob }) => void;
  initialItem?: CreatorMediaItem | null;
}

export function AddCreatorMediaModal({
  isOpen,
  onClose,
  onSave,
  initialItem
}: AddCreatorMediaModalProps) {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [sourceType, setSourceType] = useState<'file' | 'url'>('file');
  const [url, setUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [formatTag, setFormatTag] = useState<CreatorMediaItem['formatTag']>('UGC_REEL');
  const [category, setCategory] = useState<CreatorMediaItem['category']>('REELS');
  const [metrics, setMetrics] = useState<string>('450K Views // 38K Likes');
  const [clientOrNiche, setClientOrNiche] = useState<string>('Brand Collaboration');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialItem) {
      setMediaType(initialItem.type);
      setUrl(initialItem.url);
      setPreviewUrl(initialItem.url);
      setSourceType(initialItem.url.startsWith('blob:') || initialItem.url.startsWith('data:') ? 'file' : 'url');
      setTitle(initialItem.title);
      setFormatTag(initialItem.formatTag);
      setCategory(initialItem.category);
      setMetrics(initialItem.metrics || '');
      setClientOrNiche(initialItem.clientOrNiche || '');
      setDescription(initialItem.description || '');
      setSelectedFile(null);
    } else {
      setMediaType('video');
      setSourceType('file');
      setUrl('');
      setPreviewUrl('');
      setTitle('');
      setFormatTag('UGC_REEL');
      setCategory('REELS');
      setMetrics('520K Views // 41K Likes');
      setClientOrNiche('Fashion & Lifestyle');
      setDescription('');
      setSelectedFile(null);
    }
    setError('');
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const isVid = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|m4v|ogg)$/i) !== null;
      setMediaType(isVid ? 'video' : 'image');
      const objUrl = URL.createObjectURL(file);
      setPreviewUrl(objUrl);
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.toUpperCase());
      }
      setError('');
    }
  };

  const handleUrlChange = (val: string) => {
    setUrl(val);
    setPreviewUrl(val);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for the video reel.');
      return;
    }

    const finalUrl = sourceType === 'file' ? previewUrl : url;
    if (!finalUrl && !selectedFile) {
      setError('Please choose a media file or provide a valid media URL.');
      return;
    }

    onSave({
      id: initialItem?.id,
      type: mediaType,
      url: finalUrl,
      fileBlob: selectedFile || undefined,
      title: title.trim(),
      formatTag,
      category,
      metrics: metrics.trim() || '4K Creator Reel',
      clientOrNiche: clientOrNiche.trim() || 'Brand Partner',
      description: description.trim() || `Creator asset by Anastasiya Shauchuk.`,
      aspectRatio: '9:16'
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans"
      onClick={onClose}
    >
      <div 
        className="border-3 border-black bg-white w-full max-w-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FFE600] border-b-3 border-black p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-black text-[#39FF14] text-[11px] font-mono font-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
              {initialItem ? 'EDIT REEL' : 'NEW CREATOR MEDIA'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              {initialItem ? 'Edit Creator Reel' : 'Add Creator Reel / UGC Asset'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="bg-black text-white hover:bg-red-600 border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {error && (
            <div className="bg-red-100 border-2 border-red-600 text-red-900 px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Source Selector: File Upload vs URL */}
          <div>
            <label className="block text-xs font-mono font-black text-black uppercase mb-1.5">
              1. Media Source &amp; File
            </label>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setSourceType('file')}
                className={`py-2 px-3 text-xs font-mono font-black border-2 border-black uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  sourceType === 'file' 
                    ? 'bg-black text-[#39FF14] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-black'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File (MP4/Photo)</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('url')}
                className={`py-2 px-3 text-xs font-mono font-black border-2 border-black uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  sourceType === 'url' 
                    ? 'bg-black text-[#FFE600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-black'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>External URL / Link</span>
              </button>
            </div>

            {sourceType === 'file' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*,image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-black bg-zinc-50 hover:bg-[#FFE600]/20 p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 bg-black text-[#39FF14] border border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-black uppercase block">
                      {selectedFile ? selectedFile.name : 'Click to Browse or Drag Video / Image File'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                      Supports .mp4, .mov, .webm, .jpg, .png (Saved directly in your browser)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://example.com/video.mp4 or photo.jpg"
                  className="w-full border-2 border-black p-2.5 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0022FF]"
                />
              </div>
            )}
          </div>

          {/* Media Preview Box */}
          {previewUrl && (
            <div className="border-2 border-black bg-black p-2 relative flex items-center justify-center max-h-48 overflow-hidden">
              {mediaType === 'video' ? (
                <video
                  src={previewUrl}
                  controls
                  className="max-h-44 w-auto object-contain mx-auto"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-44 w-auto object-contain mx-auto"
                />
              )}
              <div className="absolute top-2 left-2 bg-[#39FF14] text-black font-mono text-[9px] font-black px-2 py-0.5 border border-black uppercase">
                {mediaType.toUpperCase()} PREVIEW
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-black text-black uppercase mb-1">
                Reel Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SUMMER VIRAL HOOK REEL"
                required
                className="w-full border-2 border-black p-2 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black text-black uppercase mb-1">
                Format Tag
              </label>
              <select
                value={formatTag}
                onChange={(e) => setFormatTag(e.target.value as any)}
                className="w-full border-2 border-black p-2 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none uppercase"
              >
                <option value="UGC_REEL">UGC_REEL (Viral Hook)</option>
                <option value="VLOG_INTEGRATION">VLOG_INTEGRATION</option>
                <option value="SPARK_AD">SPARK_AD (Paid Ads)</option>
                <option value="EDITORIAL_PHOTO">EDITORIAL_PHOTO</option>
                <option value="PRODUCT_CAROUSEL">PRODUCT_CAROUSEL</option>
                <option value="ANALYTICS_PROOF">ANALYTICS_PROOF</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-black text-black uppercase mb-1">
                Performance / Key Metric
              </label>
              <input
                type="text"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="e.g. 740K Views // 52K Likes"
                className="w-full border-2 border-black p-2 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black text-black uppercase mb-1">
                Client / Niche
              </label>
              <input
                type="text"
                value={clientOrNiche}
                onChange={(e) => setClientOrNiche(e.target.value)}
                placeholder="e.g. Beauty App // NYC Fashion"
                className="w-full border-2 border-black p-2 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-black text-black uppercase mb-1">
              Description / Creative Direction
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Describe hook technique, visual grading, sound design, or campaign outcome..."
              className="w-full border-2 border-black p-2 text-xs font-mono text-black bg-zinc-50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t-2 border-black flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-black bg-white hover:bg-zinc-100 text-black px-4 py-2 font-mono text-xs font-black uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 border-black bg-black hover:bg-[#0022FF] text-[#39FF14] hover:text-white px-5 py-2 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{initialItem ? 'Save Changes' : 'Add Reel to Showcase'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
