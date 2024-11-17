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

// src/collections.ts
var collections_exports = {};
__export(collections_exports, {
  asArray: () => asArray,
  equalProperties: () => equalProperties,
  filterKeys: () => filterKeys,
  filterValues: () => filterValues,
  hasOwnProperty: () => hasOwnProperty,
  mapKeys: () => mapKeys,
  mapProperties: () => mapProperties,
  mapValues: () => mapValues
});
module.exports = __toCommonJS(collections_exports);
function asArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
function hasOwnProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}
function mapProperties(obj, mapper) {
  return Object.fromEntries(
    Object.entries(obj).flatMap((entry) => {
      const mapped = mapper(entry);
      return mapped ? [mapped] : [];
    })
  );
}
function mapKeys(obj, mapper) {
  return mapProperties(obj, ([key, value]) => [mapper(key), value]);
}
function mapValues(obj, mapper) {
  return mapProperties(obj, ([key, value]) => [key, mapper(value, key)]);
}
function filterValues(obj, filter) {
  return mapProperties(obj, ([key, value]) => filter(value) ? [key, value] : null);
}
function filterKeys(obj, filter) {
  return mapProperties(obj, ([key, value]) => filter(key) ? [key, value] : null);
}
function equalProperties(obj1, obj2, subset) {
  const keysToCheck = new Set(
    subset ?? [...Object.keys(obj1), ...Object.keys(obj2)]
  );
  return Array.from(keysToCheck).every((key) => Object.is(obj1[key], obj2[key]));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  asArray,
  equalProperties,
  filterKeys,
  filterValues,
  hasOwnProperty,
  mapKeys,
  mapProperties,
  mapValues
});
//# sourceMappingURL=collections.cjs.map