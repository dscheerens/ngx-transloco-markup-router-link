/**
 * Checks whether the given value is an object that contains a property with the specified key.
 *
 * @param   subject Value which is to be checked.
 * @param   key     Name of the property which should be present in the given value.
 * @returns         `true` if the given value is an object containing the specified property, `false` if not.
 */
export function hasProperty<S, T extends string>(subject: S, key: T): subject is S & { [k in T]: unknown } {
    return typeof subject === 'object' && subject !== null && key in subject;
}
