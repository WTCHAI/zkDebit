import type { CacheScopeStore } from '../async-storage/cache-scope.external';
export declare class PrefetchCacheScopes {
    private cacheScopes;
    private evict;
    get(url: string): Map<string, any> | undefined;
    set(url: string, cache: CacheScopeStore['cache']): Map<string, {
        cache: CacheScopeStore["cache"];
        timestamp: number;
    }>;
    del(url: string): void;
}
