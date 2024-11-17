'use client';

import * as React from 'react';
import { useRouter } from 'next/compat/router';
import { AppProviderNextApp } from "./AppProviderNextApp.js";
import { AppProviderNextPages } from "./AppProviderNextPages.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @ignore - internal component.
 */
function AppProvider(props) {
  const router = useRouter();
  const AppProviderComponent = router ? AppProviderNextPages : AppProviderNextApp;
  return /*#__PURE__*/_jsx(AppProviderComponent, {
    ...props
  });
}
export { AppProvider };