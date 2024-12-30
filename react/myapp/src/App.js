import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import BookDoctor from './components/BookDoctor'; // Import BookDoctor component
import Navbar from './components/Navbar';
import DoctorList from './components/DoctorList ';
import AddDoctor from './components/AddDoctor'; // Import the AddDoctor component
import DoctorDetails from './components/DoctorDetails'; // Import the new DoctorDetails component


function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#B4D4FF', // Light blue background color
        color: '#000', // Text color
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Align child components vertically
      }}
    >
      <Router> {/* Wrap your entire app with BrowserRouter */}
        {/* Navbar is always visible */}
        <Navbar />

        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-doctor" element={<BookDoctor />} /> {/* Route for BookDoctor */}
          <Route path="/doctorlist" element={<DoctorList />} /> {/* Correct path */}
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/DoctorDetails" element={<DoctorDetails />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;