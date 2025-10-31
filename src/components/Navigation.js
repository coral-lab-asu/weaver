import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiFileText, FiExternalLink, FiImage, FiSliders } from 'react-icons/fi';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Abstract', href: '#abstract' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Demo', href: '#demo' },
    { label: 'Results', href: '#results' },
    { label: 'Citation', href: '#citation' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Weaver</span>
          <span className="logo-subtitle">SQL + LLM</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <a
            href="https://arxiv.org/abs/2505.18961"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary nav-btn"
          >
            <FiFileText />
            Paper
          </a>
          <a
            href={`${process.env.PUBLIC_URL || ''}/poster.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary nav-btn"
          >
            <FiImage />
            Poster
          </a>
          <a
            href={`${process.env.PUBLIC_URL || ''}/presentation.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary nav-btn"
          >
            <FiSliders />
            Slides
          </a>
          <a
            href="https://github.com/rohitkhoja/weaver"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-btn"
          >
            <FiGithub />
            Code
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="mobile-nav-link"
              >
                {item.label}
              </button>
            ))}
            <div className="mobile-actions">
              <a
                href="https://arxiv.org/abs/2505.18961"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiFileText />
                Paper
                <FiExternalLink className="external-icon" />
              </a>
              <a
                href={`${process.env.PUBLIC_URL || ''}/poster.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiImage />
                Poster
                <FiExternalLink className="external-icon" />
              </a>
              <a
                href={`${process.env.PUBLIC_URL || ''}/presentation.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiSliders />
                Slides
                <FiExternalLink className="external-icon" />
              </a>
              <a
                href="https://github.com/rohitkhoja/weaver"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiGithub />
                Code
                <FiExternalLink className="external-icon" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
