import { Provider } from '@angular/core';
import { LinkRenderer } from 'ngx-transloco-markup';

import { RouterLinkRenderer } from './router-link-renderer';

export function translocoMarkupRouterLinkRenderer(): Provider[] {
    return [
        { provide: LinkRenderer, useClass: RouterLinkRenderer, multi: true }
    ];
}
