import { useState, useEffect } from 'react';

export interface AlbumMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  caption?: string;
  createdAt: number;
}

export interface ProjectLinkItem {
  id: string;
  label: string;
  url: string;
}

const DB_NAME = 'AnastasiyaPortfolioAlbumsDB';
const STORE_NAME = 'project_albums';
const LINKS_STORE = 'project_links';

// Initial default media items and 3 links for the albums
export const DEFAULT_ALBUMS_DATA: Record<string, { 
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
      { id: 'nyc-default-2', type: 'video', url: '/image-14.mp4', name: 'Fitness App UGC Hook Sets', caption: 'High retention UGC format production', createdAt: Date.now() - 40000 }
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
      { id: 'lifestyle-default-7', type: 'video', url: '/image-21.mp4', name: 'Aesthetic Focus', caption: '', createdAt: Date.now() - 30000 },
      { id: 'lifestyle-default-8', type: 'video', url: '/image-22.mp4', name: 'Light & Color', caption: '', createdAt: Date.now() - 20000 },
      { id: 'lifestyle-default-9', type: 'image', url: '/image-23.jpg', name: 'Final Polish', caption: '', createdAt: Date.now() - 10000 }
    ],
    defaultLinks: []
  }
};

export function usePortfolioAlbums() {
  const [albums, setAlbums] = useState<Record<string, AlbumMediaItem[]>>({});
  const [projectLinks, setProjectLinks] = useState<Record<string, ProjectLinkItem[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize DB and load all saved albums and links
  useEffect(() => {
    let active = true;

    const initDb = async () => {
      try {
        const request = indexedDB.open(DB_NAME, 2);

        request.onupgradeneeded = (e: any) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
          if (!db.objectStoreNames.contains(LINKS_STORE)) {
            db.createObjectStore(LINKS_STORE);
          }
        };

        request.onsuccess = (e: any) => {
          const db = e.target.result;
          const initialData: Record<string, AlbumMediaItem[]> = {};
          const initialLinks: Record<string, ProjectLinkItem[]> = {};

          // Fetch media items
          const tx = db.transaction([STORE_NAME, LINKS_STORE], 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const linksStore = tx.objectStore(LINKS_STORE);

          let pending = Object.keys(DEFAULT_ALBUMS_DATA).length;
          
          Object.keys(DEFAULT_ALBUMS_DATA).forEach((key) => {
            const getReq = store.get(key);
            getReq.onsuccess = () => {
              if (getReq.result && Array.isArray(getReq.result.items)) {
                let restoredItems = getReq.result.items.map((item: any) => {
                  if (item.blob) {
                    return {
                      ...item,
                      url: URL.createObjectURL(item.blob)
                    };
                  }
                  return item;
                });

                initialData[key] = restoredItems;
              } else {
                initialData[key] = DEFAULT_ALBUMS_DATA[key].defaultItems;
              }

              // Also get links
              const linkReq = linksStore.get(key);
              linkReq.onsuccess = () => {
                if (linkReq.result && Array.isArray(linkReq.result.links)) {
                  let links = linkReq.result.links;
                  // Auto-upgrade legacy default links for 01
                  if (key === '01' && (links.some((l: any) => l.url?.includes('instagram.com/nastexx') || l.url?.includes('tiktok.com/@nastexx')) || links.length > 2)) {
                    links = DEFAULT_ALBUMS_DATA['01'].defaultLinks || [];
                    try {
                      const writeTx = db.transaction(LINKS_STORE, 'readwrite');
                      writeTx.objectStore(LINKS_STORE).put({ key: '01', links }, '01');
                    } catch {}
                  }
                  // Auto-upgrade legacy default links for 02
                  if (key === '02' && links.some((l: any) => l.url?.includes('apps.apple.com') || l.url?.includes('tiktok.com/@fluently') || l.url?.includes('instagram.com/nastexx'))) {
                    links = DEFAULT_ALBUMS_DATA['02'].defaultLinks || [];
                    try {
                      const writeTx = db.transaction(LINKS_STORE, 'readwrite');
                      writeTx.objectStore(LINKS_STORE).put({ key: '02', links }, '02');
                    } catch {}
                  }
                  // Auto-upgrade legacy default links for 03
                  if (key === '03' && (links.some((l: any) => !l.url?.includes('vt.tiktok.com')) || links.length !== 3)) {
                    links = DEFAULT_ALBUMS_DATA['03'].defaultLinks || [];
                    try {
                      const writeTx = db.transaction(LINKS_STORE, 'readwrite');
                      writeTx.objectStore(LINKS_STORE).put({ key: '03', links }, '03');
                    } catch {}
                  }
                  // Auto-clear links for 04, 05, and 06 as requested
                  if ((key === '04' || key === '05' || key === '06') && links.length > 0) {
                    links = [];
                    try {
                      const writeTx = db.transaction(LINKS_STORE, 'readwrite');
                      writeTx.objectStore(LINKS_STORE).put({ key, links: [] }, key);
                    } catch {}
                  }
                  initialLinks[key] = links;
                } else {
                  initialLinks[key] = DEFAULT_ALBUMS_DATA[key].defaultLinks || [];
                }

                pending--;
                if (pending === 0 && active) {
                  setAlbums(initialData);
                  setProjectLinks(initialLinks);
                  setIsLoaded(true);
                }
              };
              linkReq.onerror = () => {
                initialLinks[key] = DEFAULT_ALBUMS_DATA[key].defaultLinks || [];
                pending--;
                if (pending === 0 && active) {
                  setAlbums(initialData);
                  setProjectLinks(initialLinks);
                  setIsLoaded(true);
                }
              };
            };
            getReq.onerror = () => {
              initialData[key] = DEFAULT_ALBUMS_DATA[key].defaultItems;
              initialLinks[key] = DEFAULT_ALBUMS_DATA[key].defaultLinks || [];
              pending--;
              if (pending === 0 && active) {
                setAlbums(initialData);
                setProjectLinks(initialLinks);
                setIsLoaded(true);
              }
            };
          });
        };

        request.onerror = () => {
          const fallbackData: Record<string, AlbumMediaItem[]> = {};
          const fallbackLinks: Record<string, ProjectLinkItem[]> = {};
          Object.keys(DEFAULT_ALBUMS_DATA).forEach(k => {
            fallbackData[k] = DEFAULT_ALBUMS_DATA[k].defaultItems;
            fallbackLinks[k] = DEFAULT_ALBUMS_DATA[k].defaultLinks || [];
          });
          if (active) {
            setAlbums(fallbackData);
            setProjectLinks(fallbackLinks);
            setIsLoaded(true);
          }
        };
      } catch {
        const fallbackData: Record<string, AlbumMediaItem[]> = {};
        const fallbackLinks: Record<string, ProjectLinkItem[]> = {};
        Object.keys(DEFAULT_ALBUMS_DATA).forEach(k => {
          fallbackData[k] = DEFAULT_ALBUMS_DATA[k].defaultItems;
          fallbackLinks[k] = DEFAULT_ALBUMS_DATA[k].defaultLinks || [];
        });
        if (active) {
          setAlbums(fallbackData);
          setProjectLinks(fallbackLinks);
          setIsLoaded(true);
        }
      }
    };

    initDb();

    return () => {
      active = false;
    };
  }, []);

  const addMediaToAlbum = async (projectId: string, files: File[]) => {
    const newItems: AlbumMediaItem[] = [];
    const storableItems: any[] = [];

    for (const file of files) {
      const isVideo = file.type.startsWith('video/');
      const url = URL.createObjectURL(file);
      const item: AlbumMediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: isVideo ? 'video' : 'image',
        url: url,
        name: file.name,
        createdAt: Date.now()
      };
      newItems.push(item);
      storableItems.push({
        ...item,
        blob: file
      });
    }

    const updatedAlbum = [...newItems, ...(albums[projectId] || [])];
    setAlbums(prev => ({
      ...prev,
      [projectId]: updatedAlbum
    }));

    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        
        store.put({
          projectId,
          items: updatedAlbum.map(it => {
            const foundStored = storableItems.find(s => s.id === it.id);
            if (foundStored) return foundStored;
            return it;
          }),
          updatedAt: Date.now()
        }, projectId);
      };
    } catch (err) {
      console.error('Failed to save album media to IndexedDB:', err);
    }
  };

  const addMediaItemByUrl = (projectId: string, mediaData: { url: string; name: string; caption?: string; type?: 'image' | 'video' }) => {
    const item: AlbumMediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: mediaData.type || (mediaData.url.endsWith('.mp4') || mediaData.url.endsWith('.webm') ? 'video' : 'image'),
      url: mediaData.url,
      name: mediaData.name || 'Custom Media',
      caption: mediaData.caption || '',
      createdAt: Date.now()
    };

    const updatedAlbum = [item, ...(albums[projectId] || [])];
    setAlbums(prev => ({
      ...prev,
      [projectId]: updatedAlbum
    }));

    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({
          projectId,
          items: updatedAlbum,
          updatedAt: Date.now()
        }, projectId);
      };
    } catch (err) {
      console.error('Failed to save album media to IndexedDB:', err);
    }
  };

  const removeMediaFromAlbum = (projectId: string, mediaId: string) => {
    const updatedAlbum = (albums[projectId] || []).filter(it => it.id !== mediaId);
    setAlbums(prev => ({
      ...prev,
      [projectId]: updatedAlbum
    }));

    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({
          projectId,
          items: updatedAlbum,
          updatedAt: Date.now()
        }, projectId);
      };
    } catch {
      // Ignore
    }
  };

  const updateProjectLinks = (projectId: string, links: ProjectLinkItem[]) => {
    setProjectLinks(prev => ({
      ...prev,
      [projectId]: links
    }));

    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(LINKS_STORE, 'readwrite');
        const store = tx.objectStore(LINKS_STORE);
        store.put({
          projectId,
          links,
          updatedAt: Date.now()
        }, projectId);
      };
    } catch (err) {
      console.error('Failed to save project links:', err);
    }
  };

  const resetAlbumToDefault = (projectId: string) => {
    const defaultItems = DEFAULT_ALBUMS_DATA[projectId]?.defaultItems || [];
    const defaultLinks = DEFAULT_ALBUMS_DATA[projectId]?.defaultLinks || [];

    setAlbums(prev => ({
      ...prev,
      [projectId]: defaultItems
    }));
    setProjectLinks(prev => ({
      ...prev,
      [projectId]: defaultLinks
    }));

    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction([STORE_NAME, LINKS_STORE], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const linksStore = tx.objectStore(LINKS_STORE);
        store.delete(projectId);
        linksStore.delete(projectId);
      };
    } catch {
      // Ignore
    }
  };

  return {
    albums,
    projectLinks,
    isLoaded,
    addMediaToAlbum,
    addMediaItemByUrl,
    removeMediaFromAlbum,
    updateProjectLinks,
    resetAlbumToDefault
  };
}
