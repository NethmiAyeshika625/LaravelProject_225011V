import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'center', margin: 0 }}>
        <li style={{ margin: '0 20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
        </li>

        <li style={{ margin: '0 20px' }}>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>Login</Link>
        </li>

        <li style={{ margin: '0 20px' }}>
          <Link to="/doctorlist" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}> Doctor List</Link>
        </li>

        <li style={{ margin: '0 20px' }}>
          <Link to="/DoctorDetails" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}> Doctor Details</Link>
        </li>

      
        <li style={{ margin: '0 20px' }}>
          <Link to="/book-doctor" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>Book Doctor</Link>
        </li>

      
       
        <li style={{ margin: '0 20px' }}>
          <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
