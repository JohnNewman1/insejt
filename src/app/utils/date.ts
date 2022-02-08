export const convertUTCtoLocalTime = (utcTime: number): string => {
    return new Date(utcTime).toISOString();
}

export const hhmm = (utcTime: number): string => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
