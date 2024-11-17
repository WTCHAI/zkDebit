var _LogoutIcon;
import * as React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthenticationContext } from "../AppProvider/AppProvider.js";
import { useLocaleText } from "../shared/locales/LocaleContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
export
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
  const authentication = React.useContext(AuthenticationContext);
  const localeText = useLocaleText();
  return /*#__PURE__*/_jsx(Button, {
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
    startIcon: _LogoutIcon || (_LogoutIcon = /*#__PURE__*/_jsx(LogoutIcon, {})),
    ...props,
    children: localeText.signOutLabel
  });
}