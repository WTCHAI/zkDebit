"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cacheScopeAsyncLocalStorage: null,
    runWithCacheScope: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cacheScopeAsyncLocalStorage: function() {
        return _cachescopeinstance.cacheScopeAsyncLocalStorage;
    },
    runWithCacheScope: function() {
        return runWithCacheScope;
    }
});
const _cachescopeinstance = require("./cache-scope-instance");
function runWithCacheScope(store, fn) {
    return _cachescopeinstance.cacheScopeAsyncLocalStorage.run({
        cache: store.cache || new Map()
    }, fn);
}

//# sourceMappingURL=cache-scope.external.js.map