import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { convertUnitToSymbol, unixToShortDate } from '../../util'

type Day = {
    date: number,
    icon: string,
    temp: number
}
type ForecastProps = {
    units: string,
    forecast: Array<Day>
}
const Forecast = ({ forecast, units }: ForecastProps) => {
    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom>
                Week Forecast
            </Typography>
            <Box display="flex" >
                {forecast.map(({ date, icon, temp }, index) => (
                    <Box border={1} padding={"2rem"} key={index}>
                        <Typography variant="h5" gutterBottom>
                            {unixToShortDate(date)}
                        </Typography>
                        {icon && <img src={`${process.env.REACT_APP_WEATHER_URL}/img/wn/${icon}@2x.png`} alt="Weather Icon" />}
                        <Typography variant="h5" gutterBottom>
                            {temp} {convertUnitToSymbol(units, 'temp')}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
export default Forecast