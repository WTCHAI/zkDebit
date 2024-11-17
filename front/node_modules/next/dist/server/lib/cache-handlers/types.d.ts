export interface CacheEntry {
    value: ReadableStream;
    tags: string[];
    stale: number;
    timestamp: number;
    expire: number;
    revalidate: number;
}
export interface CacheHandler {
    get(cacheKey: string, softTags: string[]): Promise<undefined | CacheEntry>;
    set(cacheKey: string, entry: Promise<CacheEntry>): Promise<void>;
    expireTags(...tags: string[]): Promise<void>;
    receiveExpiredTags(...tags: string[]): Promise<void>;
}
