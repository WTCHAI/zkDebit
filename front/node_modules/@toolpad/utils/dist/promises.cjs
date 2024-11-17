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

// src/promises.ts
var promises_exports = {};
__export(promises_exports, {
  resolveValues: () => resolveValues
});
module.exports = __toCommonJS(promises_exports);
async function resolveValues(obj) {
  const entries = Object.entries(obj).map(async ([key, value]) => [key, await value]);
  return Object.fromEntries(await Promise.all(entries));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveValues
});
//# sourceMappingURL=promises.cjs.map