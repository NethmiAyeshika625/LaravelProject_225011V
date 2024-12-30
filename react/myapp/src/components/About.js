import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '50px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}> {/* Same background color as other pages */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '42px', color: '#1A73E8', marginBottom: '20px', fontWeight: '600' }}>About MediHelp</h2>
        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto', fontWeight: '400' }}>
          MediHelp is a leading healthcare platform focused on providing accessible and top-tier services to individuals who seek professional medical care. 
          Our user-friendly platform allows patients to easily manage their health records and book appointments with top doctors from various medical specialties.
        </p>
        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.6', maxWidth: '900px', margin: '20px auto', fontWeight: '400' }}>
          Whether it's for a routine check-up or specialized consultation, MediHelp makes it easy for patients to book appointments, track their medical history, and access healthcare information securely online.
        </p>

        <h3 style={{ fontSize: '32px', color: '#1A73E8', marginTop: '30px', fontWeight: '600' }}>Why Choose MediHelp?</h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ flex: '1', minWidth: '250px', padding: '15px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '500', color: '#1A73E8' }}>Easy Appointment Scheduling</h4>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.6' }}>
              Book a doctor's appointment online at your convenience – anytime, anywhere.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', padding: '15px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '500', color: '#1A73E8' }}>Comprehensive Health Management</h4>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.6' }}>
              Keep track of all your medical records in one place for easy access.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', padding: '15px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '500', color: '#1A73E8' }}>Experienced Doctors</h4>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.6' }}>
              Our medical professionals are specialists in their fields, committed to providing excellent care.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', padding: '15px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '500', color: '#1A73E8' }}>24/7 Access</h4>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.6' }}>
              Access your records and book appointments anytime, from anywhere.
            </p>
          </div>
        </div>

        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.6', maxWidth: '900px', margin: '30px auto', fontWeight: '400' }}>
          MediHelp is here to revolutionize the way you access healthcare. From scheduling your first consultation to managing long-term medical needs, we are committed to making your healthcare experience as seamless as possible.
        </p>

        <h3 style={{ fontSize: '32px', color: '#1A73E8', fontWeight: '600' }}>Your Health, Our Commitment</h3>
      </div>
    </div>
  );
};

export default About;
