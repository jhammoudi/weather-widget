import React from 'react';
import Divider from '@material-ui/core/Divider';

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
            {Object.keys(current).length > 0 && <CurrentWeather current={current} units={units} />}
            <Divider variant="middle" />
            {forecast.length > 0 && <Forecast forecast={forecast} />}
        </div>
    );
}

export default WeatherWidget