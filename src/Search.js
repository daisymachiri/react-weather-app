import React, { useState } from "react";

export default function Search({ onSearch, hasError }) {
  const [city, setCity] = useState("");

  const updateCity = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Type a city"
          value={city}
          onChange={updateCity}
          className={hasError ? "error-input" : ""}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
