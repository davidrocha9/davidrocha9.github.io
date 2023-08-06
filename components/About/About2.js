import { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About2 = ({ clientHeight }) => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });
  
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(
        quoteRef.current.querySelector(".about-3:nth-child(1)"),
        // Animate the first occurrence of .about-3 (frontend) first
        { backgroundPositionY: "100%", duration: 1 }
      )
      .to(
        quoteRef.current.querySelectorAll(".about-3:not(:nth-child(1))"),
        // Animate the rest of the .about-3 spans with a delay
        { backgroundPositionY: "100%", duration: 1, stagger: 0.2 },
        "-=0.8" // Delay the staggered animation by 0.8 seconds
      );
  
    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
    });
  }, [quoteRef, targetSection]);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`${
          clientHeight > 650 ? "py-80" : "py-72"
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-[2.70rem] md:text-6xl lg:text-[4rem] text-center"
        >
          I have a strong passion for both{" "}
          <span className="about-3 font-bold">frontend</span> and{" "}
          <span className="about-3 font-bold">full-stack</span> development, as
          well as <span className="about-3 font-bold">game development</span>
        </h1>
      </div>
      <style>{`
        .about-3 {
          background: linear-gradient(
            180deg, /* Use 180deg for vertical gradient */
            #ffffff 0%,
            #ffffff 50%,
            #8b31ff 51%,
            #7000ff 100%
          );
          background-size: 100% 210%; /* Adjust background-size for vertical animation */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default About2;
