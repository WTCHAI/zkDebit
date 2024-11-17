"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialog = AlertDialog;
exports.ConfirmDialog = ConfirmDialog;
exports.PromptDialog = PromptDialog;
exports.useDialogs = useDialogs;
var _lab = require("@mui/lab");
var _material = require("@mui/material");
var _react = require("@toolpad/utils/react");
var _invariant = _interopRequireDefault(require("invariant"));
var React = _interopRequireWildcard(require("react"));
var _DialogsContext = require("./DialogsContext");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The props that are passed to a dialog component.
 */

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
function AlertDialog({
  open,
  payload,
  onClose
}) {
  const okButtonProps = useDialogLoadingButton(() => onClose());
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Dialog, {
    maxWidth: "xs",
    fullWidth: true,
    open: open,
    onClose: () => onClose(),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogTitle, {
      children: payload.title ?? 'Alert'
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogContent, {
      children: payload.msg
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogActions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lab.LoadingButton, {
        disabled: !open,
        ...okButtonProps,
        children: payload.okText ?? 'Ok'
      })
    })]
  });
}
function ConfirmDialog({
  open,
  payload,
  onClose
}) {
  const cancelButtonProps = useDialogLoadingButton(() => onClose(false));
  const okButtonProps = useDialogLoadingButton(() => onClose(true));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Dialog, {
    maxWidth: "xs",
    fullWidth: true,
    open: open,
    onClose: () => onClose(false),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogTitle, {
      children: payload.title ?? 'Confirm'
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogContent, {
      children: payload.msg
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.DialogActions, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lab.LoadingButton, {
        autoFocus: true,
        disabled: !open,
        ...cancelButtonProps,
        children: payload.cancelText ?? 'Cancel'
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lab.LoadingButton, {
        color: payload.severity,
        disabled: !open,
        ...okButtonProps,
        children: payload.okText ?? 'Ok'
      })]
    })]
  });
}
function PromptDialog({
  open,
  payload,
  onClose
}) {
  const [input, setInput] = React.useState('');
  const cancelButtonProps = useDialogLoadingButton(() => onClose(null));
  const [loading, setLoading] = React.useState(false);
  const name = 'input';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Dialog, {
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
          (0, _invariant.default)(typeof value === 'string', 'Value must come from a text input');
          await onClose(value);
        } finally {
          setLoading(false);
        }
      }
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.DialogTitle, {
      children: payload.title ?? 'Confirm'
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.DialogContent, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.DialogContentText, {
        children: [payload.msg, " "]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.DialogActions, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lab.LoadingButton, {
        disabled: !open,
        ...cancelButtonProps,
        children: payload.cancelText ?? 'Cancel'
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lab.LoadingButton, {
        disabled: !open,
        loading: loading,
        type: "submit",
        children: payload.okText ?? 'Ok'
      })]
    })]
  });
}
function useDialogs() {
  const {
    open,
    close
  } = (0, _react.useNonNullableContext)(_DialogsContext.DialogsContext);
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