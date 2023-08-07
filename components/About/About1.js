import { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About1 = ({ clientHeight }) => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.3 },
    });

    timeline
      .fromTo(
        quoteRef.current.querySelector(".about-1"),
        { opacity: 0.2 },
        { opacity: 1 }
      )
      .to(quoteRef.current.querySelector(".about-1"), {
        opacity: 0.2,
        delay: 0.5,
      })
      .fromTo(
        quoteRef.current.querySelector(".about-2"),
        { opacity: 0.2 },
        { opacity: 1 },
        "<"
      )
      .to(quoteRef.current.querySelector(".about-2"), {
        opacity: 0.2,
        delay: 1,
      });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
    });
  }, [quoteRef, targetSection]);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`${
          clientHeight > 650 ? "pt-28 pb-16" : "pt-80 pb-72"
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-[2.70rem] md:text-6xl lg:text-[3.5rem] text-center"
        >
          <span className="about-1 leading-tight">
            I recently concluded my Master&apos;s Degree in Informatics and Computer Engineering from Faculdade de Engenharia da Universidade do Porto.{" "}
          </span>
          <span className="about-2 leading-tight">
            I&apos;m a 23-year-old proactive and motivated tech entusiast, passionate about building things.{" "}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default About1;
