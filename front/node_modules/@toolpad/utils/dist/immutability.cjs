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

// src/immutability.ts
var immutability_exports = {};
__export(immutability_exports, {
  insert: () => insert,
  omit: () => omit,
  remove: () => remove,
  take: () => take,
  update: () => update,
  updateArray: () => updateArray,
  updateOrCreate: () => updateOrCreate,
  without: () => without
});
module.exports = __toCommonJS(immutability_exports);
function update(dest, src) {
  let result;
  Object.entries(src).forEach(([key, value]) => {
    if (dest[key] !== value) {
      result = result || { ...dest };
      result[key] = value;
    }
  });
  return result || dest;
}
function updateOrCreate(dest, src) {
  return dest ? update(dest, src) : src;
}
function insert(array, value, index) {
  return [...array.slice(0, index), value, ...array.slice(index)];
}
function updateArray(array, value, index) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
function remove(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
function omit(obj, ...keys) {
  let result;
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!result) {
        result = { ...obj };
      }
      delete result[key];
    }
  });
  return result || obj;
}
function take(obj, ...keys) {
  const keySet = new Set(keys);
  let result;
  Object.keys(obj).forEach((key) => {
    if (!keySet.has(key)) {
      if (!result) {
        result = { ...obj };
      }
      delete result[key];
    }
  });
  return result || obj;
}
function without(array, value) {
  const result = [];
  let found = false;
  for (let i = 0; i < array.length; i += 1) {
    const elm = array[i];
    if (elm === value) {
      found = true;
    } else {
      result.push(elm);
    }
  }
  return found ? result : array;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  insert,
  omit,
  remove,
  take,
  update,
  updateArray,
  updateOrCreate,
  without
});
//# sourceMappingURL=immutability.cjs.map