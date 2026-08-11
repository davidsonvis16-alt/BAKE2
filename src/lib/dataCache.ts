type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

type LoadingState = {
  promise: Promise<unknown>;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();
const loadingStates = new Map<string, LoadingState>();

export type DataCacheOptions = {
  ttlMs?: number;
  forceRefresh?: boolean;
};

export function getCachedDataSync<T>(key: string, ttlMs = 5 * 60 * 1000): T | undefined {
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (!cached) return undefined;
  if (Date.now() - cached.timestamp > ttlMs) {
    memoryCache.delete(key);
    return undefined;
  }
  return cached.value;
}

export async function getCachedData<T>(key: string, fetcher: () => Promise<T>, options: DataCacheOptions = {}): Promise<T> {
  const { ttlMs = 5 * 60 * 1000, forceRefresh = false } = options;

  const now = Date.now();
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;

  if (!forceRefresh && cached && now - cached.timestamp < ttlMs) {
    return cached.value;
  }

  if (!forceRefresh && loadingStates.has(key)) {
    return loadingStates.get(key)!.promise as Promise<T>;
  }

  const promise = fetcher()
    .then((data) => {
      memoryCache.set(key, { value: data, timestamp: Date.now() });
      loadingStates.delete(key);
      return data;
    })
    .catch((err) => {
      loadingStates.delete(key);
      throw err;
    });

  loadingStates.set(key, { promise, timestamp: now });

  return promise;
}

export function setCachedData<T>(key: string, value: T): void {
  memoryCache.set(key, { value, timestamp: Date.now() });
}

export function invalidateCache(key?: string): void {
  if (key) {
    memoryCache.delete(key);
    loadingStates.delete(key);
  } else {
    memoryCache.clear();
    loadingStates.clear();
  }
}

export function isCacheStale(key: string, ttlMs = 5 * 60 * 1000): boolean {
  const cached = memoryCache.get(key);
  if (!cached) return true;
  return Date.now() - cached.timestamp > ttlMs;
}
