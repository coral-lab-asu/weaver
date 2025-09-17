import React from 'react';
import { FiGithub, FiFileText, FiPlay, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const scrollToDemo = () => {
    const element = document.querySelector('#demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-particles"></div>
      </div>
      
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <FiAward className="badge-icon" />
            <span>Accepted at EMNLP 2025</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-main">Weaver</span>
            <span className="title-subtitle">Interweaving SQL and LLM for Table Reasoning</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            A modular pipeline that dynamically combines SQL and Large Language Models (LLMs) 
            for advanced table-based question answering. Unlike rigid approaches, Weaver generates 
            flexible execution plans that use SQL for structured data operations and LLMs for 
            semantic reasoning.
          </motion.p>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat-item">
              <div className="stat-number text-gradient">4</div>
              <div className="stat-label">Datasets</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient">91.2%</div>
              <div className="stat-label">Best Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient">5.4</div>
              <div className="stat-label">Avg API Calls</div>
            </div>
          </motion.div>

          <motion.div className="hero-authors" variants={itemVariants}>
            <div className="authors-list">
              <span className="author-name">Rohit Khoja<sup>1*</sup></span>
              <span className="author-name">Devanshu Gupta<sup>1*</sup></span>
              <span className="author-name">Yanjie Fu<sup>1</sup></span>
              <span className="author-name">Dan Roth<sup>2</sup></span>
              <span className="author-name">Vivek Gupta<sup>1†</sup></span>
            </div>
            <div className="affiliations">
              <span className="affiliation"><sup>1</sup>Arizona State University</span>
              <span className="affiliation"><sup>2</sup>University of Pennsylvania</span>
            </div>
            <div className="author-note">
              <sup>*</sup>Equal contribution • <sup>†</sup>Primary supervisor
            </div>
          </motion.div>

          <motion.div className="hero-actions" variants={itemVariants}>
            <a
              href="https://arxiv.org/abs/2505.18961"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero-btn"
            >
              <FiFileText />
              Read Paper
            </a>
            <a
              href="https://github.com/rohitkhoja/weaver"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-btn"
            >
              <FiGithub />
              View Code
            </a>
            <button
              onClick={scrollToDemo}
              className="btn btn-secondary hero-btn"
            >
              <FiPlay />
              Try Demo
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="visual-container">
            <div className="weaver-pipeline">
              {/* Input Stage */}
              <div className="pipeline-stage input-stage">
                <div className="input-box">
                  <div className="input-label">Table</div>
                  <div className="input-connector">+</div>
                  <div className="input-label">Question</div>
                </div>
              </div>

              <div className="flow-arrow">→</div>

              {/* Weaving Stage */}
              <div className="pipeline-stage weaving-stage">
                <div className="weaver-box">
                  <div className="weaver-title">Weaver</div>
                  <div className="weave-pattern">
                    <div className="weave-container">
                      <div className="thread sql-thread">
                        <div className="thread-segment segment-1"></div>
                        <div className="thread-segment segment-2"></div>
                        <div className="thread-segment segment-3"></div>
                        <div className="thread-segment segment-4"></div>
                        <span className="thread-label">SQL</span>
                      </div>
                      <div className="thread llm-thread">
                        <div className="thread-segment segment-1"></div>
                        <div className="thread-segment segment-2"></div>
                        <div className="thread-segment segment-3"></div>
                        <div className="thread-segment segment-4"></div>
                        <span className="thread-label">LLM</span>
                      </div>
                    </div>
                  </div>
                  <div className="weaver-subtitle">Dynamic Planning & Execution</div>
                </div>
              </div>

              <div className="flow-arrow">→</div>

              {/* Output Stage */}
              <div className="pipeline-stage output-stage">
                <div className="output-box">
                  <div className="output-label">Final Answer</div>
                  <div className="output-shine"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
