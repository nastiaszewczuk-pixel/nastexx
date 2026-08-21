import { useState, useEffect } from 'react';

const DB_NAME = 'AnastasiyaHeroBgDB';
const STORE_NAME = 'hero_media';
const KEY = 'active_hero_bg';

export function useHeroBackground() {
  const [bgUrl, setBgUrl] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [bgName, setBgName] = useState<string>('');

  useEffect(() => {
    let active = true;

    const initDb = async () => {
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
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const getReq = store.get(KEY);

          getReq.onsuccess = () => {
            if (active && getReq.result) {
              const { blob, name, isVid } = getReq.result;
              const url = URL.createObjectURL(blob);
              setBgUrl(url);
              setIsVideo(isVid ?? (name?.endsWith('.mp4') || name?.endsWith('.webm') || name?.endsWith('.mov')));
              setBgName(name || 'Custom Background');
            }
          };
        };
      } catch (err) {
        console.error('Failed to load hero background:', err);
      }
    };

    initDb();

    return () => {
      active = false;
    };
  }, []);

  const saveHeroMedia = (file: File | Blob, name: string = 'hero_media') => {
    try {
      const url = URL.createObjectURL(file);
      const isVid = file.type.startsWith('video/') || name.endsWith('.mp4') || name.endsWith('.webm') || name.endsWith('.mov');
      
      setBgUrl(url);
      setIsVideo(isVid);
      setBgName(name);

      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ blob: file, name, isVid, updatedAt: Date.now() }, KEY);
      };
    } catch (err) {
      console.error('Failed to save hero media to IndexedDB:', err);
    }
  };

  const resetHeroMedia = () => {
    setBgUrl('');
    setIsVideo(false);
    setBgName('');

    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(KEY);
      };
    } catch {
      // Ignore
    }
  };

  return {
    bgUrl,
    isVideo,
    bgName,
    saveHeroMedia,
    resetHeroMedia
  };
}
