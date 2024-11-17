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

export {
  Emitter
};
//# sourceMappingURL=chunk-WJUTEAU5.js.map