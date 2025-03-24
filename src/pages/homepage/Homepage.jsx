import React from 'react';

function Homepage() {
  return (
    <div>
      <img 
        src="https://www.imcedu.com/wp-content/uploads/2020/10/8.jpg" 
        alt="QIU Campus" 
        style={{ width: '100%', height: 'auto' }} 
      />
      <div
        style={{
            position: 'absolute',
            top: '14%',
            right: '2%',
            width: '25%',
            backgroundColor: 'rgba(48,51,107,0.5)',
            padding: '15px',
            borderRadius: '5px',
            backdropFilter: 'blur(10px)',
        }}>
        <p className="text-end text-white fs-2">Welcome to QIU portal</p>
        <p className="text-end text-white">
            Our virtual learning environment for the QIU community 
            no matter where your geographical location is. This is 
            your one stop centre for all your online learning needs 
            from any part of the world. No matter if you are a staff 
            or student at QIU, or someone looking for professional 
            development modules, you have access to useful information, 
            advice and support right here in eQIU.
        </p>
      </div>
    </div>
  )
}

export default Homepage;
