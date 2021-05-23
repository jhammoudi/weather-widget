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
        <Box my={5}>
            <Typography variant="h3" gutterBottom>
                <b>{location}, {country}</b>
            </Typography>
            <Typography variant="h5" gutterBottom color="secondary">
                {unixToFullDate(date)}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap">
                <Box display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap">
                    {icon && <img src={iconUrl} alt="Weather Icon" />}
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="h2" >
                            {temperature}&#176;
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {description && feelsLike && `${description[0].toUpperCase() +
                                description.slice(1)}. Feels like ${feelsLike}\u00b0.`}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" padding="2rem">
                    <Typography variant="h6" gutterBottom>
                        <b>Humidity:</b> {humidity}&#37;
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <b>Wind Speed:</b> {windSpeed} {convertUnitToSymbol(units)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default CurrentWeather