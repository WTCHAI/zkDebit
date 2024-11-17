'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import warnOnce from '@toolpad/utils/warnOnce';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useSlotProps from '@mui/utils/useSlotProps';
import { styled } from '@mui/material';
import { Link as ToolpadLink } from "../shared/Link.js";
import { PageContainerToolbar } from "./PageContainerToolbar.js";
import { getItemTitle } from "../shared/navigation.js";
import { useActivePage } from "../useActivePage/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PageContentHeader = styled('div')(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: theme.spacing(2)
}));

// TODO: Remove in the next major version
/**
 * @deprecated Use `Breadcrumb` instead.
 */

/**
 * A container component to provide a title and breadcrumbs for your pages.
 *
 * Demos:
 *
 * - [Page Container](https://mui.com/toolpad/core/react-page-container/)
 *
 * API:
 *
 * - [PageContainer API](https://mui.com/toolpad/core/api/page-container)
 */
function PageContainer(props) {
  const {
    children,
    slots,
    slotProps,
    breadcrumbs,
    breadCrumbs,
    ...rest
  } = props;
  if (process.env.NODE_ENV !== 'production' && breadCrumbs) {
    warnOnce('The PageContainer `breadCrumbs` prop is deprecated. Use `breadcrumbs` instead.');
  }
  const activePage = useActivePage();

  // TODO: Remove `props.breadCrumbs` in the next major version
  const resolvedBreadcrumbs = breadcrumbs ?? breadCrumbs ?? activePage?.breadcrumbs ?? [];
  const title = props.title ?? activePage?.title ?? '';
  const ToolbarComponent = props?.slots?.toolbar ?? PageContainerToolbar;
  const toolbarSlotProps = useSlotProps({
    elementType: ToolbarComponent,
    ownerState: props,
    externalSlotProps: props?.slotProps?.toolbar,
    additionalProps: {}
  });
  return /*#__PURE__*/_jsx(Container, {
    ...rest,
    children: /*#__PURE__*/_jsxs(Stack, {
      sx: {
        my: 2
      },
      spacing: 2,
      children: [/*#__PURE__*/_jsxs(Stack, {
        children: [/*#__PURE__*/_jsx(Breadcrumbs, {
          "aria-label": "breadcrumb",
          children: resolvedBreadcrumbs ? resolvedBreadcrumbs.map((item, index) => {
            return index < resolvedBreadcrumbs.length - 1 ? /*#__PURE__*/_jsx(Link, {
              component: ToolpadLink,
              underline: "hover",
              color: "inherit",
              href: item.path,
              children: getItemTitle(item)
            }, item.path) : /*#__PURE__*/_jsx(Typography, {
              color: "text.primary",
              children: getItemTitle(item)
            }, item.path);
          }) : null
        }), /*#__PURE__*/_jsxs(PageContentHeader, {
          children: [title ? /*#__PURE__*/_jsx(Typography, {
            variant: "h4",
            children: title
          }) : null, /*#__PURE__*/_jsx(ToolbarComponent, {
            ...toolbarSlotProps
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        children: children
      })]
    })
  });
}
process.env.NODE_ENV !== "production" ? PageContainer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The breadcrumbs of the page. Leave blank to use the active page breadcrumbs.
   */
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  /**
   * @deprecated Use `breadcrumbs` instead.
   */
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    toolbar: PropTypes.shape({
      children: PropTypes.node
    }).isRequired
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    toolbar: PropTypes.elementType
  }),
  /**
   * The title of the page. Leave blank to use the active page title.
   */
  title: PropTypes.string
} : void 0;
export { PageContainer };