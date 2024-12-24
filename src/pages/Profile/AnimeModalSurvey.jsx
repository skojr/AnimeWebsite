import React, { useState } from "react";
import PropTypes from "prop-types";
import './AnimeModalSurvey.css';

const AnimeSurveyModal = ({ isOpen, onClose, onSubmit }) => {
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");

  if (!isOpen) return null;

  const genreMapping = {
    action: 1,
    sliceOfLife: 36,
    shounen: 27,
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!genre || !length) {
      alert("Please select both Genre and Length preference.");
      return;
    }
  
    const genreId = genreMapping[genre]; // Map genre to its corresponding ID
    onSubmit({ genreId, length }); // Pass genreId instead of genre name
    onClose();
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Anime Preference Survey</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="genre" className="form-label">
              Favorite Genre:
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-select"
            >
              <option value="">Select Genre</option>
              <option value="action">Action</option>
              <option value="sliceOfLife">Slice of Life</option>
              <option value="mystery">Shounen</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="length" className="form-label">
              Preferred Length:
            </label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="form-select"
            >
              <option value="">Select Length</option>
              <option value="short">Short (1-12 episodes)</option>
              <option value="medium">Medium (13-24 episodes)</option>
              <option value="long">Long (25+ episodes)</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Get Recommendations
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes Validation
AnimeSurveyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

// Default Props
AnimeSurveyModal.defaultProps = {
  error: null,
};

export default AnimeSurveyModal;
