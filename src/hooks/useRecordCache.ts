import { useCallback } from 'react';

const CACHE_PREFIX = 'record_cache_';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function useRecordCache() {
  const setCacheItem = useCallback(<T>(key: string, data: T) => {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
  }, []);

  const getCacheItem = useCallback(<T>(key: string): T | null => {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    if (Date.now() - cacheItem.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return cacheItem.data;
  }, []);

  const clearCache = useCallback((key?: string) => {
    if (key) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } else {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    }
  }, []);

  return { setCacheItem, getCacheItem, clearCache };
}