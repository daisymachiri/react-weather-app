import React from 'react';

const WeatherResult = ({ weatherData, units }) => {
  if (!weatherData) {
    return null; // Prevent rendering if there's no weather data
  }

  const { city, condition, temperature, time, wind } = weatherData; // Removed forecast from destructuring

  // Access humidity from the temperature object
  const humidity = temperature.humidity;

  const formatDate = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
  };

  const unitSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <div>
      <div className="weather-app-data">
        <div>
          <h1 className="weather-app-city">{city}</h1>
          <p className="weather-app-details">
            <span>{formatDate(new Date(time * 1000))}</span>, {condition.description}
            <br />
            Humidity: <strong>{humidity}%</strong>, Wind: <strong>{wind.speed} {units === 'metric' ? 'km/h' : 'mph'}</strong>
          </p>
        </div>
        <div className="weather-app-temperature-container">
          <div>
            <img src={condition.icon_url} className="weather-app-icon" alt={condition.description} />
          </div>
          <div className="weather-app-temperature">{Math.round(temperature.current)}</div>
          <div className="weather-app-unit">{unitSymbol}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
