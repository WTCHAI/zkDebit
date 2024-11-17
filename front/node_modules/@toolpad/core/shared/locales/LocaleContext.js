'use client';

import * as React from 'react';
import DEFAULT_LOCALE_TEXT from "./en.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const LocaleContext = /*#__PURE__*/React.createContext(DEFAULT_LOCALE_TEXT);
/**
 * @ignore - internal component.
 */
export function LocaleProvider({
  localeText,
  children
}) {
  const mergedLocaleText = React.useMemo(() => ({
    ...DEFAULT_LOCALE_TEXT,
    ...localeText
  }), [localeText]);
  return /*#__PURE__*/_jsx(LocaleContext.Provider, {
    value: mergedLocaleText,
    children: children
  });
}

/**
 * @ignore - internal hook.
 */

export function useLocaleText() {
  return React.useContext(LocaleContext);
}