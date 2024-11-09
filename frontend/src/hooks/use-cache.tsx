import CacheManager from '@lib/cache-manager';

const useCache = (): CacheManager => {
  return CacheManager.getInstance();
};

export default useCache;
