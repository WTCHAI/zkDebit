// src/hooks/useSsr.ts
import * as React from "react";
function subscribe() {
  return () => {
  };
}
function getSnapshot() {
  return false;
}
function getServerSnapshot() {
  return true;
}
function useSsr() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
export {
  useSsr as default
};
//# sourceMappingURL=useSsr.js.map