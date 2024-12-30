import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Login = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get CSRF token before making the login request
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');

      // Send POST request to the backend for login
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Store the token and role in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('role', response.data.user.role);

      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        navigate('/doctorlist'); // Redirect admin to doctor list
      } else {
        navigate('/doctordetails'); // Redirect user to doctor details
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed! Please check your email and password.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '88vh',
      }}
    >
      {/* Left Side: Login Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.2)', // Transparent white background
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            color: '#000', // Set all text to black
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#000', // Black text for the input field
                outline: 'none',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#000', // Black text for the input field
                outline: 'none',
              }}
            />
            <div style={{ textAlign: 'left', margin: '10px 0' }}>
              <label>
                <input type="checkbox" style={{ marginRight: '5px' }} />
                Remember me
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(0, 123, 255, 0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Login
            </button>
          </form>
          <div style={{ marginTop: '15px' }}>
            <span style={{ color: '#000' }}>Don't have an account? </span>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'transparent',
                color: '#000', // Black text for "Register here"
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                padding: 0,
              }}
            >
              Register here
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="img-1.png"
          alt="Healthcare Illustration"
          style={{
            maxWidth: '70%', // Limits the image width to 70% of the container
            height: 'auto', // Ensures the image maintains its aspect ratio
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default Login;
