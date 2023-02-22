import React, { useEffect, useState } from "react";
import ImageModal from "./components/ImageModal/ImageModal";
import useImageModal from "./hooks/useImageModal";
import "./App.css";

const App = () => {
  const [images, setImages] = useState();
  const { image, isShown, toggle } = useImageModal();

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
              <img
                src={`${img.url}.jpg`}
                alt={`${img.alt_description}`}
                onClick={() => toggle(img)}
              />
              <div className="profile-pic-container">
                <img
                  src={`${img.user.profile_image}.webp`}
                  alt={`${img.user.username}`}
                  onClick={() => toggle(img)}
                />
              </div>
            </li>
          ))}
      </ul>
      <ImageModal image={image} isShown={isShown} close={toggle} />
    </div>
  );
};

export default App;
