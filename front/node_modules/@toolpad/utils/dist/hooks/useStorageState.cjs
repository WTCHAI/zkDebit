"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/useStorageState.ts
var useStorageState_exports = {};
__export(useStorageState_exports, {
  default: () => useStorageState_default
});
module.exports = __toCommonJS(useStorageState_exports);
var React = __toESM(require("react"), 1);

// src/events.ts
var Emitter = class {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map();
  }
  on(name, handler) {
    let eventHandlers = this.handlers.get(name);
    if (!eventHandlers) {
      eventHandlers = /* @__PURE__ */ new Set();
      this.handlers.set(name, eventHandlers);
    }
    eventHandlers.add(handler);
  }
  /**
   * Remove a listener from an event
   */
  off(name, handler) {
    const eventHandlers = this.handlers.get(name);
    if (eventHandlers) {
      eventHandlers.delete(handler);
      if (eventHandlers.size <= 0) {
        this.handlers.delete(name);
      }
    }
  }
  /**
   * Subscribe to an event and return an unsubscribe function.
   */
  subscribe(name, handler) {
    this.on(name, handler);
    return () => {
      this.off(name, handler);
    };
  }
  /**
   * Emit an event.
   */
  emit(name, event) {
    const eventHandlers = this.handlers.get(name);
    if (eventHandlers) {
      for (const eventHandler of eventHandlers) {
        eventHandler(event);
      }
    }
    const allHandlers = this.handlers.get("*");
    if (allHandlers) {
      for (const eventHandler of allHandlers) {
        eventHandler(name, event);
      }
    }
  }
};

// src/hooks/useStorageState.ts
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
//# sourceMappingURL=useStorageState.cjs.map