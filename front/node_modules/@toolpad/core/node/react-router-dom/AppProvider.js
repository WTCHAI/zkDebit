"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProvider = AppProvider;
var React = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AppProvider = require("../AppProvider");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @ignore - internal component.
 */function AppProvider(props) {
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppProvider.AppProvider, {
    router: routerImpl,
    ...props
  });
}