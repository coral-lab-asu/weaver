import React from 'react';
import { FiGithub, FiFileText, FiMail, FiExternalLink, FiHeart, FiImage } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Paper', href: 'https://arxiv.org/abs/2505.18961', external: true },
    { label: 'Code', href: 'https://github.com/rohitkhoja/weaver', external: true },
    { label: 'Documentation', href: 'https://github.com/rohitkhoja/weaver#readme', external: true },
    { label: 'Issues', href: 'https://github.com/rohitkhoja/weaver/issues', external: true }
  ];

  const authors = [
    { name: 'Rohit Khoja', email: 'rkhoja2@asu.edu' },
    { name: 'Devanshu Gupta', email: 'dgupta77@asu.edu' },
    { name: 'Vivek Gupta', email: 'vgupt140@asu.edu' }
  ];

  const institutions = [
    { name: 'Arizona State University', url: 'https://www.asu.edu/' },
    { name: 'University of Pennsylvania', url: 'https://www.upenn.edu/' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section footer-brand">
              <div className="brand-info">
                <h3 className="brand-title">Weaver</h3>
                <p className="brand-subtitle">Interweaving SQL and LLM for Table Reasoning</p>
                <p className="brand-description">
                  A modular pipeline that dynamically combines SQL and Large Language Models 
                  for advanced table-based question answering.
                </p>
              </div>
              
              <div className="footer-actions">
                <a
                  href="https://arxiv.org/abs/2505.18961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn primary"
                >
                  <FiFileText />
                  Read Paper
                  <FiExternalLink className="external-icon" />
                </a>
                <a
                  href={`${process.env.PUBLIC_URL || ''}/poster.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn secondary"
                >
                  <FiImage />
                  Poster
                  <FiExternalLink className="external-icon" />
                </a>
                <a
                  href="https://github.com/rohitkhoja/weaver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn secondary"
                >
                  <FiGithub />
                  View Code
                  <FiExternalLink className="external-icon" />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.external || link.href.startsWith('/') ? "_blank" : "_self"}
                      rel={link.external || link.href.startsWith('/') ? "noopener noreferrer" : ""}
                      className="footer-link"
                    >
                      {link.label}
                      {(link.external || link.href.startsWith('/')) && <FiExternalLink className="link-icon" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Contact</h4>
              <ul className="footer-links">
                {authors.map((author, index) => (
                  <li key={index}>
                    <a
                      href={`mailto:${author.email}`}
                      className="footer-link contact-link"
                    >
                      <FiMail className="contact-icon" />
                      {author.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Institutions</h4>
              <ul className="footer-links">
                {institutions.map((institution, index) => (
                  <li key={index}>
                    <a
                      href={institution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {institution.name}
                      <FiExternalLink className="link-icon" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} Weaver Research Team. Licensed under MIT License.
              </p>
              <p className="conference-info">
                Accepted at EMNLP 2025
              </p>
            </div>

            <div className="footer-meta">
              <div className="meta-item">
                <span>Made with</span>
                <FiHeart className="heart-icon" />
                <span>for the research community</span>
              </div>
              <div className="meta-item">
                <span>ArXiv:</span>
                <a
                  href="https://arxiv.org/abs/2505.18961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arxiv-link"
                >
                  2505.18961
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
