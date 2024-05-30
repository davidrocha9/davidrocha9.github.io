/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";
import { gsap, Linear } from "gsap";
import { Howl } from "howler";
import Button from "../Button/Button";
import FooterBg from "./FooterBg/FooterBg";
import Profiles from "../Profiles/Profiles";
import { MENULINKS } from "../../constants";

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const targetSection = useRef(null);

  const handleClick = () => {
    setPlaybackRate((rate) => rate + 0.1);
    heartClickSound.play();
  };

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

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 },
        "<"
      );
  }, [targetSection]);

  return (
    <footer className="w-full relative select-none bg-cover" ref={targetSection}>
      <FooterBg />
      <Fade bottom distance={"4rem"}>
        <div className="w-full h-full pt-32">
          <div className="section-container flex flex-col h-full justify-end z-10 items-center py-12">
            <h1 className="font-medium text-3xl md:text-4xl text-center seq">
              Feel free to connect on social media.
            </h1>
            <div className="text-center seq">
              <Profiles />
            </div>
            <div className="seq pt-4 text-center">
              {/* Update the button to handle the click event */}
              <Button onClick={handleContactMeClick} classes="link" type="secondary">
                Download CV
              </Button>
            </div>
            <p className="text-center text-white text-sm sm:text-base font-medium tracking-wide mt-8">
              Developed with{" "}
              <button onClick={handleClick} className="link heart-btn">
                <span role="img" aria-label="heart" className="animate-pulse">
                  ❤️
                </span>
              </button>{" "}
              by <span className="text-white">David Rocha</span>
            </p>
          </div>
        </div>
      </Fade>
      <img
        src="/footer-curve.svg"
        className="w-full rotate-180"
        alt=""
        loading="eager"
        height={180}
      />
      <style>{`
        footer {
          background-image: linear-gradient(270deg, #9f55ff, #7000ff, #8b31ff);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
