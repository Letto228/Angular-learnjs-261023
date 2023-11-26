export const splitArrayIntoChunks = <T>(value: T[], chunkSize: number): T[][] => {
    const result = [];

    while (value.length) {
        const chunk = value.splice(0, chunkSize);

        result.push(chunk);
    }

    return result;
};
