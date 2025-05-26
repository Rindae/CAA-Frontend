import { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    place: false,
    event: false,
    maxPrice: 500, 
  });

  const handleCheckboxChange = (key) => {
    const newFilters = {
      ...filters,
      [key]: !filters[key],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newFilters = {
      ...filters,
      maxPrice: Number(e.target.value),
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <i className="bi bi-funnel me-2"></i>
          Filters
        </h5>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="filterPlace"
            checked={filters.place}
            onChange={() => handleCheckboxChange("place")}
          />
          <label className="form-check-label" htmlFor="filterPlace">
            Place
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="filterEvent"
            checked={filters.event}
            onChange={() => handleCheckboxChange("event")}
          />
          <label className="form-check-label" htmlFor="filterEvent">
            Event
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="priceRange" className="form-label">
            Max Price: {filters.maxPrice} CZK
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="500"
            step="10"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            id="priceRange"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;