export const convertUTCtoLocalTime = (utcTime: number): string => {
    return new Date(utcTime).toISOString();
}