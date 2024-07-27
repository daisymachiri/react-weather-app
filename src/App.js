import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherResult from './WeatherResult';
import Footer from './Footer';
import './styles.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Johannesburg');

  useEffect(() => {
    const searchCity = (city) => {
      const apiKey = 'b2a5adcct04b33178913oc335f405433';
      const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then((response) => {
        setWeatherData(response.data);
        getForecast(city);
      });
    };

    const getForecast = (city) => {
      const apiKey = 'b2a5adcct04b33178913oc335f405433';
      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then((response) => {
        setWeatherData((prevState) => ({
          ...prevState,
          forecast: response.data.daily,
        }));
      });
    };

    searchCity(city);
  }, [city]);

  return (
    <div className="weather-app">
      <header>
        <Search setCity={setCity} />
      </header>
      <main>
        {weatherData && <WeatherResult weatherData={weatherData} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
