import React from 'react';

const WeatherResult = ({ weatherData }) => {
  if (!weatherData) {
    console.log('No weather data available');
    return null; // Prevent rendering if there's no weather data
  }

  console.log('Weather Data:', weatherData);

  const { city, condition, temperature, time, wind, humidity, forecast } = weatherData;

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

  const formatDay = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    return days[date.getDay()];
  };

  return (
    <div>
      <div className="weather-app-data">
        <div>
          <h1 className="weather-app-city">{city}</h1>
          <p className="weather-app-details">
            <span>{formatDate(new Date(time * 1000))}</span>, {condition.description}
            <br />
            Humidity: <strong>{humidity}%</strong>, Wind: <strong>{wind.speed}km/h</strong>
          </p>
        </div>
        <div className="weather-app-temperature-container">
          <div>
            <img src={condition.icon_url} className="weather-app-icon" alt={condition.description} />
          </div>
          <div className="weather-app-temperature">{Math.round(temperature.current)}</div>
          <div className="weather-app-unit">°C</div>
        </div>
      </div>
      <div className="weather-forecast" id="forecast">
        {forecast && forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="weather-forecast-day">
            <div className="weather-forecast-date">{formatDay(day.time)}</div>
            <img src={day.condition.icon_url} className="weather-forecast-icon" alt="forecast icon" />
            <div className="weather-forecast-temperatures">
              <div className="weather-forecast-temperature">
                <strong>{Math.round(day.temperature.maximum)}º</strong>
              </div>
              <div className="weather-forecast-temperature">{Math.round(day.temperature.minimum)}º</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherResult;
