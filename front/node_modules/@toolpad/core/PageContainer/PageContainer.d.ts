import * as React from 'react';
import { ContainerProps } from '@mui/material/Container';
import { PageContainerToolbarProps } from './PageContainerToolbar';
export interface PageContainerSlotProps {
    toolbar: PageContainerToolbarProps;
}
export interface PageContainerSlots {
    /**
     * The component that renders the actions toolbar.
     * @default Snackbar
     */
    toolbar: React.ElementType;
}
export interface Breadcrumb {
    /**
     * The title of the breadcrumb segment.
     */
    title: string;
    /**
     * The path the breadcrumb links to.
     */
    path: string;
}
/**
 * @deprecated Use `Breadcrumb` instead.
 */
export type BreadCrumb = Breadcrumb;
export interface PageContainerProps extends ContainerProps {
    children?: React.ReactNode;
    /**
     * The title of the page. Leave blank to use the active page title.
     */
    title?: string;
    /**
     * The breadcrumbs of the page. Leave blank to use the active page breadcrumbs.
     */
    breadcrumbs?: Breadcrumb[];
    /**
     * @deprecated Use `breadcrumbs` instead.
     */
    breadCrumbs?: Breadcrumb[];
    /**
     * The components used for each slot inside.
     */
    slots?: PageContainerSlots;
    /**
     * The props used for each slot inside.
     */
    slotProps?: PageContainerSlotProps;
}
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
declare function PageContainer(props: PageContainerProps): React.JSX.Element;
declare namespace PageContainer {
    var propTypes: any;
}
export { PageContainer };
