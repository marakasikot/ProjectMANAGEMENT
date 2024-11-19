import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        navigate('/signin');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="signUp-container">
      <form onSubmit={handleSubmit} className="signUp-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-signup">Register</button>
      </form>
      {/* <p className="sign-up-link" onClick={() => navigate('/signup')}>Need an account? Sign Up</p> */}
      <a href="/signin">
          <span>Sign In</span>
      </a>
    </div>
  );
}

export default SignUp;
