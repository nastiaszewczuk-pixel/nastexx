const fs = require('fs');

let content = fs.readFileSync('src/utils/usePortfolioAlbums.ts', 'utf8');

const newAlbumsData = `export const DEFAULT_ALBUMS_DATA: Record<string, { 
  title: string; 
  subtitle: string; 
  tag: string; 
  metric: string; 
  role: string; 
  desc: string; 
  accent: string; 
  defaultItems: AlbumMediaItem[]; 
  defaultLinks?: ProjectLinkItem[];
}> = {
  '01': {
    title: 'Dior Paris FW Backstage',
    subtitle: 'High-Aesthetic Storytelling & Luxury Organic Reach',
    tag: 'VIRAL',
    metric: '20M+ Views // 10M+ Accounts',
    role: 'Content Creator',
    desc: 'High-aesthetic storytelling and viral organic reach generating over 20 Million views and reaching 10 Million accounts across global fashion audiences.',
    accent: 'bg-[#FFBA08]',
    defaultItems: [
      { id: 'dior-default-1', type: 'image', url: '/image-2.jpg', name: 'Dior Backstage Visual I', caption: 'Luxury Haute Couture organic visual concept', createdAt: Date.now() - 50000 },
      { id: 'dior-default-2', type: 'image', url: '/image-3.jpg', name: 'Dior Backstage Editorial Stills', caption: 'High retention pacing & aesthetic color grading', createdAt: Date.now() - 40000 },
      { id: 'dior-default-3', type: 'image', url: '/image-4.jpg', name: 'Dior Additional Capture', caption: 'Fashion details', createdAt: Date.now() - 30000 }
    ],
    defaultLinks: [
      { id: '01-link-1', label: 'LINK 1: INSTAGRAM REEL', url: 'https://www.instagram.com/reel/DPTSBxXjKlp/?igsh=c2VweWh3bnFicTNz' },
      { id: '01-link-2', label: 'LINK 2: INSTAGRAM REEL', url: 'https://www.instagram.com/reel/DPSPkK3ApXO/?igsh=aDNtZ2c0eWNjbjA=' }
    ]
  },
  '02': {
    title: 'Fluently English App',
    subtitle: '0 to 100K Followers & 3K Paid Subscriptions',
    tag: 'GROWTH',
    metric: '10M+ Views // 100K+ Followers',
    role: 'Content Creator & Growth Lead',
    desc: 'Built scalable organic acquisition from scratch: 10M+ views, 100K+ new followers in 6 months, and 3,000+ paid user conversions through authentic narrative hooks.',
    accent: 'bg-yellow-300',
    defaultItems: [
      { id: 'fluently-default-1', type: 'image', url: '/image-5.jpg', name: 'Fluently Organic Growth Metrics', caption: '100K+ followers acquired organically in 6 months', createdAt: Date.now() - 50000 }
    ],
    defaultLinks: [
      { id: '02-link-1', label: 'LINK 1: INSTAGRAM REEL', url: 'https://www.instagram.com/reel/DNZAVCxSOpe/?igsh=MWxueGt4cXo1dmFlMw==' },
      { id: '02-link-2', label: 'LINK 2: INSTAGRAM REEL', url: 'https://www.instagram.com/reel/DK7_OAIhXhr/?igsh=MXA0MzR6bmd0cDAyaA==' },
      { id: '02-link-3', label: 'LINK 3: INSTAGRAM REEL', url: 'https://www.instagram.com/reel/DLLIxGESKxq/?igsh=MWh5emV4MnpoaGNqeg==' }
    ]
  },
  '03': {
    title: 'Hair Expert',
    subtitle: 'Viral Studio SMM & Client Acquisition',
    tag: 'VIRAL',
    metric: '10M+ Views in 1 Month',
    role: 'SMM Specialist & Producer',
    desc: 'Transformed beauty expertise into viral video series driving 10M+ views in 30 days and 5K+ new client followers with direct appointment lift.',
    accent: 'bg-pink-300',
    defaultItems: [
      { id: 'salon-default-1', type: 'image', url: '/image-6.jpg', name: 'Hair Expert Transformations', caption: 'Before/after viral retention dynamics', createdAt: Date.now() - 50000 }
    ],
    defaultLinks: [
      { id: '03-link-1', label: 'LINK 1: TIKTOK REEL', url: 'https://vt.tiktok.com/ZSVAxNGff/' },
      { id: '03-link-2', label: 'LINK 2: TIKTOK REEL', url: 'https://vt.tiktok.com/ZSVAxRbSh/' },
      { id: '03-link-3', label: 'LINK 3: TIKTOK REEL', url: 'https://vt.tiktok.com/ZSVAxJyYt/' }
    ]
  },
  '04': {
    title: 'Fashion Show Backstage',
    subtitle: 'Outsiders Division (126K) & Dominnico (150K)',
    tag: 'PRODUCTION',
    metric: 'Runway & Backstage In Spain',
    role: 'Photo & Video Production',
    desc: 'High-energy on-site camera direction, backstage styling captures, and rapid turnaround edits for fashion powerhouses in Barcelona and Madrid.',
    accent: 'bg-orange-300',
    defaultItems: [
      { id: 'fashion-default-1', type: 'image', url: '/image-7.jpg', name: 'Outsiders Division Runway Directing', caption: 'Backstage energy and live model coordination', createdAt: Date.now() - 50000 },
      { id: 'fashion-default-2', type: 'image', url: '/image-8.jpg', name: 'Dominnico Runway Highlights', caption: '4K rapid-turnaround deliverable packages', createdAt: Date.now() - 40000 },
      { id: 'fashion-default-3', type: 'image', url: '/image-9.jpg', name: 'Backstage Detail 1', caption: '', createdAt: Date.now() - 30000 },
      { id: 'fashion-default-4', type: 'image', url: '/image-10.jpg', name: 'Backstage Detail 2', caption: '', createdAt: Date.now() - 20000 },
      { id: 'fashion-default-5', type: 'image', url: '/image-11.jpg', name: 'Backstage Detail 3', caption: '', createdAt: Date.now() - 10000 },
      { id: 'fashion-default-6', type: 'image', url: '/image-12.jpg', name: 'Backstage Detail 4', caption: '', createdAt: Date.now() - 5000 }
    ],
    defaultLinks: []
  },
  '05': {
    title: 'UGC shootings // fitness app',
    subtitle: 'Location Scouting, Talent Logistics & Directing',
    tag: 'PRODUCTION',
    metric: 'NYC On-Set Creative Direction',
    role: 'Associate Producer & Directing',
    desc: 'On-set production logistics in New York City: location scouting across Manhattan & Brooklyn, scheduling, and model/crew coordination for a leading fitness app.',
    accent: 'bg-cyan-300',
    defaultItems: [
      { id: 'nyc-default-1', type: 'image', url: '/image-13.jpg', name: 'NYC Rooftop Production Set', caption: 'Talent management and equipment coordination in Manhattan', createdAt: Date.now() - 50000 },
      { id: 'nyc-default-2', type: 'image', url: '/image-14.jpg', name: 'Fitness App UGC Hook Sets', caption: 'High retention UGC format production', createdAt: Date.now() - 40000 }
    ],
    defaultLinks: []
  },
  '06': {
    title: 'Visual Storytelling & Lifestyle Directing',
    subtitle: 'Cross-Niche Creative Concepting & Aesthetics',
    tag: 'CREATIVE',
    metric: 'Multichannel Ecosystems',
    role: 'Creative Director & Visual Storyteller',
    desc: '',
    accent: 'bg-[#FFBA08]',
    defaultItems: [
      { id: 'lifestyle-default-1', type: 'image', url: '/image-15.jpg', name: 'Visual Storytelling', caption: 'Visual identity and natural light aesthetic directing', createdAt: Date.now() - 90000 },
      { id: 'lifestyle-default-2', type: 'image', url: '/image-16.jpg', name: 'Editorial Portraiture', caption: 'Authentic creator aesthetic and creative pacing', createdAt: Date.now() - 80000 },
      { id: 'lifestyle-default-3', type: 'image', url: '/image-17.jpg', name: 'Creative Moodboard', caption: 'Atmospheric visual concepts and mood styling', createdAt: Date.now() - 70000 },
      { id: 'lifestyle-default-4', type: 'image', url: '/image-18.jpg', name: 'Lifestyle Shoot', caption: '', createdAt: Date.now() - 60000 },
      { id: 'lifestyle-default-5', type: 'image', url: '/image-19.jpg', name: 'Lifestyle Detail', caption: '', createdAt: Date.now() - 50000 },
      { id: 'lifestyle-default-6', type: 'image', url: '/image-20.jpg', name: 'Storytelling Angle', caption: '', createdAt: Date.now() - 40000 },
      { id: 'lifestyle-default-7', type: 'image', url: '/image-21.jpg', name: 'Aesthetic Focus', caption: '', createdAt: Date.now() - 30000 },
      { id: 'lifestyle-default-8', type: 'image', url: '/image-22.jpg', name: 'Light & Color', caption: '', createdAt: Date.now() - 20000 },
      { id: 'lifestyle-default-9', type: 'image', url: '/image-23.jpg', name: 'Final Polish', caption: '', createdAt: Date.now() - 10000 }
    ],
    defaultLinks: []
  }
};`;

const startIndex = content.indexOf('export const DEFAULT_ALBUMS_DATA: Record<string');
const endIndex = content.indexOf('export function usePortfolioAlbums() {');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + newAlbumsData + "\n\n" + content.slice(endIndex);
  fs.writeFileSync('src/utils/usePortfolioAlbums.ts', content, 'utf8');
  console.log("Success");
} else {
  console.log("Failed to find bounds", startIndex, endIndex);
}
