# Weather Widget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Weather Widget Walkthrough](./assets/weather-widget.gif)

## How to use
* When this web app is opened for the first time, your browser will request permissions to use your location. It is important to approve this, to allow it to use current location to fetch your local weather.
* Users can type a location in the provided search bar to search for a location. Based on the search term, only locations which match that search term, will be retrieved. After searching for a location, click your desired location to fetch its current and forecasted weather data.
* When searching for a small area location (i.e Barangaroo), it will instead display weather of the outer region or city that it belongs to (i.e Sydney).
* In the toggle buttons, below the search bar, users can toggle between viewing 'Metric' or 'Imperial' data.
* Users can view the selected location's current weather data, as well as 7-day forecasted data.
    - In the current weather section, it display the current temperature, humidity, wind speed, weather icon, and more.
    - In the forecast weather section, it display each day's max and min temperatures, including the weather icon.

## Creating Free OpenWeatherMap API key
Follow the below steps to create your OpenWeather API key
1. Navigate to [OpenWeatherMap](https://openweathermap.org/), and create Free account. Sign up page is found [here](https://home.openweathermap.org/users/sign_up). You will also need to confirm your email address before you are able to continue.
2. Once your email is confirmed, you will receive a Welcome email containing your API key. Make a note of this API key as you will need it later on. This API key can also be found in the [API keys](https://home.openweathermap.org/api_keys) page, while signed in.


## Creating environment variables
To set your environment variables with your Weather API credentials, you first need to create your `.env` file. This is done by renaming the existing `env.example` file to `.env`. In this file, populate the `REACT_APP_WEATHER_API` variable with your OpenWeatherMap API Key. The other variables have been populated already.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Author
Jihad Hammoudi - hammoudij@hotmail.com