import React, { useState } from 'react';
import { FiDatabase, FiCpu, FiSettings, FiArrowRight, FiZap, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Architecture.css';

const Architecture = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  const architectureSteps = [
    {
      id: 'preprocessing',
      title: 'Pre-processing',
      icon: FiSettings,
      description: 'Table preprocessing and column filtering',
      details: [
        'Rename columns conflicting with SQL reserved words',
        'Remove special characters and standardize names',
        'Extract relevant columns using LLM',
        'Generate descriptive metadata for columns'
      ],
      color: 'var(--orange-accent)'
    },
    {
      id: 'planning',
      title: 'Planning',
      icon: FiCpu,
      description: 'Dynamic step-by-step plan generation',
      details: [
        'LLM generates execution plan using few-shot prompting',
        'Sequential subtasks categorized as SQL or LLM operations',
        'Plan verification using secondary LLM',
      ],
      color: 'var(--purple-accent)'
    },
    {
      id: 'execution',
      title: 'Code Execution',
      icon: FiZap,
      description: 'Sequential execution of SQL and LLM steps',
      details: [
        'SQL operations: filtering, aggregating, grouping',
        'LLM operations: semantic inference, column generation',
        'Intermediate table storage at each stage',
        'Robust fallback mechanisms'
      ],
      color: 'var(--blue-accent)'
    },
    {
      id: 'extraction',
      title: 'Answer Extraction',
      icon: FiCheckCircle,
      description: 'Final answer generation and formatting',
      details: [
        'LLM processes intermediate table and query',
        'Generates natural language answer',
        'Few-shot learning for output consistency',
        'Format validation and error correction'
      ],
      color: 'var(--success-text)'
    }
  ];

  const pipelineFlow = [
    { type: 'input', label: 'Table + Question', color: 'var(--cyan-accent)' },
    { type: 'step', label: 'Pre-processing', color: 'var(--orange-accent)' },
    { type: 'step', label: 'Planning', color: 'var(--purple-accent)' },
    { type: 'step', label: 'Execution', color: 'var(--blue-accent)' },
    { type: 'output', label: 'Final Answer', color: 'var(--success-text)' }
  ];

  return (
    <section id="architecture" className="architecture-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="architecture-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">System Architecture</h2>
            <p className="section-subtitle">
              A modular pipeline that intelligently combines SQL and LLM operations
            </p>
          </motion.div>

          <motion.div className="pipeline-overview" variants={itemVariants}>
            <div className="pipeline-flow">
              {pipelineFlow.map((item, index) => (
                <React.Fragment key={item.label}>
                  <div 
                    className={`pipeline-node ${item.type}`}
                    style={{ '--node-color': item.color }}
                  >
                    <div className="node-content">
                      <span>{item.label}</span>
                    </div>
                  </div>
                  {index < pipelineFlow.length - 1 && (
                    <FiArrowRight className="pipeline-arrow" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div className="architecture-details" variants={itemVariants}>
            <div className="steps-navigation">
              {architectureSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`step-nav-item ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ '--step-color': step.color }}
                >
                  <step.icon className="step-nav-icon" />
                  <div className="step-nav-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="step-details">
              <motion.div
                key={activeStep}
                className="step-detail-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                  <div 
                    className="step-icon-large"
                    style={{ '--step-color': architectureSteps[activeStep].color }}
                  >
                    {React.createElement(architectureSteps[activeStep].icon)}
                  </div>
                  <div>
                    <h3>{architectureSteps[activeStep].title}</h3>
                    <p>{architectureSteps[activeStep].description}</p>
                  </div>
                </div>

                <div className="step-features">
                  <h4>Key Features:</h4>
                  <ul className="features-list">
                    {architectureSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="architecture-advantages" variants={itemVariants}>
            <h3 className="advantages-title">Why This Architecture?</h3>
            <div className="advantages-grid">
              <div className="advantage-item">
                <div className="advantage-icon modular">
                  <FiSettings />
                </div>
                <h4>Modular Design</h4>
                <p>Each component can be upgraded independently, allowing for easy integration of specialized agents and models.</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-icon interpretable">
                  <FiCpu />
                </div>
                <h4>Interpretable</h4>
                <p>Step-by-step execution provides transparency and enables effective debugging.</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-icon efficient">
                  <FiDatabase />
                </div>
                <h4>Efficient</h4>
                <p>Dynamic planning minimizes unnecessary operations while optimization strategies reduce computational overhead.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
