import { Provider } from '@angular/core';
import { provideLinkRenderer } from 'ngx-transloco-markup';

import { RouterLinkRenderer } from './router-link-renderer';

/**
 * Function that returns the provider which is needed to register the router link renderer to `ngx-transloco-markup`. You should add this
 * the providers array of a `NgModule` decorator.
 */
export function translocoMarkupRouterLinkRenderer(): Provider[] {
    return [ provideLinkRenderer(RouterLinkRenderer) ];
}
