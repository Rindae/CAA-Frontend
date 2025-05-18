// src/pages/RatePlace.js
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const RatePlace = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    rating: 1,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:8000/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,    
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      setStatus("Rating submitted successfully!");
      setTimeout(() => navigate("/"), 2000); // go back to homepage after 2s
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Rate This Place</h2>
      <p className="text-muted">Place ID: {placeId}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Your Name</label>
          <input
            className="form-control"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating (1–5)</label>
          <select
            className="form-select"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Submit Rating</button>
      </form>

      {status && <p className="mt-3">{status}</p>}
    </div>
  );
};

export default RatePlace;