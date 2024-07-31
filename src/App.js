import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Search from './Search';
import WeatherResult from './WeatherResult';
import Footer from './Footer';
import './styles.css';
import './WeatherResult.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Johannesburg');
  const [units, setUnits] = useState('metric');

  axiosRetry(axios, { 
    retries: 3,
    retryDelay: (retryCount) => {
      return retryCount * 1000; // time interval between retries
    },
    retryCondition: (error) => {
      // retry only if the error status is 429 (Too Many Requests)
      return error.response && error.response.status === 429;
    }
  });

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const apiKey = '41at4c04f5a3b46cad70ddb313o279b2';
        const currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
        const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

        const [currentWeatherResponse, forecastResponse] = await Promise.all([
          axios.get(currentWeatherUrl),
          axios.get(forecastUrl),
        ]);
      
        setWeatherData({
          ...currentWeatherResponse.data,
          forecast: forecastResponse.data.daily,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(city);
  }, [city, units]);

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="weather-app">
      <header>
        <Search setCity={setCity} />
        <div className="btn-container">
          <label className="switch btn-color-mode-switch">
            <input
              type="checkbox"
              id="unit-toggle"
              checked={units === 'imperial'}
              onChange={toggleUnits}
            />
            <label className="btn-color-mode-switch-inner" data-off="°C" data-on="°F" htmlFor="unit-toggle"></label>
          </label>
        </div>
      </header>
      <main>
        {weatherData && <WeatherResult weatherData={weatherData} units={units} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;