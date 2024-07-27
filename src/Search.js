import React from 'react';

const Search = ({ setCity }) => {
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchInput = event.target.elements.city.value;
    setCity(searchInput);
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        type="search"
        placeholder="Enter a city.."
        required
        name="city"
        className="search-form-input"
      />
      <input type="submit" value="Search" className="search-form-button" />
    </form>
  );
};

export default Search;
