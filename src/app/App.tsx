import React, { useState, useEffect } from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import WeatherWidget from './weatherWidget/'

const App = () => {
  // initialising state
  const [currentWeather, setCurrentWeather] = useState({})
  const [forecast, setForecast] = useState(Array)
  const [units, setUnits] = useState('metric')
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })

  // will filter and return a map of only the needed fields from API
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

  // will filter and return a map of only the needed fields from API
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

  // sets parameters, and makes API call to fetch current weather data, and stores to state
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

  // sets parameters, and makes API call to fetch forecast weather data, and stores to state
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

  // this will run when webpage is first loaded
  useEffect(() => {
    // if user accepts to use location, it retrieves the browser's coordinates, and stores it to state
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    });
  }, []);

  // when the units or location state values are modified, it will trigger this function to run
  useEffect(() => {
    if (location.lon && location.lat) {
      // runs API calls to fetch current weather and forecast data
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
        Developed by Jihad Hammoudi
      </Box>
    </Container>
  );
}

export default App