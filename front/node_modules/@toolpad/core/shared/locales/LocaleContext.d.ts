import * as React from 'react';
export type LocaleContextType = {
    signInLabel?: string;
    signOutLabel?: string;
    iconButtonAriaLabel?: string;
};
export declare const LocaleContext: React.Context<LocaleContextType>;
export interface LocaleProviderProps {
    localeText?: Partial<LocaleContextType>;
    children: React.ReactNode;
}
/**
 * @ignore - internal component.
 */
export declare function LocaleProvider({ localeText, children }: LocaleProviderProps): React.JSX.Element;
/**
 * @ignore - internal hook.
 */
export declare function useLocaleText(): LocaleContextType;
