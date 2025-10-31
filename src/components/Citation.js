import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Citation.css';

const Citation = () => {
  const [copied, setCopied] = useState(false);
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

  const bibtexCitation = `@article{khoja2025weaver,
  title={Weaver: Interweaving SQL and LLM for Table Reasoning},
  author={Khoja, Rohit and Gupta, Devanshu and Fu, Yanjie and Roth, Dan and Gupta, Vivek},
  journal={arXiv preprint arXiv:2505.18961},
  year={2025}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const authors = [
    {
      name: 'Rohit Khoja',
      affiliation: 'Arizona State University',
      role: 'Equal contribution',
      email: 'rkhoja2@asu.edu'
    },
    {
      name: 'Devanshu Gupta',
      affiliation: 'Arizona State University',
      role: 'Equal contribution',
      email: 'dgupta77@asu.edu'
    },
    {
      name: 'Yanjie Fu',
      affiliation: 'Arizona State University',
      role: 'Co-advisor',
      email: 'yanjiefu@asu.edu'
    },
    {
      name: 'Dan Roth',
      affiliation: 'University of Pennsylvania',
      role: 'Co-advisor',
      email: 'danroth@seas.upenn.edu'
    },
    {
      name: 'Vivek Gupta',
      affiliation: 'Arizona State University',
      role: 'Primary supervisor',
      email: 'vgupt140@asu.edu'
    }
  ];

  return (
    <section id="citation" className="citation-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="citation-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Citation & Acknowledgments</h2>
            <p className="section-subtitle">
              If you use Weaver in your research, please cite our paper
            </p>
          </motion.div>

          <motion.div className="citation-main" variants={itemVariants}>
            <div className="citation-card">
              <div className="citation-header">
                <div className="citation-info">
                  <h3>BibTeX Citation</h3>
                  <p>Copy and paste this citation into your bibliography</p>
                </div>
                <button
                  className="copy-citation-btn"
                  onClick={copyToClipboard}
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="citation-code">
                <SyntaxHighlighter
                  language="bibtex"
                  style={prism}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--tertiary-bg)'
                  }}
                >
                  {bibtexCitation}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>

          <motion.div className="authors-section" variants={itemVariants}>
            <h3>Authors</h3>
            <div className="authors-grid">
              {authors.map((author, index) => (
                <div key={index} className="author-card">
                  <div className="author-info">
                    <h4>{author.name}</h4>
                    <p className="author-affiliation">{author.affiliation}</p>
                    <p className="author-role">{author.role}</p>
                  </div>
                  <div className="author-contact">
                    <a href={`mailto:${author.email}`} className="author-email">
                      {author.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* <motion.div className="acknowledgments-section" variants={itemVariants}>
            <h3>Acknowledgments</h3>
            <p className="acknowledgments-intro">
              This work was inspired by and builds upon several important contributions in the field:
            </p>
            <div className="acknowledgments-grid">
              {acknowledgments.map((ack, index) => (
                <div key={index} className="acknowledgment-card">
                  <h4>{ack.title}</h4>
                  <p className="ack-description">{ack.description}</p>
                  <p className="ack-contribution">{ack.contribution}</p>
                </div>
              ))}
            </div>
          </motion.div>

           <motion.div className="funding-section" variants={itemVariants}>
            <h3>Funding & Support</h3>
            <div className="funding-info">
              <div className="funding-item">
                <h4>Dr. Dan Roth</h4>
                <p>Supported by the ONR-LtRD, and ONR-MSU grants</p>
              </div>
              <div className="funding-item">
                <h4>Dr. Yanjie Fu</h4>
                <p>
                  Supported by the National Science Foundation (NSF) via grant numbers: 
                  2426340, 2416727, 2421864, 2421865, 2421803, and National Academy of 
                  Engineering Grainger Foundation Frontiers of Engineering Grants
                </p>
              </div>
            </div>
            <div className="institutions">
              <h4>Institutional Support</h4>
              <p>
                We gratefully acknowledge the Cognitive Computation Group at the University of 
                Pennsylvania and the Complex Data Analysis and Reasoning Lab at Arizona State 
                University for their resources and computational support.
              </p>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Citation;
