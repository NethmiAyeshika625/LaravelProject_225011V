import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Setting Axios defaults for the application
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Laravel API URL

const Register = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState(null); // Error messages from API
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      // Fetch CSRF token first to ensure we can make secure requests
      await axios.get('/sanctum/csrf-cookie');

      // Send registration request to the backend
      const response = await axios.post('/api/register', formData);

      console.log('Registration successful:', response.data); // Debugging response
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error('Error during registration:', err); // Log the error for debugging

      // Handle errors from the API response
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors); // Set specific field errors from the API
      } else {
        setError({ general: 'Something went wrong. Please try again later.' }); // General error message
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '88vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.2)', // Transparent white background to match login page
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            color: '#000', // Set all text to black
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Register</h2>

          {/* Display error messages */}
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {Object.entries(error).map(([key, value]) => (
                <div key={key}>{`${key}: ${value}`}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div style={{ marginTop: '15px' }}>
            <span style={{ color: '#000' }}>Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                padding: 0,
              }}
            >
              Login here
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src="img-1.png" // Image source
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

// Shared styles
const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '5px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#000',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  background: 'rgba(0, 123, 255, 0.7)',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Register;
