import { NavigationExtras } from '@angular/router';

import { hasProperty } from './utils/has-property';

export interface RouterLink extends NavigationExtras {
    route: string | NavigationCommand[];
    target?: string;
}

export type NavigationCommand = any;

export function isRouterLink(value: unknown): value is RouterLink {
    return (
        hasProperty(value, 'route') && (typeof value.route === 'string' || Array.isArray(value.route)) &&
        (!hasProperty(value, 'target') || (value.target === undefined || typeof value.target === 'string'))
    );
}
