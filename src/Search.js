import React, { useCallback, useRef } from 'react';
import { debounce } from 'lodash';

const Search = ({ setCity }) => {
  const debouncedSetCityRef = useRef(
    debounce((searchInput) => {
      setCity(searchInput);
    }, 1000) // Debounce delay of 1000ms
  );

  // Update the ref's current value if `setCity` changes
  useCallback(() => {
    debouncedSetCityRef.current = debounce((searchInput) => {
      setCity(searchInput);
    }, 1000);
  }, [setCity]);

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    debouncedSetCityRef.current(searchInput);
  };

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
        onChange={handleSearchChange}
      />
      <input type="submit" value="Search" className="search-form-button" />
    </form>
  );
};

export default Search;
