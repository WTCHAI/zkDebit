import type { FallbackRouteParams } from '../../server/request/fallback-params';
import type { Params } from '../request/params';
export declare enum DynamicState {
    /**
     * The dynamic access occurred during the RSC render phase.
     */
    DATA = 1,
    /**
     * The dynamic access occurred during the HTML shell render phase.
     */
    HTML = 2
}
/**
 * The postponed state for dynamic data.
 */
export type DynamicDataPostponedState = {
    /**
     * The type of dynamic state.
     */
    readonly type: DynamicState.DATA;
};
/**
 * The postponed state for dynamic HTML.
 */
export type DynamicHTMLPostponedState = {
    /**
     * The type of dynamic state.
     */
    readonly type: DynamicState.HTML;
    /**
     * The postponed data used by React.
     */
    readonly data: object;
};
export type PostponedState = DynamicDataPostponedState | DynamicHTMLPostponedState;
export declare function getDynamicHTMLPostponedState(data: object, fallbackRouteParams: FallbackRouteParams | null): string;
export declare function getDynamicDataPostponedState(): string;
export declare function parsePostponedState(state: string, params: Params | undefined): PostponedState;
export declare function getPostponedFromState(state: PostponedState): any;
