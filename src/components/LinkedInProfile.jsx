import React from 'react';
import './LinkedInProfile.css';


const LinkedInProfile = () => {
  const openLinkedIn = () => {
    window.open(`https://www.linkedin.com/in/davidsoutorocha/`, '_blank', 'noopener,noreferrer');
  };

  const profilePicUrl = 'https://media.licdn.com/dms/image/v2/D4D03AQFHKP0FiVqz-g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690057149591?e=1769040000&v=beta&t=XuYpC9YCMbBNm53OeUCPrrjA4Tsa7LGDaL_Y5Rgd0uM';
  const backgroundUrl = 'https://media.licdn.com/dms/image/v2/D4D16AQFDBRxABPM-Sg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1736182912500?e=1769040000&v=beta&t=KbqBI4RvFRt_GZyhh3HH1l1JxhIPL1MkYUwz-WiRatg';
  
  const experience = [
    {
      title: 'Software Engineer',
      company: 'Be Your Best™',
      date: 'Jan 2026 - Present',
      description: 'Working on the Chrome team to improve browser performance and user experience.'
    },
    {
      title: 'Junior Software Engineer',
      company: 'Be Your Best™',
      date: 'Jan 2025 - Dec 2025',
      description: 'Developed new features for the Messenger app.'
    },
    {
      title: 'Junior Software Engineer',
      company: 'Arkadium',
      date: 'Oct 2023 - Dec 2024',
      description: 'Developed new features for the Messenger app.'
    },
    {
      title: 'Intern',
      company: 'ZeroZero',
      date: 'Feb - Jul 2023',
      description: 'Developed MSc Thesis focused on a sports-news NLG system.'
    }
  ];

  const skills = ['TypeScript', 'JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python', 'C#', 'Unity', 'Pixi.js'];
  const education = [
    {
      institution: 'Faculdade of Engineering of the University of Porto',
      degree: `Master's degree, Informatics and Computing Engineering`,
      date: 'Sep 2021 - Jul 2023',
      grade: '18/20'
    },
    {
      institution: 'University of Lodz',
      degree: "Master's degree, Informatics and Computing Engineering",
      date: 'Oct 2022 - Feb 2023',
      grade: '4.81/5',
      description: 'Erasmus+ Mobility Programme'
    },
    {
      institution: 'Faculdade of Engineering of the University of Porto',
      degree: `Bachelor's degree, Informatics and Computing Engineering`,
      date: 'Sep 2018 - Jul 2021',
      grade: '15/20'
    },
  ];

  const licensesAndCertifications = [
    {
      name: 'Advanced English Certificate Level C1',
      issuer: 'Cambridge English',
      issuedDate: 'Aug 2015',
    }
  ];

  return (
    <div className="linkedin-profile">
      <div className="linkedin-header-bar">
        <h2>LinkedIn</h2>
      </div>
      <div className="linkedin-body">
        <div className="linkedin-main-card">
          <div className="linkedin-cover-photo" style={{ backgroundImage: `url(${backgroundUrl})` }}/>
          <div className="linkedin-profile-picture" style={{ backgroundImage: `url(${profilePicUrl})` }}/>
          <div className="linkedin-main-header">
            <div className="linkedin-info">
              <h1>David Rocha</h1>
              <h2>Software Engineer @ Be Your Best™</h2>
              <p>Porto, Portugal</p>
            </div>
            <button className="linkedin-view-button" onClick={openLinkedIn}>
              View on LinkedIn
            </button>
          </div>
        </div>

        <div className="linkedin-section-card">
          <h3>About</h3>
          <p>Software engineer focused on building cool products and shipping high-quality work.</p>
        </div>

        <div className="linkedin-section-card">
          <h3>Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="linkedin-experience-item">
              <h4>{exp.title}</h4>
              <h5>{exp.company}</h5>
              <p className="date">{exp.date}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="linkedin-section-card">
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="linkedin-education-item">
              <div>
                <h4>{edu.institution}</h4>
                <p>{edu.degree}</p>
                <p className="date">{edu.date}</p>
                {edu.grade && <p className="grade">Grade: {edu.grade}</p>}
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="linkedin-section-card">
          <h3>Licenses & certifications</h3>
          {licensesAndCertifications.map((cert, index) => (
            <div key={index} className="linkedin-certification-item">
              <div>
                <h4>{cert.name}</h4>
                <p>{cert.issuer}</p>
                <p className="date">Issued {cert.issuedDate}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="linkedin-section-card">
          <h3>Skills</h3>
          <div className="linkedin-skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="linkedin-skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInProfile;
