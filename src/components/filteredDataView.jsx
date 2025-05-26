import { useEffect, useState } from "react";
import { getPlaces } from "../api/place";
import { getEvents } from "../api/event";
import { Link } from "react-router-dom";
import './FilteredDataView.css';

const FilteredDataView = ({ filters, className = "" }) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const results = [];

      if (filters.place) {
        const places = await getPlaces();
        const filteredPlaces = places
          .filter((p) => p.price <= filters.maxPrice)
          .map((p) => ({ ...p, type: "place" }));
        results.push(...filteredPlaces);
      }

      if (filters.event) {
        const events = await getEvents();
        const filteredEvents = events
          .filter((e) => e.price <= filters.maxPrice)
          .map((e) => ({ ...e, type: "event" }));
        results.push(...filteredEvents);
      }

      setData(results);
    };

    fetchData();
  }, [filters]);

  const toggleDetails = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <ul className={className}>
      {data.map((item) => (
        <li key={item.id} onClick={() => toggleDetails(item.id)} className="clickable-item">
          <strong className="item-name">{item.name}</strong>
          <div>
            {item.type === "place" && (
              <p className="item-desc">{item.description}</p>
            )}
            {item.type === "event" && (
              <p className="item-address">
                {item.street}
                {item.number ? ` ${item.number},` : ","} {item.district}
              </p>
            )}
          </div>

          {selectedId === item.id && (
            <div className="extra-details">
              {item.type === "place" && (
                <>
                  <p>Price: {item.price} CZK</p>
                  <p>Average Rating: {item.avgRating ?? "N/A"}</p>
                  <Link
                    to={`/rate/${item.id}`}
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    Rate this Place
                  </Link>
                </>
              )}
              {item.type === "event" && (
                <>
                  <p>Price: {item.price}</p>
                  <p>Date: {item.date}</p>
                </>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FilteredDataView;