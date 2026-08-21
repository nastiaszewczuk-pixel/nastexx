import { useState, useEffect } from 'react';

const DB_NAME = 'AnastasiyaCustomGifDB';
const STORE_NAME = 'gif_store';
const KEY = 'active_custom_gif';

export const CURATED_GIFS = [
  {
    id: 'film-sparkle',
    title: 'SPARKLE FILM',
    url: 'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif',
    badge: 'AESTHETIC // VIBE'
  },
  {
    id: 'camcorder',
    title: 'CAMCORDER REC',
    url: 'https://media.giphy.com/media/l41lO3n0gIeylQ6uY/giphy.gif',
    badge: 'LIVE // ON-AIR'
  },
  {
    id: 'spinning-star',
    title: 'CYBER STAR',
    url: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
    badge: 'CREATIVE // POP'
  },
  {
    id: 'aesthetic-neon',
    title: 'VIRAL ENERGY',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZhcHVldXR1b2pkd2Z4Z2F6eDBtMGk3OHBvZndtcW80aWZyeThreSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L1k7RIdEQqpkClhdll/giphy.gif',
    badge: 'NEO-BRUTALISM'
  }
];

export function useCustomGif() {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [customGifUrl, setCustomGifUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const initDb = async () => {
      // 1. Try legacy link storage safely
      try {
        const savedLink = localStorage.getItem('anastasiya_custom_gif_url');
        if (savedLink && (savedLink.startsWith('http://') || savedLink.startsWith('https://'))) {
          if (active) setCustomGifUrl(savedLink);
          return;
        }
      } catch {
        // Ignore quota/security errors
      }

      // 2. Load blob from IndexedDB for high-res uploaded GIFs without quota issues
      try {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (e: any) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };

        request.onsuccess = (e: any) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) return;
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const getReq = store.get(KEY);

          getReq.onsuccess = () => {
            if (active && getReq.result) {
              if (getReq.result.blob) {
                const url = URL.createObjectURL(getReq.result.blob);
                setCustomGifUrl(url);
              } else if (getReq.result.url) {
                setCustomGifUrl(getReq.result.url);
              }
            }
          };
        };
      } catch {
        // Fallback
      }
    };

    initDb();

    return () => {
      active = false;
    };
  }, []);

  const saveCustomGifBlob = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setCustomGifUrl(objectUrl);

    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ blob: file, name: file.name, updatedAt: Date.now() }, KEY);
      };
    } catch {}

    try {
      localStorage.removeItem('anastasiya_custom_gif_url');
    } catch {}
  };

  const saveCustomGifUrl = (url: string) => {
    setCustomGifUrl(url);

    try {
      localStorage.setItem('anastasiya_custom_gif_url', url);
    } catch {}

    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ url, updatedAt: Date.now() }, KEY);
      };
    } catch {}
  };

  const clearCustomGif = () => {
    setCustomGifUrl(null);
    setCurrentGifIndex(0);

    try {
      localStorage.removeItem('anastasiya_custom_gif_url');
      localStorage.removeItem('anastasiya_custom_gif');
    } catch {}

    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(KEY);
      };
    } catch {}
  };

  const cycleNextGif = () => {
    if (customGifUrl) {
      clearCustomGif();
    } else {
      setCurrentGifIndex((prev) => (prev + 1) % CURATED_GIFS.length);
    }
  };

  const selectCuratedGif = (index: number) => {
    clearCustomGif();
    setCurrentGifIndex(index);
  };

  const activeGifUrl = customGifUrl || CURATED_GIFS[currentGifIndex].url;
  const activeGifTitle = customGifUrl ? 'CUSTOM GIF' : CURATED_GIFS[currentGifIndex].title;
  const activeGifBadge = customGifUrl ? 'USER // UPLOAD' : CURATED_GIFS[currentGifIndex].badge;

  return {
    currentGifIndex,
    customGifUrl,
    activeGifUrl,
    activeGifTitle,
    activeGifBadge,
    cycleNextGif,
    selectCuratedGif,
    saveCustomGifBlob,
    saveCustomGifUrl,
    clearCustomGif,
    curatedGifs: CURATED_GIFS
  };
}
