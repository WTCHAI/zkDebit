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

// src/comparators.ts
var comparators_exports = {};
__export(comparators_exports, {
  alphabeticComparator: () => alphabeticComparator,
  createPropComparator: () => createPropComparator,
  defaultComparator: () => defaultComparator
});
module.exports = __toCommonJS(comparators_exports);
function defaultComparator(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function alphabeticComparator(a, b) {
  const { compare } = new Intl.Collator();
  return compare(a, b);
}
function createPropComparator(propName, comparator = defaultComparator) {
  return (a, b) => comparator(a[propName], b[propName]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alphabeticComparator,
  createPropComparator,
  defaultComparator
});
//# sourceMappingURL=comparators.cjs.map