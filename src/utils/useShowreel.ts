import { useState, useEffect } from 'react';

const DB_NAME = 'AnastasiyaShowreelDB';
const STORE_NAME = 'media_videos';

function createVideoHook(storageKey: string, defaultName: string) {
  return function useVideoInstance() {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [videoName, setVideoName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Initialize IndexedDB to load saved video
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
          };

          request.onsuccess = (e: any) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              if (active) setIsLoading(false);
              return;
            }
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const getReq = store.get(storageKey);

            getReq.onsuccess = () => {
              if (active && getReq.result) {
                const { blob, url: savedUrl, name } = getReq.result;
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  setVideoUrl(url);
                } else if (savedUrl) {
                  setVideoUrl(savedUrl);
                }
                setVideoName(name || defaultName);
              }
              if (active) setIsLoading(false);
            };

            getReq.onerror = () => {
              if (active) setIsLoading(false);
            };
          };

          request.onerror = () => {
            if (active) setIsLoading(false);
          };
        } catch {
          if (active) setIsLoading(false);
        }
      };

      initDb();

      return () => {
        active = false;
      };
    }, []);

    const saveVideoBlob = async (file: File | Blob, name: string = defaultName) => {
      try {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setVideoName(name);

        const request = indexedDB.open(DB_NAME, 2);
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
          store.put({ blob: file, name, updatedAt: Date.now() }, storageKey);
        };
      } catch (err) {
        console.error('Failed to save video to IndexedDB:', err);
      }
    };

    const saveVideoUrl = async (url: string, name: string = defaultName) => {
      try {
        setVideoUrl(url);
        setVideoName(name);

        const request = indexedDB.open(DB_NAME, 2);
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
          store.put({ url, name, updatedAt: Date.now() }, storageKey);
        };
      } catch (err) {
        console.error('Failed to save video URL to IndexedDB:', err);
      }
    };

    const clearVideo = () => {
      setVideoUrl('');
      setVideoName('');
      try {
        const request = indexedDB.open(DB_NAME, 2);
        request.onsuccess = (e: any) => {
          const db = e.target.result;
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.delete(storageKey);
        };
      } catch {
        // Ignore
      }
    };

    return {
      videoUrl,
      videoName,
      isLoading,
      saveVideoBlob,
      saveVideoUrl,
      clearVideo
    };
  };
}

// 1. Separate dedicated hook for "Showreel Modal" video
export const useShowreel = createVideoHook('official_showreel_video', 'Anastasiya_Showreel_2026.mp4');

// 2. Separate dedicated hook for "Video About Me" in About Me section
export const useAboutVideo = createVideoHook('about_me_video', 'About_Anastasiya_Reel.mp4');
