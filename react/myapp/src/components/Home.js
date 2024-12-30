import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '88vh', // Ensures the height covers the full viewport
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light blue background
        backgroundSize: 'cover', // Ensures the background image covers the screen
        backgroundPosition: 'center', // Centers the background image
        color: '#000', // Black text
        display: 'flex', // Flexbox for side-by-side layout
        justifyContent: 'space-between', // Space between text and image
        padding: '20px',
      }}
    >
      {/* Left Section: Text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Align text to the top
          paddingTop: '150px', // Increased top padding for more space at the top
          paddingLeft: '30px', // Added left padding to move text to the left
        }}
      >
        <h1 style={{ fontSize: '65px', marginBottom: '15px', marginTop: '0' }}>
          Welcome to MediHelp
        </h1>
        <p style={{ fontSize: '19px' }}>
          MediHelp, your trusted healthcare partner. Our platform provides easy access to a wide range of healthcare services, allowing you to book appointments with doctors, manage your health records, and receive the care you need at your fingertips. With MediHelp, we bring healthcare closer to you, ensuring a seamless and efficient experience for all your medical needs.
        </p>
      </div>

      {/* Right Section: Image */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center', // Horizontally centers the image
          alignItems: 'center', // Vertically centers the image in the right section
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

export default Home;
