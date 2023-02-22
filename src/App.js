import React, { useEffect, useState } from "react";
import InputForm from "./components/InputForm/InputForm";
import ImageModal from "./components/ImageModal/ImageModal";
import useImageModal from "./hooks/useImageModal";
import "./App.css";

const App = () => {
  const [images, setImages] = useState();
  const { image, isShown, toggle } = useImageModal();

  useEffect(() => {
    /* begin API speed test upon first mount of app */
    console.time("API speed test");

    fetch("images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setImages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    /*
     ** End API speed test only when images state has been updated and
     ** images are present.
     ** A similar test can also be performed using the dev tools window
     ** in Chrome (or equivalent), and analyzing the waterfall chart for the
     ** API request on the Network tab.
     */
    if (images?.length > 0) console.timeEnd("API speed test");
  }, [images]);

  return (
    <div className="app">
      <ul className="grid">
        {images &&
          images.map((img) => (
            <li key={img.id} className="grid-item">
              <img
                src={`${img.url}.jpg`}
                alt={`${img.alt_description}`}
                onClick={() => toggle(`${img.url}.jpg`)}
              />
              <div className="profile-pic-container">
                <img
                  src={`${img.user.profile_image}.webp`}
                  alt={`${img.user.username}`}
                  onClick={() => toggle(`${img.user.profile_image}.webp`)}
                />
              </div>
            </li>
          ))}
      </ul>
      <InputForm />
      <ImageModal image={image} isShown={isShown} close={toggle} />
    </div>
  );
};

export default App;
