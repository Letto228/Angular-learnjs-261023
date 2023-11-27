export function getCurrency(price: number | undefined): string {
    return `${price || '-'} $`;
}
