/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const Education = () => {
  const targetSection = useRef(null);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".skills-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });

  revealTl.from(
    targetSection.current.querySelectorAll(".seq2"),
    { opacity: 0, duration: 0.5, stagger: 0.5 },
    "<"
  );

  ScrollTrigger.create({
    trigger: targetSection.current.querySelector(".skills-wrapper"),
    start: "100px bottom",
    end: `center center`,
    animation: revealTl,
    scrub: 0,
  });
}, [targetSection]);

  return (
    <section
      className="w-full relative select-none mt-44"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        <div className="flex flex-row" style={{width: "80%"}}> {/* Wrap each set of education in a flex-row */}
          <div className="flex flex-col skills-wrapper">
            <div className="flex flex-col seq">
              <h1 className="text-6xl mt-2 font-medium text-gradient w-fit">
                Education
              </h1>
            </div>
            <div className="mt-10">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-2 seq">
                Sep 2021 - Jul 2023
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq" style={{fontSize: "2rem"}}>
                <b>Master&apos;s Degree in Informatics and Computing Engineering</b>
              </h3>
              <a
                href="https://fe.up.pt" // Replace "https://fe.up.pt" with the actual URL you want to link to
                target="_blank" // This will open the link in a new tab
                rel="noopener noreferrer" // Recommended for security reasons
                className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq text-gradient"
              >
                @ Faculdade de Engenharia da Universidade do Porto
              </a> 
            </div>
            <div className="mt-10">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-2 seq">
                Sep 2022 - Feb 2023
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq" style={{fontSize: "2rem"}}>
                <b>Erasmus+ Mobility Programme</b>
              </h3>
              <a
                href="https://www.math.uni.lodz.pl/" // Replace "https://fe.up.pt" with the actual URL you want to link to
                target="_blank" // This will open the link in a new tab
                rel="noopener noreferrer" // Recommended for security reasons
                className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq text-gradient"
              >
                @ Wydział Matematyki i Informatyki Uniwersytetu Łódzkiego
              </a>
            </div>
            <div className="mt-10">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-2 seq">
                Sep 2018 - Jul 2021
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq" style={{fontSize: "2rem"}}>
                <b>Bachelor&apos;s Degree in Informatics and Computing Engineering</b>
              </h3>
              <a
                href="https://fe.up.pt" // Replace "https://fe.up.pt" with the actual URL you want to link to
                target="_blank" // This will open the link in a new tab
                rel="noopener noreferrer" // Recommended for security reasons
                className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq text-gradient"
              >
                @ Faculdade de Engenharia da Universidade do Porto
              </a> 
            </div>
          </div>
          
          <div className="flex flex-col skills-wrapper">
            <div className="flex flex-col seq2">
              <h1 className="text-6xl mt-2 font-medium text-gradient w-fit">
                Languages
              </h1>
            </div>
            <div className="mt-10">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base seq2">
                <b style={{fontSize: '1.5rem'}}>PT</b> Portuguese
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq2" style={{fontSize: "1rem"}}>
                Native
              </h3>
            </div>
            <div className="mt-2">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base seq2">
                <b style={{fontSize: '1.5rem'}}>GB</b> English
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq2" style={{fontSize: "1rem"}}>
                Fluent
              </h3>
            </div>
            <div className="mt-2">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base seq2">
                <b style={{fontSize: '1.5rem'}}>ES</b> Spanish
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq2" style={{fontSize: "1rem"}}>
                Beginner
              </h3>
            </div>
            <div className="flex flex-col seq2">
              <h1 className="text-6xl mt-10 font-medium text-gradient w-fit">
                Certificates
              </h1>
            </div>
            <div className="mt-10">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base seq2">
                <b style={{fontSize: '1.5rem'}}>CAE (C1 Level)</b>
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base seq2" style={{fontSize: "1rem"}}>
                Cambridge English Assessment
              </h3>
              <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2 seq2" style={{fontSize: "1rem"}}>
                2015
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
