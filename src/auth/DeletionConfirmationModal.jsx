import React, { useState } from 'react';

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='mb-3 text-light'>Confirm Deletion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button className="btn btn-danger modal-btn mx-2" type="submit">Confirm Delete</button>
          <button className="btn btn-primary modal-btn" type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};