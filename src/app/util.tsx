const convertUnitToSymbol = (str: string, type: string) => {
    const unitMap = {
        metric: {
            speed: `m/s`,
            temp: `\u00b0C`
        },
        imperial: {
            speed: `mph`,
            temp: `\u00b0F`
        }
    } as any
    return unitMap[str][type]
}

const unixToFullDate = (unix: number) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

const unixToShortDate = (unix: number) => {
    const options = { weekday: 'long', year: undefined, month: undefined, day: 'numeric' } as const;
    let dateTime = new Date(unix * 1000);
    return dateTime.toLocaleDateString(undefined, options)
}

export { convertUnitToSymbol, unixToFullDate, unixToShortDate }