export const toDateTime = (secs : number) => {
    const t = new Date(1970, 0, 1); // Epoch https://stackoverflow.com/a/4611809
    t.setSeconds(secs);
    return t;
}

export const secsToMonth = (secs : number) => {
    let monthShort = Intl.DateTimeFormat('en-US', {month : "short"}).format
    return monthShort(toDateTime(secs))

}