import React from 'react';
import './LinkedInProfile.css';

import profile from '@assets/data/linkedin/profile.json';
import experience from '@assets/data/linkedin/experience.json';
import education from '@assets/data/linkedin/education.json';
import skills from '@assets/data/linkedin/skills.json';
import certifications from '@assets/data/linkedin/certifications.json';


const LinkedInProfile = () => {
  const openLinkedIn = () => {
    window.open(profile.linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="linkedin-profile">
      <div className="linkedin-header-bar">
        <h2>LinkedIn</h2>
      </div>
      <div className="linkedin-body">
        <div className="linkedin-main-card">
          <div className="linkedin-cover-photo" style={{ backgroundImage: `url(${profile.backgroundUrl})` }}/>
          <div className="linkedin-profile-picture" style={{ backgroundImage: `url(${profile.profilePicUrl})` }}/>
          <div className="linkedin-main-header">
            <div className="linkedin-info">
              <h1>{profile.name}</h1>
              <h2>{profile.title}</h2>
              <p>{profile.location}</p>
            </div>
            <button className="linkedin-view-button" onClick={openLinkedIn}>
              View on LinkedIn
            </button>
          </div>
        </div>

        <div className="linkedin-section-card">
          <h3>About</h3>
          <p>{profile.about}</p>
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
          {certifications.map((cert, index) => (
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
