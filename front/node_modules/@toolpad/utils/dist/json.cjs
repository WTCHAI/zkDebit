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

// src/json.ts
var json_exports = {};
__export(json_exports, {
  getCircularReplacer: () => getCircularReplacer,
  replaceRecursive: () => replaceRecursive
});
module.exports = __toCommonJS(json_exports);
function getCircularReplacer() {
  const ancestors = [];
  return function replacer(key, value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return "[Circular]";
    }
    ancestors.push(value);
    return value;
  };
}
function replaceRecursiveImpl(obj, replacer) {
  if (Array.isArray(obj)) {
    return obj.map((item, i) => {
      const newItem = replacer.call(obj, i, item);
      return replaceRecursiveImpl(newItem, replacer);
    });
  }
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const newValue = replacer.call(obj, key, value);
        return [key, replaceRecursiveImpl(newValue, replacer)];
      })
    );
  }
  return obj;
}
function replaceRecursive(obj, replacer) {
  return replaceRecursiveImpl({ "": obj }, replacer)[""];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCircularReplacer,
  replaceRecursive
});
//# sourceMappingURL=json.cjs.map