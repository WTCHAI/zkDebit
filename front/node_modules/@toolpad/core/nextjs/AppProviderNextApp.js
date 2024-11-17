import * as React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { AppProvider } from "../AppProvider/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @ignore - internal component.
 */
export function AppProviderNextApp(props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    push,
    replace
  } = useRouter();
  const navigate = React.useCallback((url, {
    history = 'auto'
  } = {}) => {
    if (history === 'auto' || history === 'push') {
      return push(String(url));
    }
    if (history === 'replace') {
      return replace(String(url));
    }
    throw new Error(`Invalid history option: ${history}`);
  }, [push, replace]);
  const routerImpl = React.useMemo(() => ({
    pathname,
    searchParams,
    navigate
  }), [pathname, navigate, searchParams]);
  return /*#__PURE__*/_jsx(AppProvider, {
    router: routerImpl,
    ...props
  });
}