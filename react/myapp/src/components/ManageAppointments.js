import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null); // For editing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAppointments();  // Calling the function to fetch appointments
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Assuming you need to pass a token for authorization
      const token = localStorage.getItem('token'); // Get token from local storage (if available)
      const response = await axios.get('http://localhost:8000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to headers for protected routes
        },
      });
      setAppointments(response.data);  // Set the fetched appointments to state
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');  // Show error if fetching fails
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment({
      ...editAppointment,
      [name]: value,
    });
  };

  const handleUpdateAppointment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Ensure token is passed for authorization
      const response = await axios.put(
        `http://localhost:8000/api/appointments/${editAppointment.id}`,
        editAppointment,
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token to headers
        }
      );
      setAppointments(appointments.map((appt) => (appt.id === editAppointment.id ? response.data : appt)));
      setEditAppointment(null); // Clear edit form
      setSuccessMessage('Appointment updated successfully');
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Failed to update appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is passed for authorization
      await axios.delete(`http://localhost:8000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      setSuccessMessage('Appointment deleted successfully');
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Failed to delete appointment');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '88vh',
        backgroundColor: '#B4D4FF',
      }}
    >
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
            width: '100%',            maxWidth: '600px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            color: '#000',
          }}
        >
          <h2>Manage Appointments</h2>

          {/* Display error and success messages */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          {/* Loading indicator */}
          {loading && <p>Loading appointments...</p>}

          {/* Appointment List */}
          <h3>Existing Appointments</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span>
                    <strong>{appointment.user_name}</strong> with Dr. {appointment.doctor_name} on {appointment.appointment_date}
                  </span>
                  <button
                    onClick={() => setEditAppointment(appointment)}
                    style={{
                      padding: '8px 15px',
                      background: '#4CAF50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginLeft: '10px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    style={{
                      padding: '8px 15px',
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginLeft: '10px',
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No appointments found</p>  // If no appointments, display this message
            )}
          </ul>

          {/* Edit Appointment Form */}
          {editAppointment && (
            <div>
              <h3>Edit Appointment</h3>
              <input
                type="text"
                name="doctor_id"
                placeholder="Doctor ID"
                value={editAppointment.doctor_id}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#000',
                  outline: 'none',
                }}
              />
              <input
                type="date"
                name="appointment_date"
                value={editAppointment.appointment_date}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#000',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleUpdateAppointment}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'rgba(0, 123, 255, 0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                {loading ? 'Updating...' : 'Update Appointment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
