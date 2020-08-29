import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory } from '@ngneat/spectator';

import { RouterLinkRenderer } from './router-link-renderer';
import { RouterLink } from './router-link.model';

describe('RouterLinkRenderer class', () => {

    const createService = createServiceFactory({
        service: RouterLinkRenderer,
        imports: [
            RouterTestingModule.withRoutes([])
        ],
        providers: [
            { provide: LocationStrategy, useClass: MockLocationStrategy }
        ]
    });

    describe('supports function', () => {
        it('returns `true` RouterLink values', () => {
            const { service } = createService();

            expect(service.supports({ route: 'ok' })).toBe(true);
            expect(service.supports({ route: 'with-target', target: 'outer-space' })).toBe(true);
            expect(service.supports({ route: 'targeting noting', target: undefined })).toBe(true);
            expect(service.supports({ route: ['foo', 'bar', 'baz'] })).toBe(true);
            expect(service.supports({ route: ['foo', 'bar', 'baz'], ignoredPropterty: true })).toBe(true);
        });

        it('returns `false` non-RouterLink values', () => {
            const { service } = createService();

            expect(service.supports(undefined)).toBe(false);
            expect(service.supports(null)).toBe(false);
            expect(service.supports(false)).toBe(false);
            expect(service.supports(0)).toBe(false);
            expect(service.supports('')).toBe(false);
            expect(service.supports([])).toBe(false);
            expect(service.supports({})).toBe(false);
            expect(service.supports({ route: undefined })).toBe(false);
            expect(service.supports({ route: true })).toBe(false);
            expect(service.supports({ route: 66 })).toBe(false);
            expect(service.supports({ route: 'not-ok', target: null })).toBe(false);
        });
    });

    describe('render function', () => {

        it('sets the anchor href to the serialized route', () => {
            function getRenderedRoutePath(link: RouterLink): string {
                return render(link).href.split(/http:\/\/localhost:\d+\//)[1];
            }

            expect(getRenderedRoutePath({ route: 'floatation-device' })).toBe('floatation-device');
            expect(getRenderedRoutePath({ route: ['foo', 'bar', 'baz'] })).toBe('foo/bar/baz');
            expect(getRenderedRoutePath({ route: ['a', { b: 'c', d: 'e'}, 'f'], queryParams: { g: 'h', i: 'j' } }))
                .toBe('a;b=c;d=e/f?g=h&i=j');
        });

        it('sets the anchor target if the link contains a target property', () => {
            expect(render({ route: 'scenic' }).target).toBe('');
            expect(render({ route: 'scenic', target: '_self' }).target).toBe('_self');
            expect(render({ route: 'scenic', target: '_blank' }).target).toBe('_blank');
        });

        it('sets a click handler that uses the router to navigate for normal clicks', () => {
            const { service, inject } = createService();

            const router = inject(Router);

            const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

            const link = { route: ['some', 'place', 'far', 'away'], queryParams: { with: 'a lot of sun!' } };

            const anchorElement = document.createElement('a');

            service.render(link, anchorElement);

            anchorElement.dispatchEvent(clickEvent());

            expect(navigateByUrlSpy).toHaveBeenCalled();
            expect(navigateByUrlSpy.calls.first().args[0].toString()).toBe('/some/place/far/away?with=a%20lot%20of%20sun!');
            expect(navigateByUrlSpy.calls.first().args[1]).toBe(link);
        });

        it('sets a click handler that uses the default browser navigation action for "open in new window/tab" clicks', () => {
            const { service, inject } = createService();

            const router = inject(Router);

            const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

            const link = { route: 'to-the-bat-cave' };

            const anchorElement = document.createElement('a');

            service.render(link, anchorElement);

            // Add an additional click listener that cancels the default browser navigation action (otherwise Karma breaks).
            anchorElement.addEventListener('click', (event) => event.preventDefault());

            anchorElement.dispatchEvent(clickEvent({ button: 1 }));
            anchorElement.dispatchEvent(clickEvent({ ctrlKey: true }));
            anchorElement.dispatchEvent(clickEvent({ metaKey: true }));
            anchorElement.dispatchEvent(clickEvent({ shiftKey: true }));

            expect(navigateByUrlSpy).not.toHaveBeenCalled();
        });

        it('sets a click handler that uses the default browser navigation action when the link targets a different window or frame', () => {
            const { service, inject } = createService();

            const router = inject(Router);

            const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

            {
                const anchorElement = document.createElement('a');

                service.render({ route: 'down-under', target: 'bottom' }, anchorElement);

                // Add an additional click listener that cancels the default browser navigation action (otherwise Karma breaks).
                anchorElement.addEventListener('click', (event) => event.preventDefault());

                anchorElement.dispatchEvent(clickEvent());

                expect(navigateByUrlSpy).not.toHaveBeenCalled();
            }

            {
                const anchorElement = document.createElement('a');

                service.render({ route: 'loopback', target: '_self' }, anchorElement);

                anchorElement.dispatchEvent(clickEvent());

                expect(navigateByUrlSpy).toHaveBeenCalled();
            }

        });

    });

    function render(link: RouterLink): HTMLAnchorElement {
        const { service } = createService();

        const anchorElement = document.createElement('a');

        service.render(link, anchorElement);

        return anchorElement;
    }

});

function clickEvent(properties: MouseEventInit = {}): MouseEvent {
    return new MouseEvent('click', { cancelable: true, ...properties });
}
