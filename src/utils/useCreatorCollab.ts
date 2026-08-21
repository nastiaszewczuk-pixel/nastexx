import { useState, useEffect } from 'react';

export interface DemographicsData {
  genderSplit: { female: string; male: string };
  primaryAge: string;
  ageGroups: { range: string; percentage: number }[];
  topLocations: string[];
  gender: { category: string; percentage: number; label: string }[];
  locations: { category: string; percentage: number; label: string }[];
  age: { category: string; percentage: number; label: string }[];
  niches: string[];
}

export interface CreatorMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  highlight?: boolean;
}

export interface DemographicItem {
  category: string;
  percentage: number;
  label: string;
}

export interface CreatorMediaItem {
  id: string;
  type: 'video' | 'image' | 'embed';
  url: string;
  title: string;
  formatTag: 'UGC_REEL' | 'EDITORIAL_PHOTO' | 'PRODUCT_CAROUSEL' | 'VLOG_INTEGRATION' | 'ANALYTICS_PROOF' | 'SPARK_AD';
  category: 'REELS' | 'PHOTOS' | 'PROOFS' | 'SPARK_ADS';
  metrics?: string;
  description: string;
  clientOrNiche?: string;
  aspectRatio?: '9:16' | '1:1' | '4:5' | '16:9';
  createdAt: number;
}

export interface CreatorStatProofItem {
  id: string;
  title: string;
  metricTag: string; // e.g. "800K REACH", "20.4M VIEWS", "+142% SURGE"
  category: 'REACH' | 'VIRAL_REELS' | 'DEMOGRAPHICS' | 'CONVERSIONS' | 'ENGAGEMENT' | 'GENERAL';
  periodOrDate?: string; // e.g. "Last 30 Days", "Peak Reel Campaign"
  source?: string; // e.g. "Meta Professional Dashboard", "Instagram Insights"
  imageUrl: string;
  description: string;
  statsHighlights?: { label: string; value: string }[];
  createdAt: number;
}

export interface CollabFormat {
  id: string;
  title: string;
  code: string;
  turnaround: string;
  deliverables: string[];
  bestFor: string;
  description: string;
  badge?: string;
  tag?: string;
  accent: string;
}

const DB_NAME = 'AnastasiyaCreatorDB';
const STORE_NAME = 'creator_media';
const STATS_PROOFS_STORE = 'creator_stat_proofs';
const METRICS_STORAGE_KEY = 'anastasiya_creator_metrics_v2';

export const DEFAULT_CREATOR_METRICS: CreatorMetric[] = [
  {
    id: 'reach',
    label: 'MONTHLY REACH',
    value: '800K+',
    subtext: 'Accounts reached across 30 days',
    trend: '+142% organic surge',
    highlight: true
  },
  {
    id: 'engagement',
    label: 'ENGAGEMENT RATE',
    value: '8.4%',
    subtext: '3.2x above industry benchmark (2.6%)',
    trend: 'High comments & saves ratio'
  },
  {
    id: 'reel_views',
    label: 'AVG REEL VIEWS',
    value: '30K - 100K',
    subtext: 'Consistent viral retention & engagement',
    trend: 'Viral retention hooks',
    highlight: true
  },
  {
    id: 'audience_quality',
    label: 'AUDIENCE QUALITY',
    value: '91.8%',
    subtext: 'Authentic & highly active followers',
    trend: 'Zero bots / High trust index'
  }
];

export const DEFAULT_DEMOGRAPHICS: DemographicsData = {
  genderSplit: { female: '82%', male: '18%' },
  primaryAge: '25-34 (48%)',
  ageGroups: [
    { range: '18 - 24', percentage: 38 },
    { range: '25 - 34', percentage: 48 },
    { range: '35 - 44', percentage: 14 }
  ],
  topLocations: ['Spain (22%)', 'United States (18%)', 'Germany (10%)', 'Russia (9%)', 'Other (41%)'],
  gender: [
    { category: 'Female', percentage: 82, label: '82% Female' },
    { category: 'Male', percentage: 18, label: '18% Male' }
  ],
  locations: [
    { category: 'Spain', percentage: 22, label: 'Spain 22%' },
    { category: 'United States', percentage: 18, label: 'USA 18%' },
    { category: 'Germany', percentage: 10, label: 'Germany 10%' },
    { category: 'Russia', percentage: 9, label: 'Russia 9%' },
    { category: 'Other', percentage: 41, label: 'Other 41%' }
  ],
  age: [
    { category: '18 - 24', percentage: 38, label: '38%' },
    { category: '25 - 34', percentage: 48, label: '48% (Core Purchasing Power)' },
    { category: '35 - 44', percentage: 14, label: '14%' }
  ],
  niches: [
    'Fashion & High-End Aesthetics',
    'Beauty & Skincare Routines',
    'Lifestyle & Creative Workspaces',
    'Tech, AI Tools & Productivity Apps',
    'Travel, Boutique Hospitality & Dining'
  ]
};

export const DEFAULT_COLLAB_FORMATS: CollabFormat[] = [
  {
    id: 'ugc_reels',
    title: 'Aesthetic Short-Form UGC & Reels',
    code: 'FORMAT_01',
    turnaround: '3 - 5 Days',
    deliverables: [
      'High-retention short-form video (15-45s)',
      '3 custom hook variations for A/B testing',
      'Native on-screen kinetic captions & visual pacing',
      'Full organic & paid usage rights (30-90 days)'
    ],
    bestFor: 'Fashion, Beauty, D2C brands, Mobile Apps & SaaS wanting viral social proof.',
    description: 'Authentic direct-to-consumer videos styled with editorial elegance. Designed to capture immediate thumb-stop attention within the first 2 seconds.',
    badge: 'MOST POPULAR',
    accent: 'bg-[#FFE600]'
  },
  {
    id: 'editorial_photo',
    title: 'Editorial Product Photography & Lookbooks',
    code: 'FORMAT_02',
    turnaround: '3 - 4 Days',
    deliverables: [
      'Set of 5-10 high-resolution color-graded photos',
      'Multi-angle product styling (editorial + flatlay + lifestyle in-use)',
      'Optimized for Instagram Carousel & Website hero banners',
      'RAW & Retouched master export'
    ],
    bestFor: 'Luxury fashion, accessories, skincare packaging, architectural spaces.',
    description: 'High-definition editorial stills characterized by intentional lighting, brutalist elegance, and cinematic color grading.',
    badge: 'HIGH-RES ASSETS',
    accent: 'bg-white'
  },
  {
    id: 'vlog_integration',
    title: 'Storytelling & Day-in-the-Life Brand Integration',
    code: 'FORMAT_03',
    turnaround: '5 - 7 Days',
    deliverables: [
      'Dedicated organic narrative integration (60-90s)',
      'Interactive Instagram Stories set (3-5 frames with direct tracking link)',
      'Authentic voiceover scripting seamlessly woven into personal aesthetic'
    ],
    bestFor: 'Lifestyle brands, productivity apps, tech accessories, wellness products.',
    description: 'Non-disruptive, highly engaging narrative placement that feels like a natural recommendation from a trusted creative peer rather than an ad.',
    badge: 'HIGH CONVERSION',
    accent: 'bg-[#FFE600]'
  },
  {
    id: 'creative_direction',
    title: 'Full Creative Direction & Scriptwriting',
    code: 'FORMAT_04',
    turnaround: 'Custom Timeline',
    deliverables: [
      'Full visual storyboard treatment & moodboard',
      '10-20 high-converting viral script concepts',
      'Shotlist with camera movement & sound design cues',
      'On-set talent & model directing'
    ],
    bestFor: 'Brands looking for in-house creative overhaul or 360° campaign production.',
    description: 'Comprehensive creative vision from blank page to finished master. Combining 6+ years of marketing strategy with striking visual directing.',
    badge: 'STRATEGIC DIRECTING',
    accent: 'bg-[#0022FF] text-white'
  }
];

export const DEFAULT_CREATOR_MEDIA: CreatorMediaItem[] = [
  {
    id: 'media-ugc-1',
    type: 'embed',
    url: 'https://www.instagram.com/reel/DY7WntUsL4U/embed/',
    title: 'Creative Reel 1',
    formatTag: 'UGC_REEL',
    category: 'REELS',
    metrics: '',
    description: '',
    clientOrNiche: '',
    aspectRatio: '9:16',
    createdAt: Date.now() - 600000
  },
  {
    id: 'media-ugc-2',
    type: 'embed',
    url: 'https://www.instagram.com/reel/DZFbFtQswmK/embed/',
    title: 'Creative Reel 2',
    formatTag: 'VLOG_INTEGRATION',
    category: 'REELS',
    metrics: '',
    description: '',
    clientOrNiche: '',
    aspectRatio: '9:16',
    createdAt: Date.now() - 500000
  },
  {
    id: 'media-ugc-3',
    type: 'embed',
    url: 'https://www.instagram.com/reel/DVYxXIlDCOg/embed/',
    title: 'Creative Reel 3',
    formatTag: 'UGC_REEL',
    category: 'REELS',
    metrics: '',
    description: '',
    clientOrNiche: '',
    aspectRatio: '9:16',
    createdAt: Date.now() - 400000
  },
  {
    id: 'media-ugc-4',
    type: 'embed',
    url: 'https://www.instagram.com/reel/DJm0iT-vRLL/embed/',
    title: 'Creative Reel 4',
    formatTag: 'UGC_REEL',
    category: 'REELS',
    metrics: '',
    description: '',
    clientOrNiche: '',
    aspectRatio: '9:16',
    createdAt: Date.now() - 300000
  }
];

export const DEFAULT_CREATOR_STAT_PROOFS: CreatorStatProofItem[] = [
  {
    id: 'stat-reach-1',
    title: 'Instagram Professional Dashboard // 30-Day Reach Surge',
    metricTag: '800,420 REACH (+142%)',
    category: 'REACH',
    periodOrDate: 'Last 30 Days',
    source: 'Meta Professional Dashboard',
    imageUrl: '/image-24.jpg',
    description: '30-day analytics screenshot showing 800K+ accounts reached, 92.4% non-followers discovery through organic explore distribution, and 64,200 content interactions.',
    statsHighlights: [
      { label: 'Accounts Reached', value: '800,420' },
      { label: 'Non-Followers Discovery', value: '92.4%' },
      { label: 'Profile Visits', value: '48,200' }
    ],
    createdAt: Date.now() - 1300000
  },
  {
    id: 'stat-reels-1',
    title: 'Viral High-Fashion Reel // 20.4M Video Plays & High Retention',
    metricTag: '20,400,000+ VIEWS',
    category: 'VIRAL_REELS',
    periodOrDate: 'Peak Campaign',
    source: 'Instagram Reel Analytics',
    imageUrl: '/image-25.jpg',
    description: 'Analytics breakdown for viral high-fashion reel campaign reaching 20.4M video plays, 1.2M likes, 142K shares, and 88.5K saves with 82% retention past 3 seconds.',
    statsHighlights: [
      { label: 'Total Video Plays', value: '20,410,200' },
      { label: 'Likes & Saves', value: '1,288,500' },
      { label: 'Viral Shares', value: '142,400' }
    ],
    createdAt: Date.now() - 1200000
  },
  {
    id: 'stat-demo-1',
    title: 'Follower Demographics & Age Matrix',
    metricTag: '82% FEMALE // 48% (25-34)',
    category: 'DEMOGRAPHICS',
    periodOrDate: 'Active Audience',
    source: 'Audience Insights',
    imageUrl: '/image-26.jpg',
    description: 'Demographics matrix showing 82% female audience, with primary concentration in 25-34 (48%) and 18-24 (38%) age groups across European and North American fashion/tech markets.',
    statsHighlights: [
      { label: 'Female Audience', value: '82%' },
      { label: 'Core Age 25-34', value: '48%' },
      { label: 'Active Followers', value: '91.8%' }
    ],
    createdAt: Date.now() - 1100000
  },
  {
    id: 'stat-geo-1',
    title: 'Top Geographic Markets & Key Urban Hubs',
    metricTag: 'SPAIN 22% // USA 18%',
    category: 'DEMOGRAPHICS',
    periodOrDate: 'Global Reach',
    source: 'Country & City Insights',
    imageUrl: '/image-27.jpg',
    description: 'Geographic distribution breakdown: Spain (22%), United States (18%), Germany (10%), and global urban centers (50%), centered around Barcelona, Madrid, Warsaw, NYC, and Miami.',
    statsHighlights: [
      { label: 'Spain Share', value: '22%' },
      { label: 'USA Share', value: '18%' },
      { label: 'Germany Share', value: '10%' }
    ],
    createdAt: Date.now() - 1000000
  },
  {
    id: 'stat-conv-1',
    title: 'Instagram Story Link Clicks & Conversions',
    metricTag: '14,200 LINK CLICKS (8.4% CTR)',
    category: 'CONVERSIONS',
    periodOrDate: 'Brand Campaign',
    source: 'Stories Performance',
    imageUrl: '/image-28.jpg',
    description: 'Story analytics showing conversion power: 14.2K external link sticker clicks with an 8.4% click-through rate for partner brand activations and mobile app launches.',
    statsHighlights: [
      { label: 'Story Link Taps', value: '14,200' },
      { label: 'Click-Through Rate', value: '8.4%' },
      { label: 'Story Completion', value: '91.2%' }
    ],
    createdAt: Date.now() - 900000
  },
  {
    id: 'stat-engagement-1',
    title: 'Audience Authenticity & Quality Benchmark Score',
    metricTag: '91.8% REAL AUDIENCE',
    category: 'ENGAGEMENT',
    periodOrDate: 'Annual Review',
    source: 'HypeAuditor & Insights',
    imageUrl: '/image-29.jpg',
    description: 'Audience analysis showing 91.8% real and active followers, zero bot flags, and an engagement rate 3.2x above creator benchmark averages.',
    statsHighlights: [
      { label: 'Real Followers Score', value: '91.8%' },
      { label: 'Engagement Rate', value: '8.4%' },
      { label: 'Quality Grade', value: 'Grade A' }
    ],
    createdAt: Date.now() - 800000
  },
  {
    id: 'stat-story-views',
    title: 'Daily Stories Reach & 24-Hour Viewership Retention',
    metricTag: '42,500+ DAILY VIEWS',
    category: 'ENGAGEMENT',
    periodOrDate: 'Daily Average',
    source: 'Instagram Stories Insights',
    imageUrl: '/image-30.jpg',
    description: 'Consistent 40K-45K daily story viewership with interactive polls, question stickers, and swipe-up conversion stickiness.',
    statsHighlights: [
      { label: 'Daily Viewers', value: '42,500' },
      { label: 'Poll Engagement', value: '24.6%' },
      { label: '24h Retention', value: '88.4%' }
    ],
    createdAt: Date.now() - 700000
  },
  {
    id: 'stat-profile-visits',
    title: 'Monthly Profile Discovery & External Website Clicks',
    metricTag: '48,200 PROFILE VISITS',
    category: 'REACH',
    periodOrDate: 'Last 30 Days',
    source: 'Meta Insights',
    imageUrl: '/image-31.jpg',
    description: 'High-intent profile visits resulting in 6,400 external link clicks to partner brands, boutique stores, and creative lookbook albums.',
    statsHighlights: [
      { label: 'Profile Visits', value: '48,200' },
      { label: 'Website Link Taps', value: '6,400' },
      { label: 'Email Button Clicks', value: '340' }
    ],
    createdAt: Date.now() - 600000
  },
  {
    id: 'stat-ugc-retention',
    title: 'UGC Video Hook & 3-Second Retention Curve',
    metricTag: '84.6% HOOK RETENTION',
    category: 'VIRAL_REELS',
    periodOrDate: 'UGC Campaign',
    source: 'Video Retention Analytics',
    imageUrl: '/image-32.jpg',
    description: 'Retention analytics graph verifying that 84.6% of viewers watch past the first 3 seconds, driving algorithmic recommendation across explore reels.',
    statsHighlights: [
      { label: '3s Retention Rate', value: '84.6%' },
      { label: 'Avg Watch Duration', value: '18.2s' },
      { label: 'Full Completion Rate', value: '62.4%' }
    ],
    createdAt: Date.now() - 500000
  },
  {
    id: 'stat-spark-ad-roas',
    title: 'Paid Spark Ads & Paid Conversion Breakdown',
    metricTag: '4.2x ROAS // $0.02 CPV',
    category: 'CONVERSIONS',
    periodOrDate: 'Paid Campaign',
    source: 'Meta Ads Manager',
    imageUrl: '/image-33.jpg',
    description: 'Tested paid media activation achieving a 4.2x return on ad spend, 350K paid reach, and low $0.02 cost per 100% video view.',
    statsHighlights: [
      { label: 'ROAS Return', value: '4.2x' },
      { label: 'Cost Per View', value: '$0.02' },
      { label: 'Conversion Rate', value: '3.8%' }
    ],
    createdAt: Date.now() - 400000
  },
  {
    id: 'stat-saves-shares',
    title: 'Viral Bookmark & Direct Share Ratio',
    metricTag: '88.5K SAVES // 142K SHARES',
    category: 'VIRAL_REELS',
    periodOrDate: 'Campaign Total',
    source: 'Content Interactions',
    imageUrl: '/image-34.jpg',
    description: 'Exceptionally high content utility and save rates for styling tips, location guides, and creative direction setups.',
    statsHighlights: [
      { label: 'Content Saves', value: '88,500' },
      { label: 'Direct Shares', value: '142,400' },
      { label: 'Total Comments', value: '12,800' }
    ],
    createdAt: Date.now() - 300000
  }
];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STATS_PROOFS_STORE)) {
        db.createObjectStore(STATS_PROOFS_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function useCreatorCollab() {
  const [metrics, setMetrics] = useState<CreatorMetric[]>(() => {
    try {
      const saved = localStorage.getItem(METRICS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CREATOR_METRICS;
  });

  const [mediaItems, setMediaItems] = useState<CreatorMediaItem[]>(DEFAULT_CREATOR_MEDIA);
  const [statProofs, setStatProofs] = useState<CreatorStatProofItem[]>(DEFAULT_CREATOR_STAT_PROOFS);
  const [demographics, setDemographics] = useState(DEFAULT_DEMOGRAPHICS);
  const [collabFormats, setCollabFormats] = useState(DEFAULT_COLLAB_FORMATS);
  const [isLoading, setIsLoading] = useState(true);

  // Load custom media and stat proofs from IndexedDB
  useEffect(() => {
    let isMounted = true;
    const loadFromDB = async () => {
      try {
        const db = await openDB();
        
        // 1. Load Media Items
        const tx = db.transaction([STORE_NAME, STATS_PROOFS_STORE], 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const proofsStore = tx.objectStore(STATS_PROOFS_STORE);

        const mediaRequest = store.getAll();
        const proofsRequest = proofsStore.getAll();

        mediaRequest.onsuccess = () => {
          if (!isMounted) return;
          setMediaItems(DEFAULT_CREATOR_MEDIA);
        };

        proofsRequest.onsuccess = () => {
          if (!isMounted) return;
          const customProofs: CreatorStatProofItem[] = proofsRequest.result || [];
          if (customProofs.length >= 11) {
            // Keep up to 11 screenshots
            const pruned = customProofs.slice(0, 11);
            setStatProofs(pruned);
          } else if (customProofs.length > 0) {
            // Merge custom proofs with defaults so there are always 11 screenshots
            const existingIds = new Set(customProofs.map(p => p.id));
            const needed = 11 - customProofs.length;
            const extraDefaults = DEFAULT_CREATOR_STAT_PROOFS.filter(d => !existingIds.has(d.id)).slice(0, needed);
            const combined = [...customProofs, ...extraDefaults];
            setStatProofs(combined);
          } else {
            setStatProofs(DEFAULT_CREATOR_STAT_PROOFS);
          }
          setIsLoading(false);
        };

        tx.onerror = () => {
          if (isMounted) setIsLoading(false);
        };
      } catch (err) {
        console.warn('Failed to load creator media or stat proofs from IndexedDB:', err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadFromDB();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveMetrics = (newMetrics: CreatorMetric[]) => {
    setMetrics(newMetrics);
    try {
      localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(newMetrics));
    } catch (e) {
      console.warn('Failed to save metrics to localStorage:', e);
    }
  };

  const addMediaItem = async (item: Omit<CreatorMediaItem, 'id' | 'createdAt'> & { fileBlob?: Blob }) => {
    const newItem: CreatorMediaItem & { fileBlob?: Blob } = {
      ...item,
      id: 'creator-media-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      createdAt: Date.now()
    };

    const updated = [newItem, ...mediaItems];
    setMediaItems(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(newItem);
    } catch (err) {
      console.error('Failed to save media item to IndexedDB:', err);
    }

    return newItem;
  };

  const addMediaItemFiles = async (
    files: File[],
    meta?: Partial<Omit<CreatorMediaItem, 'id' | 'createdAt' | 'url'>>
  ) => {
    const newItems: (CreatorMediaItem & { fileBlob?: Blob })[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|m4v|ogg)$/i) !== null;
      const mediaUrl = URL.createObjectURL(file);
      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      const newItem: CreatorMediaItem & { fileBlob?: Blob } = {
        id: 'creator-media-' + Date.now() + '-' + i + '-' + Math.random().toString(36).substr(2, 4),
        type: isVideo ? 'video' : 'image',
        url: mediaUrl,
        fileBlob: file,
        title: meta?.title || cleanFileName.toUpperCase(),
        formatTag: meta?.formatTag || (isVideo ? 'UGC_REEL' : 'EDITORIAL_PHOTO'),
        category: meta?.category || (isVideo ? 'REELS' : 'PHOTOS'),
        metrics: meta?.metrics || (isVideo ? 'Custom Reel // 4K Upload' : 'Creator Photo // High-Res'),
        description: meta?.description || `Custom creator asset uploaded from file (${file.name}).`,
        clientOrNiche: meta?.clientOrNiche || 'Brand Collab / Creator Reel',
        aspectRatio: meta?.aspectRatio || '9:16',
        createdAt: Date.now() + i
      };

      newItems.push(newItem);
    }

    const updated = [...newItems, ...mediaItems];
    setMediaItems(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      newItems.forEach(item => store.put(item));
    } catch (err) {
      console.error('Failed to save batch media items to IndexedDB:', err);
    }
  };

  const updateMediaItem = async (id: string, updates: Partial<CreatorMediaItem>) => {
    const updated = mediaItems.map(item => item.id === id ? { ...item, ...updates } : item);
    setMediaItems(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const target = updated.find(item => item.id === id);
      if (target) store.put(target);
    } catch (err) {
      console.error('Failed to update media item in IndexedDB:', err);
    }
  };

  const removeMediaItem = async (id: string) => {
    const updated = mediaItems.filter(item => item.id !== id);
    setMediaItems(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
    } catch (err) {
      console.error('Failed to remove media item from IndexedDB:', err);
    }
  };

  const resetMediaToDefaults = async () => {
    setMediaItems(DEFAULT_CREATOR_MEDIA);
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      DEFAULT_CREATOR_MEDIA.forEach(item => store.put(item));
    } catch (err) {
      console.error('Failed to reset creator media in IndexedDB:', err);
    }
  };

  // --- STAT PROOFS / SCREENSHOTS ALBUM OPERATIONS ---
  const addStatProof = async (proof: Omit<CreatorStatProofItem, 'id' | 'createdAt'>) => {
    const newProof: CreatorStatProofItem = {
      ...proof,
      id: 'stat-proof-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      createdAt: Date.now()
    };

    const updated = [newProof, ...statProofs];
    setStatProofs(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STATS_PROOFS_STORE, 'readwrite');
      const store = tx.objectStore(STATS_PROOFS_STORE);
      store.put(newProof);
    } catch (err) {
      console.error('Failed to save stat proof to IndexedDB:', err);
    }

    return newProof;
  };

  const addStatProofFiles = async (files: File[], defaultTitle?: string) => {
    const newProofs: CreatorStatProofItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const newProof: CreatorStatProofItem = {
        id: 'stat-proof-' + Date.now() + '-' + i + '-' + Math.random().toString(36).substr(2, 4),
        title: defaultTitle || `Analytics Screenshot: ${cleanFileName.toUpperCase()}`,
        metricTag: 'VERIFIED SCREENSHOT',
        category: 'GENERAL',
        periodOrDate: 'Recent Screenshot',
        source: 'Uploaded Screenshot',
        imageUrl: dataUrl,
        description: `Verified statistics screenshot uploaded on ${new Date().toLocaleDateString()}.`,
        createdAt: Date.now() + i
      };

      newProofs.push(newProof);
    }

    const updated = [...newProofs, ...statProofs];
    setStatProofs(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STATS_PROOFS_STORE, 'readwrite');
      const store = tx.objectStore(STATS_PROOFS_STORE);
      newProofs.forEach(item => store.put(item));
    } catch (err) {
      console.error('Failed to save batch stat proofs to IndexedDB:', err);
    }
  };

  const removeStatProof = async (id: string) => {
    const updated = statProofs.filter(p => p.id !== id);
    setStatProofs(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STATS_PROOFS_STORE, 'readwrite');
      const store = tx.objectStore(STATS_PROOFS_STORE);
      store.delete(id);
    } catch (err) {
      console.error('Failed to remove stat proof from IndexedDB:', err);
    }
  };

  const updateStatProof = async (id: string, updates: Partial<CreatorStatProofItem>) => {
    const updated = statProofs.map(p => p.id === id ? { ...p, ...updates } : p);
    setStatProofs(updated);

    try {
      const db = await openDB();
      const tx = db.transaction(STATS_PROOFS_STORE, 'readwrite');
      const store = tx.objectStore(STATS_PROOFS_STORE);
      const target = updated.find(p => p.id === id);
      if (target) store.put(target);
    } catch (err) {
      console.error('Failed to update stat proof in IndexedDB:', err);
    }
  };

  const resetStatProofsToDefaults = async () => {
    setStatProofs(DEFAULT_CREATOR_STAT_PROOFS);
    try {
      const db = await openDB();
      const tx = db.transaction(STATS_PROOFS_STORE, 'readwrite');
      const store = tx.objectStore(STATS_PROOFS_STORE);
      store.clear();
      DEFAULT_CREATOR_STAT_PROOFS.forEach(item => store.put(item));
    } catch (err) {
      console.error('Failed to reset stat proofs in IndexedDB:', err);
    }
  };

  return {
    metrics,
    demographics,
    collabFormats,
    mediaItems,
    statProofs,
    isLoading,
    saveMetrics,
    addMediaItem,
    addMediaItemFiles,
    updateMediaItem,
    removeMediaItem,
    resetMediaToDefaults,
    addStatProof,
    addStatProofFiles,
    removeStatProof,
    updateStatProof,
    resetStatProofsToDefaults
  };
}
