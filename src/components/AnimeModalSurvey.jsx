import React, { useState } from "react";

const AnimeSurveyModal = ({ isOpen, onClose, onSubmit }) => {
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!genre || !length) {
      alert("Please select both Genre and Length preference.");
      return;
    }
    onSubmit({ genre, length });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content-update text-light">
        <h2>Anime Preference Survey</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="genre">Favorite Genre:</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
            </select>
          </div>
          <div>
            <label htmlFor="length">Preferred Length:</label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="">Select Length</option>
              <option value="short">Short (1-12 episodes)</option>
              <option value="medium">Medium (13-24 episodes)</option>
              <option value="long">Long (25+ episodes)</option>
            </select>
          </div>
          <button type="submit">Get Recommendations</button>
          <button
            type="button"
            className="btn btn-secondary fs-3 mt-3"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnimeSurveyModal;
