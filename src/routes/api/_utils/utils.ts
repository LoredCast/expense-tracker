export const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch https://stackoverflow.com/a/4611809
    t.setSeconds(secs);
    return t;
}