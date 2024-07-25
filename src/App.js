import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import Search from "./Search";
import WeatherResult from "./WeatherResult";
import Footer from './Footer';

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        setError("Please enter a city");
        setCity("");
        setWeatherData(null);
        setHasError(true);
        return;
      }

      const apiKey = "41at4c04f5a3b46cad70ddb313o279b2";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;

      console.log("Fetching weather data from:", url);

      const response = await axios.get(url);

      console.log("Response data:", response.data);

      if (
        response.data &&
        response.data.daily &&
        response.data.daily.length > 0
      ) {
        const daily = response.data.daily[0]; 
        setCity(query);
        setWeatherData({
          temperature: daily.temperature.day,
          description: daily.condition.description,
          humidity: daily.temperature.humidity,
          windSpeed: daily.wind.speed,
          iconUrl: daily.condition.icon_url, 
        });
        setError("");
        setHasError(false);
      } else {
        setError("Weather data not available");
        setCity("");
        setWeatherData(null);
        setHasError(true);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again later.");
      setCity("");
      setWeatherData(null);
      setHasError(true);
    }
  };

  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <Search onSearch={handleSearch} hasError={hasError} />
      {error && !city && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-container">
          <WeatherResult
            city={city}
            temperature={weatherData.temperature}
            description={weatherData.description}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            iconUrl={weatherData.iconUrl}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

