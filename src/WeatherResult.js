import React from "react";

const WeatherResult = ({
  city,
  temperature,
  description,
  humidity,
  windSpeed,
  iconUrl,
}) => {
  if (!city) {
    return null; // If city is empty or null, return nothing (null)
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      {iconUrl && <img src={iconUrl} alt={description} />}{" "}
      {/* Display the weather icon */}
    </div>
  );
};

export default WeatherResult;
