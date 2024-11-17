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

// src/warnOnce.ts
var warnOnce_exports = {};
__export(warnOnce_exports, {
  default: () => warnOnce
});
module.exports = __toCommonJS(warnOnce_exports);
var history = /* @__PURE__ */ new Set();
function warnOnce(msg) {
  if (!history.has(msg)) {
    history.add(msg);
    console.warn(msg);
  }
}
//# sourceMappingURL=warnOnce.cjs.map