import * as React from 'react';
import Box from '@mui/material/Box';
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
* - [AccountPopoverFooter API](https://mui.com/toolpad/core/api/account-popover-footer)
*/
function AccountPopoverFooter(props) {
  const {
    children,
    ...rest
  } = props;
  return /*#__PURE__*/_jsx(Box, {
    ...rest,
    sx: {
      display: 'flex',
      flexDirection: 'row',
      p: 1,
      justifyContent: 'flex-end',
      ...rest.sx
    },
    children: children
  });
}