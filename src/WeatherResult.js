import React from "react";

const WeatherResult = ({
  city = "Johannesburg", // Default value for city
  temperature,
  description,
  humidity,
  windSpeed,
  iconUrl,
}) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      {iconUrl && <img src={iconUrl} alt={description} />}
    </div>
  );
};

export default WeatherResult;
