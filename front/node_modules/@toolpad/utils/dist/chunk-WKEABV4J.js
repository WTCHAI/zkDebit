// src/hooks/usePageTitle.ts
import * as React from "react";
function usePageTitle(title) {
  React.useEffect(() => {
    const original = document.title;
    document.title = title;
    return () => {
      document.title = original;
    };
  }, [title]);
}

export {
  usePageTitle
};
//# sourceMappingURL=chunk-WKEABV4J.js.map