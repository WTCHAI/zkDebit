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

// src/react.tsx
var react_exports = {};
__export(react_exports, {
  createGlobalState: () => createGlobalState,
  createProvidedContext: () => createProvidedContext,
  default: () => getComponentDisplayName,
  interleave: () => interleave,
  useAssertedContext: () => useAssertedContext,
  useNonNullableContext: () => useNonNullableContext,
  useTraceUpdates: () => useTraceUpdates
});
module.exports = __toCommonJS(react_exports);
var React = __toESM(require("react"), 1);
var ReactIs = __toESM(require("react-is"), 1);
function interleave(items, separator) {
  const result = [];
  for (let i = 0; i < items.length; i += 1) {
    if (i > 0) {
      if (ReactIs.isElement(separator)) {
        result.push(React.cloneElement(separator, { key: `separator-${i}` }));
      } else {
        result.push(separator);
      }
    }
    const item = items[i];
    result.push(item);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, result);
}
function useNonNullableContext(context, name) {
  const maybeContext = React.useContext(context);
  if (maybeContext === null || maybeContext === void 0) {
    throw new Error(`context "${name}" was used without a Provider`);
  }
  return maybeContext;
}
function createProvidedContext(name) {
  const context = React.createContext(void 0);
  const useContext2 = () => useNonNullableContext(context, name);
  return [useContext2, context.Provider];
}
function useAssertedContext(context) {
  const value = React.useContext(context);
  if (value === void 0) {
    throw new Error("context was used without a Provider");
  }
  return value;
}
function useTraceUpdates(prefix, props) {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = {};
    for (const key of Object.keys(props)) {
      if (!Object.is(prev.current[key], props[key])) {
        changedProps[key] = props[key];
      }
    }
    if (Object.keys(changedProps).length > 0) {
      console.log(`${prefix} changed props:`, changedProps);
    }
    prev.current = props;
  });
}
function getComponentDisplayName(Component) {
  if (typeof Component === "string") {
    return Component || "Unknown";
  }
  return Component.displayName || Component.name;
}
function createGlobalState(initialState) {
  let state = initialState;
  const listeners = [];
  const subscribe = (cb) => {
    listeners.push(cb);
    return () => {
      const index = listeners.indexOf(cb);
      listeners.splice(index, 1);
    };
  };
  const getState = () => state;
  const setState = (newState) => {
    state = typeof newState === "function" ? newState(state) : newState;
    listeners.forEach((cb) => cb(state));
  };
  const useValue = () => React.useSyncExternalStore(subscribe, getState, getState);
  const useState = () => {
    const value = useValue();
    return [value, setState];
  };
  return {
    getState,
    setState,
    useValue,
    useState,
    subscribe
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGlobalState,
  createProvidedContext,
  interleave,
  useAssertedContext,
  useNonNullableContext,
  useTraceUpdates
});
//# sourceMappingURL=react.cjs.map