import { cacheScopeAsyncLocalStorage } from './cache-scope-instance' with {
    'turbopack-transition': 'next-shared'
};
export { cacheScopeAsyncLocalStorage };
/**
 * For dynamic IO handling we want to have a scoped memory
 * cache which can live either the lifetime of a build worker,
 * the lifetime of a specific request, or from a prefetch request
 * to the request for non-prefetch version of a page (with
 * drop-off after so long to prevent memory inflating)
 */ export function runWithCacheScope(store, fn) {
    return cacheScopeAsyncLocalStorage.run({
        cache: store.cache || new Map()
    }, fn);
}

//# sourceMappingURL=cache-scope.external.js.map