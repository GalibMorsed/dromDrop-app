import React from "react";

export default function AboutUe() {
  return (
    <div>
      <div className="about-wrapper">
        <section className="about-hero">
          <div className="about-container">
            {/* Left Side - Image */}
            <div className="about-left">
              <img
                src="homeSecImgs/aboutMe.jpg"
                alt="Profile"
                className="about-img"
              />
            </div>

            {/* Right Side - Intro */}
            <div className="about-right">
              <h1>
                Hi, I'm <span>Galib Morsed</span>
              </h1>
              <p className="tagline">
                Software Developer | Full Stack Development | MERN Specialist
              </p>
              <p className="about-desc">
                I'm a passionate developer with strong expertise in the MERN
                stack. Currently pursuing my Bachelor's degree, I enjoy building
                impactful projects, exploring cutting-edge tech, and designing
                clean UI/UX experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="skills-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Express",
              "SCSS",
              "REST APIs",
              "JavaScript",
              "HTML5",
              "CSS",
              "ECMAScript",
              "NoSQL",
              "GitHub",
              "DSA",
              "OOPS",
              "JAVA",
              "OS",
              "Python",
              "DBMS",
            ].map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="social-links">
          <h2>Connect with Me</h2>
          <div className="social-icons">
            <a
              href="https://github.com/GalibMorsed"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/galib-morsed"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="mailto:morsedgalib982@gmail.com">
              <i className="fas fa-envelope"></i> Email
            </a>
            <a href="https://www.instagram.com/galib_morsed/">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
