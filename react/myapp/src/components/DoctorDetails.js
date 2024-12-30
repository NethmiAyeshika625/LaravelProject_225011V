import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.get('http://localhost:8000/api/doctors', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '88vh', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          color: '#000',
        }}
      >
        {/* Title */}
        <h2 style={{ marginBottom: '20px' }}>Doctors Details</h2>

        {/* Loading Spinner or Doctor List */}
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <div>
            {doctors.length === 0 ? (
              <p>No doctors available</p>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ width: '60%', textAlign: 'left' }}> {/* Align text to left */}
                    <h3>{doctor.name}</h3>
                    <p><strong>Specialization:</strong> {doctor.specialization}</p>
                    <p><strong>Phone:</strong> {doctor.phone}</p>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Bio:</strong> {doctor.bio}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
