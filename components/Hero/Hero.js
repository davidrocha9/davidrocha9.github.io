import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { gsap, Linear } from "gsap";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import styles from "./Hero.module.scss";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import ImageDisplay from "../ImageDisplay/ImageDisplay";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const typedEl = useRef(null);
  const targetSection = useRef(null);

  const options = {
    strings: TYPED_STRINGS,
    typeSpeed: 30,
    startDelay: 2000,
    backSpeed: 30,
    backDelay: 1250,
    loop: true,
  };

  useEffect(() => {
    const typed = new Typed(typedEl.current, options);

    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 },
        "<"
      );

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallerThan768px = windowWidth < 768;

  // Function to handle the "Download CV" button click
  const handleContactMeClick = () => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = "/cv/cv.pdf"; // Replace with the actual path to your CV file
    link.target = "_blank"; // Open the file in a new tab if the download attribute is not supported
    link.download = "Jose_David_Rocha_Resume.pdf"; // Set the desired filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={targetSection}
      className={`w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative ${
        isSmallerThan768px ? "flex-col-reverse" : "flex-row" /* Conditionally add class */
      }`}
      id={MENULINKS[0].ref}
      style={{ opacity: 0 }}
    >
      <style>
        {`
          .typed-cursor {
            font-size: 2rem;
          }
        `}
      </style>
      <div
        className="cardstack flex items-center justify-center hide-on-small-screen"
        style={{width: "50rem"}}
      >
        <ImageDisplay />
      </div>
      <div className="flex" style={{width: "50rem", justifyContent: "center", alignItems: "center", position: "relative"}}>
        <div
          className="flex flex-col pt-40 md:pt-0 select-none introduction"
          style={{position: "relative", top: "0", width: "100%"}}
        >
          <h5
            className={`${styles.intro} font-mono font-medium text-indigo-light seq`}
          >
            Hi, my name is
          </h5>
          <h1 className={`${styles.heroName} text-white text-6xl font-semibold`}>
            <span className={`relative ${styles.emphasize} seq`}>David</span>
            <span className="seq"> Rocha</span>
          </h1>
          <p>
            <span
              ref={typedEl}
              className="seq text-3xl text-gray-light-3 font-mono leading-relaxed"
            ></span>
          </p>
          <div className="seq">
            <Profiles />
          </div>
          <div className="seq pt-4">
            {/* Update the button text and handle the click event */}
            <Button onClick={handleContactMeClick} classes="link" type="primary">
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
