export function getCurrency(price: number | undefined): string {
    // eslint-disable-next-line no-console
    // console.log('getCurrency calculated', price);

    return `${price || '-'} $`;
}
