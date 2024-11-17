// src/hooks/useDebouncedHandler.ts
import * as React from "react";
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
export {
  useDebouncedHandler as default
};
//# sourceMappingURL=useDebouncedHandler.js.map