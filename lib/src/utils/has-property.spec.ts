import { hasProperty } from './has-property';

describe('hasProperty function', () => {
    it('returns `true` if an object contains the specified property', () => {
        expect(hasProperty({ someProperty: undefined }, 'someProperty')).toBe(true);
        expect(hasProperty({ foo: '', bar: 'baz' }, 'foo')).toBe(true);
        expect(hasProperty({ foo: '', bar: 'baz' }, 'bar')).toBe(true);
        expect(hasProperty([], 'length')).toBe(true);
    });

    it('returns `false` if the subject does not contain the specified property', () => {
        expect(hasProperty(undefined, 'value')).toBe(false);
        expect(hasProperty(null, 'value')).toBe(false);
        expect(hasProperty(false, 'value')).toBe(false);
        expect(hasProperty(0, 'number')).toBe(false);
        expect(hasProperty({}, 'something')).toBe(false);
        expect(hasProperty([], 'something')).toBe(false);
        expect(hasProperty({ foo: '', bar: 'baz' }, 'baz')).toBe(false);
    });
});
