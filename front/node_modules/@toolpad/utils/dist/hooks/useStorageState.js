import {
  Emitter
} from "../chunk-WJUTEAU5.js";

// src/hooks/useStorageState.ts
import * as React from "react";
var emitter = new Emitter();
function subscribe(area, key, cb) {
  const storageHandler = (event) => {
    if (event.storageArea === area && event.key === key) {
      cb();
    }
  };
  window.addEventListener("storage", storageHandler);
  emitter.on(key, cb);
  return () => {
    window.removeEventListener("storage", storageHandler);
    emitter.off(key, cb);
  };
}
function getSnapshot(area, key) {
  return area.getItem(key);
}
function setValue(area, key, value) {
  if (typeof window !== "undefined") {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
    emitter.emit(key, null);
  }
}
function useStorageStateServer(kind, key, initializer = null) {
  const [initialValue] = React.useState(initializer);
  return [initialValue, () => {
  }];
}
function useStorageStateBrowser(kind, key, initializer = null) {
  const [initialValue] = React.useState(initializer);
  const area = kind === "session" ? window.sessionStorage : window.localStorage;
  const subscribeKey = React.useCallback((cb) => subscribe(area, key, cb), [area, key]);
  const getKeySnapshot = React.useCallback(
    () => getSnapshot(area, key) ?? initialValue,
    [area, initialValue, key]
  );
  const getKeyServerSnapshot = React.useCallback(() => initialValue, [initialValue]);
  const storedValue = React.useSyncExternalStore(
    subscribeKey,
    getKeySnapshot,
    getKeyServerSnapshot
  );
  const setStoredValue = React.useCallback(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setValue(area, key, valueToStore);
    },
    [area, key, storedValue]
  );
  return [storedValue, setStoredValue];
}
var useStorageState_default = typeof window === "undefined" ? useStorageStateServer : useStorageStateBrowser;
export {
  useStorageState_default as default
};
//# sourceMappingURL=useStorageState.js.map