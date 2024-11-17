// src/warnOnce.ts
var history = /* @__PURE__ */ new Set();
function warnOnce(msg) {
  if (!history.has(msg)) {
    history.add(msg);
    console.warn(msg);
  }
}
export {
  warnOnce as default
};
//# sourceMappingURL=warnOnce.js.map