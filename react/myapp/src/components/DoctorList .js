import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDoctor, setEditDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

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

  const handleEdit = (doctor) => {
    setEditDoctor(doctor.id);
    setDoctorDetails({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/doctors/${editDoctor}`,
        doctorDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );
      alert('Doctor details updated successfully!');
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === editDoctor ? { ...doctor, ...doctorDetails } : doctor
        )
      );
      setEditDoctor(null);
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      alert('Doctor deleted successfully!');
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '88vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px', padding: '30px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textAlign: 'center', color: '#000' }}>
        {/* Title and Button Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Doctors List</h2>
          
          {/* Add New Doctor Button */}
          <button
            onClick={() => navigate('/add-doctor')}
            style={{
              padding: '10px 20px',
              background: 'green',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add New Doctor
          </button>
        </div>

        {/* Doctor List */}
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <div>
            {doctors.length === 0 ? (
              <p>No doctors available</p>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ width: '60%' }}>
                    {editDoctor === doctor.id ? (
                      // Edit Form
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={doctorDetails.name}
                          onChange={handleChange}
                          placeholder="Name"
                          style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
                        />
                        <input
                          type="text"
                          name="specialization"
                          value={doctorDetails.specialization}
                          onChange={handleChange}
                          placeholder="Specialization"
                          style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
                        />
                        <input
                          type="text"
                          name="phone"
                          value={doctorDetails.phone}
                          onChange={handleChange}
                          placeholder="Phone"
                          style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={doctorDetails.email}
                          onChange={handleChange}
                          placeholder="Email"
                          style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
                        />
                        <button
                          onClick={handleSave}
                          style={{
                            padding: '10px 20px',
                            background: 'green',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      // Display Doctor Details
                      <div>
                        <h3>{doctor.name}</h3>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>Phone:</strong> {doctor.phone}</p>
                        <p><strong>Email:</strong> {doctor.email}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '30%' }}>
                    {editDoctor === doctor.id ? (
                      // No edit/delete buttons while editing
                      <></>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(doctor)} style={{ padding: '10px 20px', background: 'rgba(0, 123, 255, 0.7)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(doctor.id)} style={{ padding: '10px 20px', background: 'rgba(255, 0, 0, 0.7)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </>
                    )}
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

export default DoctorList;
