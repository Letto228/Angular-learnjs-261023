// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(item: any): item is string {
    return typeof item === 'string';
}
