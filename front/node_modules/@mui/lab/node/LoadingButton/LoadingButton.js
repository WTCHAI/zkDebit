"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _utils2 = require("@mui/material/utils");
var _base = require("@mui/base");
var _DefaultPropsProvider = require("@mui/material/DefaultPropsProvider");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _ButtonGroup = require("@mui/material/ButtonGroup");
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _resolveProps = _interopRequireDefault(require("@mui/utils/resolveProps"));
var _zeroStyled = require("../zero-styled");
var _loadingButtonClasses = _interopRequireWildcard(require("./loadingButtonClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading'],
    label: ['label'],
    startIcon: [loading && `startIconLoading${(0, _utils2.capitalize)(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${(0, _utils2.capitalize)(loadingPosition)}`],
    loadingIndicator: ['loadingIndicator', loading && `loadingIndicator${(0, _utils2.capitalize)(loadingPosition)}`]
  };
  const composedClasses = (0, _base.unstable_composeClasses)(slots, _loadingButtonClasses.getLoadingButtonUtilityClass, classes);
  return {
    ...classes,
    // forward the outlined, color, etc. classes to Button
    ...composedClasses
  };
};

// TODO use `import rootShouldForwardProp from '../styles/rootShouldForwardProp';` once move to core
const rootShouldForwardProp = prop => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
const LoadingButtonRoot = (0, _zeroStyled.styled)(_Button.default, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root, styles.startIconLoadingStart && {
      [`& .${_loadingButtonClasses.default.startIconLoadingStart}`]: styles.startIconLoadingStart
    }, styles.endIconLoadingEnd && {
      [`& .${_loadingButtonClasses.default.endIconLoadingEnd}`]: styles.endIconLoadingEnd
    }];
  }
})((0, _utils2.unstable_memoTheme)(({
  theme
}) => ({
  display: 'inline-flex',
  [`& .${_loadingButtonClasses.default.startIconLoadingStart}, & .${_loadingButtonClasses.default.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  },
  variants: [{
    props: {
      loadingPosition: 'center'
    },
    style: {
      transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
        duration: theme.transitions.duration.short
      }),
      [`&.${_loadingButtonClasses.default.loading}`]: {
        color: 'transparent'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.loadingPosition === 'start' && ownerState.fullWidth,
    style: {
      [`& .${_loadingButtonClasses.default.startIconLoadingStart}, & .${_loadingButtonClasses.default.endIconLoadingEnd}`]: {
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.short
        }),
        opacity: 0,
        marginRight: -8
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.loadingPosition === 'end' && ownerState.fullWidth,
    style: {
      [`& .${_loadingButtonClasses.default.startIconLoadingStart}, & .${_loadingButtonClasses.default.endIconLoadingEnd}`]: {
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.short
        }),
        opacity: 0,
        marginLeft: -8
      }
    }
  }]
})));
const LoadingButtonLoadingIndicator = (0, _zeroStyled.styled)('span', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.loadingIndicator, styles[`loadingIndicator${(0, _utils2.capitalize)(ownerState.loadingPosition)}`]];
  }
})((0, _utils2.unstable_memoTheme)(({
  theme
}) => ({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex',
  variants: [{
    props: {
      loadingPosition: 'start',
      size: 'small'
    },
    style: {
      left: 10
    }
  }, {
    props: ({
      loadingPosition,
      ownerState
    }) => loadingPosition === 'start' && ownerState.size !== 'small',
    style: {
      left: 14
    }
  }, {
    props: {
      variant: 'text',
      loadingPosition: 'start'
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: 'center'
    },
    style: {
      left: '50%',
      transform: 'translate(-50%)',
      color: (theme.vars || theme).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: 'end',
      size: 'small'
    },
    style: {
      right: 10
    }
  }, {
    props: ({
      loadingPosition,
      ownerState
    }) => loadingPosition === 'end' && ownerState.size !== 'small',
    style: {
      right: 14
    }
  }, {
    props: {
      variant: 'text',
      loadingPosition: 'end'
    },
    style: {
      right: 6
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.loadingPosition === 'start' && ownerState.fullWidth,
    style: {
      position: 'relative',
      left: -10
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.loadingPosition === 'end' && ownerState.fullWidth,
    style: {
      position: 'relative',
      right: -10
    }
  }]
})));
const LoadingButtonLabel = (0, _zeroStyled.styled)('span', {
  name: 'MuiLoadingButton',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    return [styles.label];
  }
})({
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
const LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(inProps, ref) {
  const contextProps = React.useContext(_ButtonGroup.ButtonGroupContext);
  const resolvedProps = (0, _resolveProps.default)(contextProps, inProps);
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: resolvedProps,
    name: 'MuiLoadingButton'
  });
  const {
    children,
    disabled = false,
    id: idProp,
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    variant = 'text',
    ...other
  } = props;
  const id = (0, _utils2.unstable_useId)(idProp);
  const loadingIndicator = loadingIndicatorProp ?? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
    "aria-labelledby": id,
    color: "inherit",
    size: 16
  });
  const ownerState = {
    ...props,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  const loadingButtonLoadingIndicator = loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LoadingButtonLoadingIndicator, {
    className: classes.loadingIndicator,
    ownerState: ownerState,
    children: loadingIndicator
  }) : null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(LoadingButtonRoot, {
    disabled: disabled || loading,
    id: id,
    ref: ref,
    ...other,
    variant: variant,
    classes: classes,
    ownerState: ownerState,
    children: [ownerState.loadingPosition === 'end' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LoadingButtonLabel, {
      className: classes.label,
      children: children
    }) : loadingButtonLoadingIndicator, ownerState.loadingPosition === 'end' ? loadingButtonLoadingIndicator : /*#__PURE__*/(0, _jsxRuntime.jsx)(LoadingButtonLabel, {
      className: classes.label,
      children: children
    })]
  });
});
process.env.NODE_ENV !== "production" ? LoadingButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * @ignore
   */
  id: _propTypes.default.string,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: _propTypes.default.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: _propTypes.default.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: (0, _utils.chainPropTypes)(_propTypes.default.oneOf(['start', 'end', 'center']), props => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(`MUI: The loadingPosition="start" should be used in combination with startIcon.`);
    }
    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(`MUI: The loadingPosition="end" should be used in combination with endIcon.`);
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['contained', 'outlined', 'text']), _propTypes.default.string])
} : void 0;
var _default = exports.default = LoadingButton;