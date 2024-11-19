import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/projects');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid email or password.');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="signIn-container">
      <form onSubmit={handleSubmit} className="signIn-form">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-signin">Login</button>
      </form>
      {/* <p className="sign-up-link" onClick={() => navigate('/signup')}>Need an account? Sign Up</p> */}
      <a href="/signup">
          <span>Need an account? Sign Up</span>
      </a>
    </div>
  );
}

export default SignIn;
