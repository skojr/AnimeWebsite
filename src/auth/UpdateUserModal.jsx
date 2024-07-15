import React, { useState } from 'react';

const UpdateUserModal = ({ isOpen, onClose, onUpdate, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !newPassword) {
      alert("Please fill either email or new password to update.");
      return;
    }

    if (email && !password) {
      alert("Password is required to update email.");
      return;
    }

    if (newPassword && !oldPassword) {
      alert("Old password is required to update password.");
      return;
    }

    const updateData = {};
    if (email) {
      updateData.email = email;
      updateData.password = password;
    }
    if (newPassword) {
      updateData.oldPassword = oldPassword;
      updateData.newPassword = newPassword;
    }

    onUpdate(updateData);
  };

  return (
    <div className="modal">
      <div className="modal-content-update text-light">
        <h2>Update User Information</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='me-2'>New Email:</label>
            <input
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {email && (
            <div className='my-2'>
              <label htmlFor="password" >Current Password (required for email update):</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <div className='my-2'>
            <label htmlFor="oldPassword" >Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='my-2'>
            <label htmlFor="newPassword" >New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='btn btn-secondary fs-3 me-3 mt-3'>Update</button>
          <button type="button" className='btn btn-secondary fs-3 mt-3' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;