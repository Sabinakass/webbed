// components/EditProfileModal.js
import React, { useState } from 'react';

const EditProfileModal = ({ isOpen, onClose, onSave, initialName, initialBio, initialProfilePicture }) => {
  const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);

  const handleSave = () => {
    onSave(name, profilePicture);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-5 rounded-md">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bio</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Profile Picture URL</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
