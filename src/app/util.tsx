const convertUnitToSymbol = (str: string) => {
    const unitMap = {
        metric: `m/s`,
        imperial: `mph`
    } as any
    return unitMap[str]
}

const unixToFullDate = (unix: number) => {
    const options = { weekday: 'long', year: undefined, month: 'long', day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

const unixToShortDate = (unix: number) => {
    const options = { weekday: 'short', year: undefined, month: undefined, day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

export { convertUnitToSymbol, unixToFullDate, unixToShortDate }