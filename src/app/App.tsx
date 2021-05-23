import React, { useState, useEffect } from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import WeatherWidget from './weatherWidget/'

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({})
  const [forecast, setForecast] = useState(Array)
  const [units, setUnits] = useState('metric')
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })

  const filterCurrentWeather = (data: any) => {
    const filteredMap = {
      location: data.name,
      country: data.sys.country,
      date: data.dt,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed.toFixed(1),
      temperature: data.main.temp.toFixed(1),
      description: data.weather[0].description,
      feelsLike: data.main.feels_like.toFixed(1)
    }
    return filteredMap
  }

  const filterForecast = (data: any) => {
    return data.map((day: any) => {
      return {
        date: day.dt,
        humidity: day.humidity,
        icon: day.weather[0].icon,
        precipitation: day.rain,
        temp: {
          min: day.temp.min.toFixed(1),
          max: day.temp.max.toFixed(1)
        },
        description: day.weather[0].main
      }
    })
  }

  const fetchCurrentWeather = () => {
    const params = {
      lat: location.lat,
      lon: location.lon,
      units: units,
      appid: process.env.REACT_APP_WEATHER_API
    }

    axios
      .get(`${process.env.REACT_APP_WEATHER_API_URL}/weather/?`, {
        params
      })
      .then(res => {
        setCurrentWeather(filterCurrentWeather(res.data))
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchForecast = () => {
    const params = {
      lat: location.lat,
      lon: location.lon,
      units: units,
      appid: process.env.REACT_APP_WEATHER_API,
      exclude: 'hourly,minutely,timezone_offset'
    }

    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?`, {
        params
      })
      .then(res => {
        setForecast(filterForecast(res.data.daily))
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    });
  }, []);

  useEffect(() => {
    if (location.lon && location.lat) {
      fetchCurrentWeather()
      fetchForecast()
    }
    // eslint-disable-next-line
  }, [units, location]);

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" paddingTop="5rem" paddingBottom="5rem">
        <WeatherWidget
          forecast={forecast}
          current={currentWeather}
          units={units}
          setUnits={setUnits}
          setLocation={setLocation}
        />
      </Box>
    </Container>
  );
}

export default App