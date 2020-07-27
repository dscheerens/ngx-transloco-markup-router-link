import { isRouterLink } from './router-link.model';

describe('isRouterLink function', () => {
    it('correctly identifies RouterLink values', () => {
        expect(isRouterLink({ route: 'ok' })).toBe(true);
        expect(isRouterLink({ route: 'with-target', target: 'outer-space' })).toBe(true);
        expect(isRouterLink({ route: 'targeting noting', target: undefined })).toBe(true);
        expect(isRouterLink({ route: ['foo', 'bar', 'baz'] })).toBe(true);
        expect(isRouterLink({ route: ['foo', 'bar', 'baz'], ignoredPropterty: true })).toBe(true);
    });

    it('correctly identifies non-RouterLink values', () => {
        expect(isRouterLink(undefined)).toBe(false);
        expect(isRouterLink(null)).toBe(false);
        expect(isRouterLink(false)).toBe(false);
        expect(isRouterLink(0)).toBe(false);
        expect(isRouterLink('')).toBe(false);
        expect(isRouterLink([])).toBe(false);
        expect(isRouterLink({})).toBe(false);
        expect(isRouterLink({ route: undefined })).toBe(false);
        expect(isRouterLink({ route: true })).toBe(false);
        expect(isRouterLink({ route: 66 })).toBe(false);
        expect(isRouterLink({ route: 'not-ok', target: null })).toBe(false);
    });
});
