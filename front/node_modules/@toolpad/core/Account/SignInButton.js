import * as React from 'react';
import Button from '@mui/material/Button';
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
* - [SignInButton API](https://mui.com/toolpad/core/api/sign-in-button)
*/
function SignInButton(props) {
  const authentication = React.useContext(AuthenticationContext);
  const localeText = useLocaleText();
  return /*#__PURE__*/_jsx(Button, {
    disableElevation: true,
    variant: "contained",
    size: "small",
    onClick: authentication?.signIn,
    sx: {
      textTransform: 'capitalize',
      filter: 'opacity(0.9)',
      transition: 'filter 0.2s ease-in',
      '&:hover': {
        filter: 'opacity(1)'
      }
    },
    ...props,
    children: localeText?.signInLabel || 'Sign In'
  });
}