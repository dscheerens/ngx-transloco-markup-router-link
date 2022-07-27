import { NavigationExtras } from '@angular/router';

import { hasProperty } from './utils/has-property';

import type { Router } from '@angular/router';

import type { ArrayElement } from './utils/array-element.type';

/**
 * Model for storing a link that targets an Angular route within the active application.
 */
export interface RouterLink extends NavigationExtras {
    /** A string or sequence of navigation commands that defines the target route. */
    route: string | NavigationCommand[];

    /** Target window or frame in which the link should be opened. `undefined` means the current window/frame. */
    target?: string;
}

/** Type alias for a navigation command (which unfortunately is typed as `any` by Angular). */
export type NavigationCommand = ArrayElement<Parameters<Router['navigate']>[0]>;

/**
 * Type guard function to check whether the specified value is a `RouterLink`.
 *
 * @param   value Value which is to be checked.
 * @returns       `true` if the specified value is a `RouterLink`, `false` if not.
 */
export function isRouterLink(value: unknown): value is RouterLink {
    return (
        hasProperty(value, 'route') && (typeof value.route === 'string' || Array.isArray(value.route)) &&
        (!hasProperty(value, 'target') || (value.target === undefined || typeof value.target === 'string'))
    );
}
