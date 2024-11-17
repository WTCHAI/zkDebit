import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from '@mui/material';
import { useNonNullableContext } from '@toolpad/utils/react';
import invariant from 'invariant';
import * as React from 'react';
import { DialogsContext } from "./DialogsContext.js";

/**
 * The props that are passed to a dialog component.
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function useDialogLoadingButton(onClose) {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClose();
    } finally {
      setLoading(false);
    }
  };
  return {
    onClick: handleClick,
    loading
  };
}
export function AlertDialog({
  open,
  payload,
  onClose
}) {
  const okButtonProps = useDialogLoadingButton(() => onClose());
  return /*#__PURE__*/_jsxs(Dialog, {
    maxWidth: "xs",
    fullWidth: true,
    open: open,
    onClose: () => onClose(),
    children: [/*#__PURE__*/_jsx(DialogTitle, {
      children: payload.title ?? 'Alert'
    }), /*#__PURE__*/_jsx(DialogContent, {
      children: payload.msg
    }), /*#__PURE__*/_jsx(DialogActions, {
      children: /*#__PURE__*/_jsx(LoadingButton, {
        disabled: !open,
        ...okButtonProps,
        children: payload.okText ?? 'Ok'
      })
    })]
  });
}
export function ConfirmDialog({
  open,
  payload,
  onClose
}) {
  const cancelButtonProps = useDialogLoadingButton(() => onClose(false));
  const okButtonProps = useDialogLoadingButton(() => onClose(true));
  return /*#__PURE__*/_jsxs(Dialog, {
    maxWidth: "xs",
    fullWidth: true,
    open: open,
    onClose: () => onClose(false),
    children: [/*#__PURE__*/_jsx(DialogTitle, {
      children: payload.title ?? 'Confirm'
    }), /*#__PURE__*/_jsx(DialogContent, {
      children: payload.msg
    }), /*#__PURE__*/_jsxs(DialogActions, {
      children: [/*#__PURE__*/_jsx(LoadingButton, {
        autoFocus: true,
        disabled: !open,
        ...cancelButtonProps,
        children: payload.cancelText ?? 'Cancel'
      }), /*#__PURE__*/_jsx(LoadingButton, {
        color: payload.severity,
        disabled: !open,
        ...okButtonProps,
        children: payload.okText ?? 'Ok'
      })]
    })]
  });
}
export function PromptDialog({
  open,
  payload,
  onClose
}) {
  const [input, setInput] = React.useState('');
  const cancelButtonProps = useDialogLoadingButton(() => onClose(null));
  const [loading, setLoading] = React.useState(false);
  const name = 'input';
  return /*#__PURE__*/_jsxs(Dialog, {
    maxWidth: "xs",
    fullWidth: true,
    open: open,
    onClose: () => onClose(null),
    PaperProps: {
      component: 'form',
      onSubmit: async event => {
        event.preventDefault();
        try {
          setLoading(true);
          const formData = new FormData(event.currentTarget);
          const value = formData.get(name) ?? '';
          invariant(typeof value === 'string', 'Value must come from a text input');
          await onClose(value);
        } finally {
          setLoading(false);
        }
      }
    },
    children: [/*#__PURE__*/_jsx(DialogTitle, {
      children: payload.title ?? 'Confirm'
    }), /*#__PURE__*/_jsxs(DialogContent, {
      children: [/*#__PURE__*/_jsxs(DialogContentText, {
        children: [payload.msg, " "]
      }), /*#__PURE__*/_jsx(TextField, {
        autoFocus: true,
        required: true,
        margin: "dense",
        id: "name",
        name: name,
        type: "text",
        fullWidth: true,
        variant: "standard",
        value: input,
        onChange: event => setInput(event.target.value)
      })]
    }), /*#__PURE__*/_jsxs(DialogActions, {
      children: [/*#__PURE__*/_jsx(LoadingButton, {
        disabled: !open,
        ...cancelButtonProps,
        children: payload.cancelText ?? 'Cancel'
      }), /*#__PURE__*/_jsx(LoadingButton, {
        disabled: !open,
        loading: loading,
        type: "submit",
        children: payload.okText ?? 'Ok'
      })]
    })]
  });
}
export function useDialogs() {
  const {
    open,
    close
  } = useNonNullableContext(DialogsContext);
  const alert = React.useCallback(async (msg, {
    onClose,
    ...options
  } = {}) => open(AlertDialog, {
    ...options,
    msg
  }, {
    onClose
  }), [open]);
  const confirm = React.useCallback(async (msg, {
    onClose,
    ...options
  } = {}) => open(ConfirmDialog, {
    ...options,
    msg
  }, {
    onClose
  }), [open]);
  const prompt = React.useCallback(async (msg, {
    onClose,
    ...options
  } = {}) => open(PromptDialog, {
    ...options,
    msg
  }, {
    onClose
  }), [open]);
  return React.useMemo(() => ({
    alert,
    confirm,
    prompt,
    open,
    close
  }), [alert, close, confirm, open, prompt]);
}