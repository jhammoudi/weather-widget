// converts units ("metric" or "imperial") to appropriate speed notations ("m/s" or "mph")
const convertUnitToSymbol = (str: string) => {
    const unitMap = {
        metric: `m/s`,
        imperial: `mph`
    } as any
    return unitMap[str]
}

// convert unix time to long format, displaying weekday, month, and day number
const unixToFullDate = (unix: number) => {
    const options = { weekday: 'long', year: undefined, month: 'long', day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

// converts unix time to short format, displaying only day number and shortened weekday
const unixToShortDate = (unix: number) => {
    const options = { weekday: 'short', year: undefined, month: undefined, day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

export { convertUnitToSymbol, unixToFullDate, unixToShortDate }