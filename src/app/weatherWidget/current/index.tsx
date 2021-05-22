import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { convertUnitToSymbol, unixToFullDate } from '../../util'

type CurrentWeatherProps = {
    units: string,
    current: any
}

const CurrentWeather = ({ current, units }: CurrentWeatherProps) => {
    const { location, country, date, humidity, icon, windSpeed, temperature, description, feelsLike } = current
    const iconUrl = `${process.env.REACT_APP_WEATHER_URL}/img/wn/${icon}@4x.png`
    return (
        <Box my={4}>
            <Typography variant="h2" gutterBottom>
                {location}, {country}
            </Typography>
            <Typography variant="h4" gutterBottom>
                {unixToFullDate(date)}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {description && feelsLike && `Feels like ${feelsLike} ${convertUnitToSymbol(units, 'temp')}. ${description[0].toUpperCase() +
                    description.slice(1)}`}
            </Typography>
            {icon && <img src={iconUrl} alt="Weather Icon" />}
            <Typography variant="h5" gutterBottom>
                {temperature} {convertUnitToSymbol(units, 'temp')}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Humidity: {humidity}&#37;
            </Typography>
            <Typography variant="h5" gutterBottom>
                Wind Speed: {windSpeed} {convertUnitToSymbol(units, 'speed')}
            </Typography>
        </Box>
    );
}

export default CurrentWeather