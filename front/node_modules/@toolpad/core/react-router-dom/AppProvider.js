'use client';

import * as React from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider as AppProviderComponent } from "../AppProvider/index.js";

/**
 * @ignore - internal component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
function AppProvider(props) {
  const {
    pathname
  } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigateImpl = React.useCallback((url, {
    history = 'auto'
  } = {}) => {
    if (history === 'auto' || history === 'push') {
      return navigate(url);
    }
    if (history === 'replace') {
      return navigate(url, {
        replace: true
      });
    }
    throw new Error(`Invalid history option: ${history}`);
  }, [navigate]);
  const routerImpl = React.useMemo(() => ({
    pathname,
    searchParams,
    navigate: navigateImpl
  }), [pathname, searchParams, navigateImpl]);
  return /*#__PURE__*/_jsx(AppProviderComponent, {
    router: routerImpl,
    ...props
  });
}
export { AppProvider };