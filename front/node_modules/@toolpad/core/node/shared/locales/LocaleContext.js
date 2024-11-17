"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocaleContext = void 0;
exports.LocaleProvider = LocaleProvider;
exports.useLocaleText = useLocaleText;
var React = _interopRequireWildcard(require("react"));
var _en = _interopRequireDefault(require("./en"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LocaleContext = exports.LocaleContext = /*#__PURE__*/React.createContext(_en.default);
/**
 * @ignore - internal component.
 */
function LocaleProvider({
  localeText,
  children
}) {
  const mergedLocaleText = React.useMemo(() => ({
    ..._en.default,
    ...localeText
  }), [localeText]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(LocaleContext.Provider, {
    value: mergedLocaleText,
    children: children
  });
}

/**
 * @ignore - internal hook.
 */

function useLocaleText() {
  return React.useContext(LocaleContext);
}