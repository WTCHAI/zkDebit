import type { Breadcrumb } from '../PageContainer';
export interface ActivePage {
    title: string;
    path: string;
    /**
     * @deprecated Use `breadcrumbs` instead.
     */
    breadCrumbs: Breadcrumb[];
    breadcrumbs: Breadcrumb[];
}
export declare function useActivePage(): ActivePage | null;
