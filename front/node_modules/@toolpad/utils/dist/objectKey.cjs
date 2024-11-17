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

// src/objectKey.ts
var objectKey_exports = {};
__export(objectKey_exports, {
  getObjectKey: () => getObjectKey
});
module.exports = __toCommonJS(objectKey_exports);
var weakMap = /* @__PURE__ */ new WeakMap();
var nextId = 0;
function getNextId() {
  const id = `object-id::${nextId}`;
  nextId += 1;
  return id;
}
function getObjectKey(object) {
  let id = weakMap.get(object);
  if (!id) {
    id = getNextId();
    weakMap.set(object, id);
  }
  return id;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getObjectKey
});
//# sourceMappingURL=objectKey.cjs.map