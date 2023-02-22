import { useState } from "react";

const useImageModal = () => {
  const [isShown, setIsShown] = useState(false);
  const [image, setImage] = useState(null);

  const toggle = (img) => {
    setImage(img);
    setIsShown(!isShown);
  };

  return {
    isShown,
    image,
    toggle,
  };
};

export default useImageModal;
