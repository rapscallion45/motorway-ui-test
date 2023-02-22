import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setImages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="app">
      <ul className="grid">
        {images &&
          images.map((img) => (
            <li key={img.id} className="grid-item">
              <img src={`${img.url}.jpg`} alt="" />
              <div className="profile-pic-container">
                <img src={`${img.user.profile_image}.webp`} alt="" />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
