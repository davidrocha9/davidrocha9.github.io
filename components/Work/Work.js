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
  }, [targetSection]);

  return (
    <section
      className="w-full relative select-none"
      id={MENULINKS[2].ref}
      ref={targetSection}
    >
      <div className="section-container py-16 flex flex-col justify-center">
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
                  <b style={{fontSize: '1.5rem'}}>Junior Software Engineer <a
                    href="https://arkadium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-widest text-gray-light-2 font-medium text-base mb-2 text-gradient" style={{fontSize: "1.5rem"}}
                  >
                    <b>@ Arkadium</b>
                    </a>
                  </b>
                  <h3 className="tracking-widest text-gray-light-2 font-medium text-base mb-2" style={{fontSize: "1rem"}}>
                    Oct 2023 - Present
                  </h3>
                  <h3>
                  <ul>
                      <li>- Delivered game updates that meet product requirements, quality standards and production schedules</li>
                      <li>- Worked alongside partners (AARP, Microsoft, Usa Today) to deliver game updates to their platforms</li>
                      <li>- Optimized game performance, refactored code, integrated third-party libraries, actively fixed defects and addressed user feedback</li>
                      <li>- Effectively understood and utilized standardized technical tools, processes and templates</li>
                      <li>- Worked proficiently with a multidisciplinary team, while recommending improvements in all areas of development</li>
                      <li>- Worked with the team to clarify requirements, project progress, code decisions and timelines</li>
                    </ul>
                  </h3>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem className="seq">
                <TimelineSeparator>
                  <TimelineDot style={{borderWidth: "10px", backgroundColor: "rgba(138,48,255,255)"}}/>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <b style={{fontSize: '1.5rem'}}>Internship <a
                    href="https://zerozero.pt"
                    target="_blank"
                    rel="noopener noreferrer"
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
