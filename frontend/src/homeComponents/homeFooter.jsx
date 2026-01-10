import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithubSquare } from "react-icons/fa";

export default function HomeFooter() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Your email was submitted successfully!");
    e.target.reset();
  };
  return (
    <div>
      <footer className="footer">
        <div className="footer-newsletter">
          <h3>Stay Updated with DormDrop!</h3>
          <p>
            Get the latest updates on campus deliveries, exclusive offers, and
            helpful tips for students.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Join</button>
          </form>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <div className="footer-left">
            <h2>DormDrop</h2>
            <div className="footer-links">
              <Link to="/aboutUs" className="footer-link">
          Help
        </Link>
        <Link to="/aboutUs" className="footer-link">
          Contact
        </Link>
            </div>
          </div>

          <div className="footer-right">
            <p>
              Contact us:{" "}
              <a href="mailto:morsedgalib982@gmail.com">
                morsedgalib982@gmail.com
              </a>
            </p>
            <div className="footer-socials">
              <p>Follow us:</p>
              <a href="https://www.instagram.com/galib_morsed/">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/galib-morsed">
                <FaLinkedin />
              </a>
              <a href="https://github.com/GalibMorsed">
                <FaGithubSquare />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} DormDrop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
