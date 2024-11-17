// src/hooks/useLatest.ts
import * as React from "react";
function useLatest(value) {
  const [latest, setLatest] = React.useState(value);
  if (latest !== value && value !== null && value !== void 0) {
    setLatest(value);
  }
  return value ?? latest;
}
var useLatest_default = useLatest;
export {
  useLatest_default as default
};
//# sourceMappingURL=useLatest.js.map