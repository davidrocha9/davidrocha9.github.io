import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { gsap, Linear } from "gsap";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import styles from "./Hero.module.scss";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import Carousel from "../ImageDisplay/ImageDisplay";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
// import lottie from "lottie-web";

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
    // Update the window width on window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle the "Contact Me" button click
  const handleContactMeClick = () => {
    window.open("mailto:davidsoutorocha@gmail.com");
  };

  return (
    <section
      ref={targetSection}
      className="w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative"
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
      <div className="flex flex-col pt-40 md:pt-0 select-none" style={{ flex: '0 0 50%' }}>
        <h5
          className={`${styles.intro} font-mono font-medium text-indigo-light seq`}
        >
          Hi, my name is
        </h5>
        <h1 className={`${styles.heroName} text-white text-6xl font-semibold`}>
          <span className="seq">José </span>
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
          {/* Update the button to handle the click event */}
          <Button
            onClick={handleContactMeClick}
            classes="link"
            type="primary"
          >
            Contact Me!
          </Button>
        </div>
      </div>
      <div
        className="flex items-center justify-center seq"
        style={{ flex: '0 0 50%', maxWidth: '50%', minHeight: '50vh'}}
      >
        <ImageDisplay />
      </div>
    </section>
  );
};

export default Hero;
