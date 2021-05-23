import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { unixToShortDate } from '../../util'
import Grid from '@material-ui/core/Grid';

type Day = {
    date: number,
    icon: string,
    temp: { min: number, max: number }
}
type ForecastProps = {
    forecast: Array<Day>
}
const Forecast = ({ forecast }: ForecastProps) => {
    return (
        <Box my={6}>
            <Box display="flex" flexDirection="column" >
                {forecast.map(({ date, icon, temp }, index) => (
                    <Grid
                        key={index}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        container spacing={3}
                    >
                        <Grid item xs >
                            <Typography variant="h6" gutterBottom>
                                <b>{unixToShortDate(date)}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs >
                            {icon && <img src={`${process.env.REACT_APP_WEATHER_URL}/img/wn/${icon}@2x.png`} alt="Weather Icon" />}
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>
                                <b>{temp.max}&#176;</b> <span style={{ color: "#e33c02" }}>/</span> {temp.min}&#176;
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
}
export default Forecast