// src/hooks/useDebounced.ts
import * as React from "react";
function useDebounced(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(() => value);
  const timeoutIdRef = React.useRef(null);
  React.useEffect(
    () => () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    },
    []
  );
  React.useEffect(() => {
    timeoutIdRef.current = setTimeout(() => setDebouncedValue(() => value), delay);
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [value, delay]);
  return debouncedValue;
}
export {
  useDebounced as default
};
//# sourceMappingURL=useDebounced.js.map