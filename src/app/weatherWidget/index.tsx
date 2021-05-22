import React from 'react';

import CurrentWeather from './current/'
import Forecast from './forecast/'
import Search from './search/'

type WeatherWidgetProps = {
    forecast: any,
    current: any,
    units: string,
    setUnits(units: string): void
    setLocation(location: {}): void
}
const WeatherWidget = ({ forecast, current, units, setUnits, setLocation }: WeatherWidgetProps) => {
    return (
        <div>
            <Search setLocation={setLocation} units={units} setUnits={setUnits} />
            <CurrentWeather current={current} units={units} />
            <Forecast forecast={forecast} units={units} />
        </div>
    );
}

export default WeatherWidget