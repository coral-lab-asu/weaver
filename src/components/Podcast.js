import React from 'react';
import { FiHeadphones } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Podcast.css';

const Podcast = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section id="podcast" className="podcast-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="podcast-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Paper Podcast</h2>
          </motion.div>

          <motion.div className="podcast-player-wrapper" variants={itemVariants}>
            <div className="podcast-card">
              <div className="podcast-header-info">
                <FiHeadphones className="podcast-icon" />
                <div>
                  <h3>Weaver Research Discussion</h3>
                  <p>Interweaving SQL and LLM for Table Reasoning</p>
                </div>
              </div>
              
              <div className="audio-container">
                <audio
                  controls
                  className="audio-player"
                  preload="metadata"
                >
                  <source src={`${process.env.PUBLIC_URL || ''}/podcast.m4a`} type="audio/mp4" />
                  <source src={`${process.env.PUBLIC_URL || ''}/podcast.m4a`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Podcast;

