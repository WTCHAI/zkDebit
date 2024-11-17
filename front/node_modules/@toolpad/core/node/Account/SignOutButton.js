"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignOutButton = SignOutButton;
var React = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Logout = _interopRequireDefault(require("@mui/icons-material/Logout"));
var _AppProvider = require("../AppProvider/AppProvider");
var _LocaleContext = require("../shared/locales/LocaleContext");
var _jsxRuntime = require("react/jsx-runtime");
var _LogoutIcon;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
*
* Demos:
*
* - [Account](https://mui.com/toolpad/core/react-account/)
*
* API:
*
* - [SignOutButton API](https://mui.com/toolpad/core/api/sign-out-button)
*/
function SignOutButton(props) {
  const authentication = React.useContext(_AppProvider.AuthenticationContext);
  const localeText = (0, _LocaleContext.useLocaleText)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    disabled: !authentication,
    variant: "outlined",
    size: "small",
    disableElevation: true,
    onClick: authentication?.signOut,
    sx: {
      textTransform: 'capitalize',
      fontWeight: 'normal',
      filter: 'opacity(0.9)',
      transition: 'filter 0.2s ease-in',
      '&:hover': {
        filter: 'opacity(1)'
      }
    },
    startIcon: _LogoutIcon || (_LogoutIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logout.default, {})),
    ...props,
    children: localeText.signOutLabel
  });
}