import * as React from 'react';
/**
 * @ignore - internal component.
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    history?: 'auto' | 'push' | 'replace';
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
