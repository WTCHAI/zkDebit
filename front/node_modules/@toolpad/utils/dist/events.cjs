"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/events.ts
var events_exports = {};
__export(events_exports, {
  Emitter: () => Emitter
});
module.exports = __toCommonJS(events_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Emitter
});
//# sourceMappingURL=events.cjs.map