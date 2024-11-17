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

// src/hooks/useDebouncedHandler.ts
var useDebouncedHandler_exports = {};
__export(useDebouncedHandler_exports, {
  default: () => useDebouncedHandler
});
module.exports = __toCommonJS(useDebouncedHandler_exports);
var React = __toESM(require("react"), 1);
function defer(fn, params, delay) {
  const timeout = setTimeout(() => {
    fn.current(...params);
  }, delay);
  return { startTime: Date.now(), timeout, params };
}
function useDebouncedHandler(fn, delay) {
  const fnRef = React.useRef(fn);
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  const delayedInvocation = React.useRef(null);
  const clearCurrent = React.useCallback(() => {
    if (delayedInvocation.current) {
      clearTimeout(delayedInvocation.current.timeout);
      delayedInvocation.current = null;
    }
  }, []);
  React.useEffect(() => {
    if (!delayedInvocation.current) {
      return;
    }
    const { startTime, params } = delayedInvocation.current;
    const elapsed = Date.now() - startTime;
    const newDelay = Math.max(delay - elapsed, 0);
    clearCurrent();
    delayedInvocation.current = defer(fnRef, params, newDelay);
  }, [delay, clearCurrent]);
  return React.useCallback(
    (...params) => {
      clearCurrent();
      delayedInvocation.current = defer(fnRef, params, delay);
    },
    [delay, clearCurrent]
  );
}
//# sourceMappingURL=useDebouncedHandler.cjs.map