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
import { timelineItemClasses } from '@mui/lab/TimelineItem';

const Work = () => {
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
      className="w-full relative select-none"
      id={MENULINKS[2].ref}
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
        <div className="flex flex-row"> {/* Wrap each set of Work in a flex-row */}
          <div className="flex flex-col skills-wrapper"  style={{width: "100%"}}>
            <div className="flex flex-col">
              <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
                Experience
              </h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              <TimelineItem className="seq">
                <TimelineSeparator>
                  <TimelineDot style={{borderWidth: "10px", backgroundColor: "rgba(138,48,255,255)"}}/>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <b style={{fontSize: '1.5rem'}}>Internship <a
                    href="zerozero.pt" // Replace "https://fe.up.pt" with the actual URL you want to link to
                    target="_blank" // This will open the link in a new tab
                    rel="noopener noreferrer" // Recommended for security reasons
                    className="tracking-widest text-gray-light-2 font-medium text-base mb-2 text-gradient" style={{fontSize: "1.5rem"}}
                  >
                    <b>@ ZeroZero</b>
                    </a>
                  </b>
                  <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2" style={{fontSize: "1rem"}}>
                    Feb 2023 - Jul 2023
                  </h3>
                  <h3>
                  <ul>
                      <li>- Developed my Master&apos;s Thesis</li>
                      <li>- Collaborated with a team of professionals to discuss the progress and state of the work during bi-weekly meetings.</li>
                      <li>- Demonstrated strong problem-solving skills and adaptability in handling challenges encountered during the project.</li>
                      <li>- Gained valuable experience working in a professional IT environment and contributing to real-world projects.</li>
                    </ul>
                  </h3>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
              </TimelineItem>
            </Timeline>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
