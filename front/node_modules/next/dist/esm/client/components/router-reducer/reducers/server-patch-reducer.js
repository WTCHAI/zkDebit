import { createHrefFromUrl } from '../create-href-from-url';
import { applyRouterStatePatchToTree } from '../apply-router-state-patch-to-tree';
import { isNavigatingToNewRootLayout } from '../is-navigating-to-new-root-layout';
import { handleExternalUrl } from './navigate-reducer';
import { applyFlightData } from '../apply-flight-data';
import { handleMutable } from '../handle-mutable';
import { createEmptyCacheNode } from '../../app-router';
import { handleSegmentMismatch } from '../handle-segment-mismatch';
export function serverPatchReducer(state, action) {
    const { serverResponse: { flightData, canonicalUrl: canonicalUrlOverride } } = action;
    const mutable = {};
    mutable.preserveCustomHistoryState = false;
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === 'string') {
        return handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const normalizedFlightData of flightData){
        const { segmentPath: flightSegmentPath, tree: treePatch } = normalizedFlightData;
        const newTree = applyRouterStatePatchToTree(// TODO-APP: remove ''
        [
            '',
            ...flightSegmentPath
        ], currentTree, treePatch, state.canonicalUrl);
        if (newTree === null) {
            return handleSegmentMismatch(state, action, treePatch);
        }
        if (isNavigatingToNewRootLayout(currentTree, newTree)) {
            return handleExternalUrl(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = canonicalUrlOverride ? createHrefFromUrl(canonicalUrlOverride) : undefined;
        if (canonicalUrlOverrideHref) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        const cache = createEmptyCacheNode();
        applyFlightData(currentCache, cache, normalizedFlightData);
        mutable.patchedTree = newTree;
        mutable.cache = cache;
        currentCache = cache;
        currentTree = newTree;
    }
    return handleMutable(state, mutable);
}

//# sourceMappingURL=server-patch-reducer.js.map