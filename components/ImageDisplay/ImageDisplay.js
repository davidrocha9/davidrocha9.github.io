import { useState, useEffect, useRef } from "react";
import styles from "./ImageDisplay.module.scss";
import { gsap, Linear } from "gsap";
import VanillaTilt from "vanilla-tilt";

const ImageDisplay = () => {
  const [isActive, setIsActive] = useState(false);
  const companyCard = useRef(null);
  const wrapperRef = useRef(null);
  const [imageNumber, setImageNumber] = useState(1);
  const [imagePaths, setImagePaths] = useState([]);
  const [imageRotations, setImageRotations] = useState([]);
  const [imageTranslations, setImageTranslations] = useState([]);

  const options = {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    gyroscope: false,
  };

  useEffect(() => {
    // Delay for 2 seconds before starting the image display
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setImageNumber((prevImageNumber) => (prevImageNumber % 15) + 1);
        removeOldImagesIfNeeded();
      }, 1250);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(delayTimeout);
  }, []);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
  }, [isActive]);

  const removeOldImagesIfNeeded = () => {
    const images = companyCard.current.querySelectorAll("img");
    if (images.length > 10) {
      // Use a loop to remove multiple images, if needed
      for (let i = 0; i < images.length - 10; i++) {
        companyCard.current.removeChild(images[i]);
      }
    }
  };

  useEffect(() => {
    setImagePaths((prevImagePaths) => [...prevImagePaths, getImagePath()]);
    setImageRotations((prevImageRotations) => [
      ...prevImageRotations,
      getRandomRotation(),
    ]);
    setImageTranslations((prevImageTranslations) => [
      ...prevImageTranslations,
      getRandomTranslation(),
    ]);
  }, [imageNumber]);

  useEffect(() => {
    VanillaTilt.init(companyCard.current, { ...options, glare: false });
    removeOldImagesIfNeeded();
  }, [companyCard.current]);

  const getImagePath = () => {
    return `/pictures/david${imageNumber}.png`;
  };

  const getRandomRotation = () => {
    return Math.random() * 40 - 20; // Generates a random number between -20 and 20
  };

  const getRandomTranslation = () => {
    if (imageNumber === 0) {
      return {
        x: 0,
        y: 0,
      }
    } else if (window.innerWidth < 900) {
      return {
        x: Math.random() * 200*0.3 - 100*0.3,
        y: Math.random() * 50 - 25,
      };
    } else if (window.innerWidth < 1100) {
      return {
        x: Math.random() * 200*0.6 - 100*0.6,
        y: Math.random() * 50 - 25,
      };
    } else {
      return {
        x: Math.random() * 200 - 100,
        y: Math.random() * 50 - 25,
      };
    }
  };

  const getWindowHeight = () => {
    if (window.innerWidth < 768) {
      return "50vw";
    } else {
      return "25vw";
    }
  };

  const parentStyle = {
    width: "100%",
    height: getWindowHeight(),
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  };

  const pageStyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "transparent",
    display: 'flex', // Add this line to make the 'page' div a flex container
    justifyContent: 'center', // Center images horizontally
    alignItems: 'center', // Center images vertically
  };

  return (
    <>
      <div className={` ${isActive ? "active" : ""}`} style={parentStyle}>
        <div className="page" ref={companyCard} style={pageStyle}>
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`David ${index + 1}`}
              style={{
                position: 'absolute',
                zIndex: -20,
                transform: `rotate(${imageRotations[index]}deg) translate(${imageTranslations[index].x}px, ${imageTranslations[index].y}px)`,
                height: '100%',
                objectFit: "cover"
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageDisplay;