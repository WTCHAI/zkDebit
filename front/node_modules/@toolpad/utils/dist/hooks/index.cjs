"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  useBoolean: () => useBoolean,
  usePageTitle: () => usePageTitle
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/useBoolean.ts
var React = __toESM(require("react"), 1);
function useBoolean(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue((existing) => !existing), []);
  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  return { value, setValue, toggle, setTrue, setFalse };
}

// src/hooks/usePageTitle.ts
var React2 = __toESM(require("react"), 1);
function usePageTitle(title) {
  React2.useEffect(() => {
    const original = document.title;
    document.title = title;
    return () => {
      document.title = original;
    };
  }, [title]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBoolean,
  usePageTitle
});
//# sourceMappingURL=index.cjs.map