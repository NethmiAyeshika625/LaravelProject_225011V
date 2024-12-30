import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/doctors', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Doctor added successfully!');
      navigate('/doctors'); // Redirect back to the doctor list page
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '88vh' }}>
      <div style={{ width: '100%', maxWidth: '600px', padding: '30px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textAlign: 'center', color: '#000' }}>
        <h2>Add New Doctor</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleFormChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', background: 'green', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
