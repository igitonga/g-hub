export const truncateString = (str: string, maxLength = 100) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}