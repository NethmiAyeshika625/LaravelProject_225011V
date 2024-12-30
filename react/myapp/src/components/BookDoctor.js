import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const BookDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch doctors from the backend (API)
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/doctors', {
                    withCredentials: true, // Ensures cookies (CSRF token) are sent with the request
                });

                if (response.status === 200) {
                    setDoctors(response.data); // Update the doctors state with the fetched data
                } else {
                    setErrorMessage('Failed to load doctors');
                }
            } catch (error) {
                setErrorMessage('Error fetching doctors: ' + error.message);
            }
        };

        fetchDoctors(); // Call the function to fetch doctors when the component mounts
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDoctor || !appointmentDate) {
            setErrorMessage('Please select a doctor and appointment date');
            return; // Prevent submission if validation fails
        }

        try {
            // Send the appointment booking request using Axios
            const response = await axios.post(
                'http://localhost:8000/api/appointments',
                {
                    user_id: 1, // Assuming user ID 1, replace with dynamic user ID if applicable
                    doctor_id: selectedDoctor,
                    appointment_date: appointmentDate,
                },
                {
                    withCredentials: true, // Ensures cookies (CSRF token) are sent with the request
                }
            );

            if (response.status === 201) {
                setSuccessMessage('Appointment booked successfully');
                setErrorMessage(''); // Clear any previous errors
            } else {
                setErrorMessage('Failed to book appointment: ' + response.data.message);
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '88vh',
            }}
        >
            {/* Left Side: Appointment Booking Form */}
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
                    <h2 style={{ marginBottom: '20px' }}>Book an Appointment</h2>

                    {/* Display success or error message */}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                textAlign: 'left',
                                margin: '10px 0',
                            }}
                        >
                            <label>Select Doctor:</label>
                            <select
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
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
                            >
                                <option value="">Select Doctor</option>
                                {doctors.length > 0 ? (
                                    doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No doctors available</option>
                                )}
                            </select>
                        </div>

                        <div
                            style={{
                                textAlign: 'left',
                                margin: '10px 0',
                            }}
                        >
                            <label>Select Appointment Date:</label>
                            <input
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
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
                            Book Appointment
                        </button>
                    </form>
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
                    src="img-1.png" // Image source
                    alt="Healthcare Illustration"
                    style={{
                        maxWidth: '70%',  // Limits the image width to 70% of the container
                        height: 'auto',   // Ensures the image maintains its aspect ratio
                        borderRadius: '10px',
                    }}
                />
            </div>
        </div>
    );
};

export default BookDoctor;
