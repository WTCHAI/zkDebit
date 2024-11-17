"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProviderNextPages = AppProviderNextPages;
var React = _interopRequireWildcard(require("react"));
var _collections = require("@toolpad/utils/collections");
var _router = require("next/router");
var _AppProvider = require("../AppProvider");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @ignore - internal component.
 */
function AppProviderNextPages(props) {
  const {
    push,
    replace,
    asPath,
    query
  } = (0, _router.useRouter)();
  const search = React.useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([key, value]) => {
      (0, _collections.asArray)(value ?? []).forEach(v => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppProvider.AppProvider, {
    router: routerImpl,
    ...props
  });
}