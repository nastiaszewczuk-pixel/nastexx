import { useState, useEffect, useCallback } from 'react';

const DB_NAME = 'AnastasiyaProfilePhotoDB';
const STORE_NAME = 'profile_photos';
const KEY = 'active_profile_photo';

// Helper to synchronously read saved photo on initial mount so reload never flashes default/AI image
function getInitialPhoto(): string {
  try {
    const savedDataUrl = localStorage.getItem('anastasiya_portfolio_photo_data');
    if (savedDataUrl && (savedDataUrl.startsWith('data:image') || savedDataUrl.startsWith('http') || savedDataUrl.startsWith('blob:'))) {
      return savedDataUrl;
    }
    const savedLegacy = localStorage.getItem('anastasiya_portfolio_photo');
    if (savedLegacy && (savedLegacy.startsWith('data:image') || savedLegacy.startsWith('blob:') || savedLegacy.startsWith('http'))) {
      return savedLegacy;
    }
  } catch {
    // Storage access error
  }
  return '';
}

export function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(getInitialPhoto);

  const loadSavedPhoto = useCallback(async () => {
    // 1. Try fast localStorage first (in case it changed or was written in another tab)
    try {
      const savedDataUrl = localStorage.getItem('anastasiya_portfolio_photo_data');
      if (savedDataUrl && savedDataUrl.startsWith('data:image')) {
        setPhotoUrl(savedDataUrl);
        return;
      }
      const savedLegacy = localStorage.getItem('anastasiya_portfolio_photo');
      if (savedLegacy && (savedLegacy.startsWith('data:image') || savedLegacy.startsWith('blob:') || savedLegacy.startsWith('http'))) {
        setPhotoUrl(savedLegacy);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Load blob/data from IndexedDB for high-res quota-free storage
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
          if (getReq.result) {
            if (getReq.result.dataUrl) {
              setPhotoUrl(getReq.result.dataUrl);
              try {
                localStorage.setItem('anastasiya_portfolio_photo_data', getReq.result.dataUrl);
              } catch {}
            } else if (getReq.result.blob) {
              const url = URL.createObjectURL(getReq.result.blob);
              setPhotoUrl(url);
            }
          }
        };
      };
    } catch {
      // Fallback gracefully
    }
  }, []);

  useEffect(() => {
    loadSavedPhoto();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.url) {
        setPhotoUrl(customEvent.detail.url);
      }
    };

    window.addEventListener('portfolio_photo_change', handleSync);
    return () => {
      window.removeEventListener('portfolio_photo_change', handleSync);
    };
  }, [loadSavedPhoto]);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    // Check if it's an image (or common extension)
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg|avif|heic)$/i.test(file.name);
    if (!isImage) return;

    // Use FileReader for persistent DataURL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoUrl(dataUrl);

        // Broadcast to any other listeners immediately
        window.dispatchEvent(new CustomEvent('portfolio_photo_change', { detail: { url: dataUrl } }));

        // Store to localStorage for synchronous instant load on page reload
        try {
          localStorage.setItem('anastasiya_portfolio_photo_data', dataUrl);
        } catch {
          // Quota exceeded, ignore
        }

        // Always store to IndexedDB for reliable quota-free storage
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
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put({ 
              dataUrl, 
              blob: file, 
              name: file.name, 
              updatedAt: Date.now() 
            }, KEY);
          };
        } catch {
          // Ignore
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const resetPhoto = () => {
    setPhotoUrl('');
    window.dispatchEvent(new CustomEvent('portfolio_photo_change', { detail: { url: '' } }));

    try {
      localStorage.removeItem('anastasiya_portfolio_photo_data');
      localStorage.removeItem('anastasiya_portfolio_photo');
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

  return {
    photoUrl,
    handleFileUpload,
    resetPhoto,
  };
}

