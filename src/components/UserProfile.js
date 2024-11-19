import React, { useState, useEffect } from 'react';
import '../style/UserProfile.css';

function UserProfile({ user }) {
  // Устанавливаем начальное состояние с проверкой наличия пользователя и его свойств
  const [profileData, setProfileData] = useState({
    profileImage: user?.profileImage || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user._id) { // Добавлена проверка наличия user и user._id
      setError('User ID not available');
      return;
    }

    async function loadUserProjects() {
      try {
        const response = await fetch(`/api/users/${user._id}/projects`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError('Failed to load projects');
        console.error('Error loading user projects:', error);
      }
    }

    loadUserProjects();
  }, [user?._id]); // Используем опциональное свойство для отслеживания изменений ID

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    console.log('Image uploaded:', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data submitted:', profileData);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;
