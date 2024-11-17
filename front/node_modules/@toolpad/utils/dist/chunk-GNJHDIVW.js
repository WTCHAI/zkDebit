// src/hooks/useBoolean.ts
import * as React from "react";
function useBoolean(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue((existing) => !existing), []);
  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  return { value, setValue, toggle, setTrue, setFalse };
}

export {
  useBoolean
};
//# sourceMappingURL=chunk-GNJHDIVW.js.map