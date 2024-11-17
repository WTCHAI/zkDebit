// src/react.tsx
import * as React from "react";
import * as ReactIs from "react-is";
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
export {
  createGlobalState,
  createProvidedContext,
  getComponentDisplayName as default,
  interleave,
  useAssertedContext,
  useNonNullableContext,
  useTraceUpdates
};
//# sourceMappingURL=react.js.map