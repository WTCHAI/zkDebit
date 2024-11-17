export var DynamicState;
(function(DynamicState) {
    /**
   * The dynamic access occurred during the RSC render phase.
   */ DynamicState[DynamicState["DATA"] = 1] = "DATA";
    /**
   * The dynamic access occurred during the HTML shell render phase.
   */ DynamicState[DynamicState["HTML"] = 2] = "HTML";
})(DynamicState || (DynamicState = {}));
export function getDynamicHTMLPostponedState(data, fallbackRouteParams) {
    if (!fallbackRouteParams || fallbackRouteParams.size === 0) {
        return JSON.stringify(data);
    }
    const replacements = Array.from(fallbackRouteParams);
    const replacementsString = JSON.stringify(replacements);
    // Serialized as `<length><replacements><data>`
    return `${replacementsString.length}${replacementsString}${JSON.stringify(data)}`;
}
export function getDynamicDataPostponedState() {
    return 'null';
}
export function parsePostponedState(state, params) {
    try {
        if (state === 'null') {
            return {
                type: 1
            };
        }
        if (/^[0-9]/.test(state)) {
            var _state_match;
            const match = (_state_match = state.match(/^([0-9]*)/)) == null ? void 0 : _state_match[1];
            if (!match) {
                throw new Error(`Invariant: invalid postponed state ${state}`);
            }
            // This is the length of the replacements entries.
            const length = parseInt(match);
            const replacements = JSON.parse(state.slice(match.length, // We then go to the end of the string.
            match.length + length));
            let postponed = state.slice(match.length + length);
            for (const [key, searchValue] of replacements){
                const value = (params == null ? void 0 : params[key]) ?? '';
                const replaceValue = Array.isArray(value) ? value.join('/') : value;
                postponed = postponed.replaceAll(searchValue, replaceValue);
            }
            return {
                type: 2,
                data: JSON.parse(postponed)
            };
        }
        return {
            type: 2,
            data: JSON.parse(state)
        };
    } catch (err) {
        console.error('Failed to parse postponed state', err);
        return {
            type: 1
        };
    }
}
export function getPostponedFromState(state) {
    if (state.type === 1) {
        return null;
    }
    return state.data;
}

//# sourceMappingURL=postponed-state.js.map