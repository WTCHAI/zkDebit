import * as React from 'react';
import { asArray } from '@toolpad/utils/collections';
import { useRouter } from 'next/router';
import { AppProvider } from "../AppProvider/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @ignore - internal component.
 */
export function AppProviderNextPages(props) {
  const {
    push,
    replace,
    asPath,
    query
  } = useRouter();
  const search = React.useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([key, value]) => {
      asArray(value ?? []).forEach(v => {
        params.append(key, v);
      });
    });
    return params.toString();
  }, [query]);

  // Stable search params object
  const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);
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
    pathname: asPath,
    searchParams,
    navigate
  }), [asPath, navigate, searchParams]);
  return /*#__PURE__*/_jsx(AppProvider, {
    router: routerImpl,
    ...props
  });
}