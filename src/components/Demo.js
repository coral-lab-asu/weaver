import React, { useState } from 'react';
import { FiPlay, FiDatabase, FiCpu, FiClock, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Demo.css';

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const demoExamples = [
    {
      id: 'racing',
      title: 'Racing Competition Analysis',
      question: 'Which country had the most competitors?',
      table: {
        name: '1990 British Grand Prix',
        headers: ['Rank', 'Driver', 'Constructor', 'Laps', 'Time/Retired'],
        rows: [
          ['1', 'Alain Prost', 'Ferrari', '64', '1:18:31'],
          ['2', 'Thierry Boutsen', 'Williams-Renault', '64', '39.092'],
          ['3', 'Ayrton Senna', 'McLaren-Honda', '64', '43.068'],
          ['4', 'Eric Bernard', 'Lola-Lamborghini', '64', '40:03:00']
        ]
      },
      executionPlan: [
        {
          type: 'sql',
          title: 'Extract unique drivers',
          description: 'CREATE TABLE unique_drivers AS SELECT DISTINCT Driver FROM racing_table',
          result: 'Created table with 4 unique drivers'
        },
        {
          type: 'llm',
          title: 'Infer countries from driver names',
          description: 'Add country column by inferring from driver names using LLM knowledge',
          result: 'Added country column: [France, Belgium, Brazil, France]'
        },
        {
          type: 'sql',
          title: 'Count competitors by country',
          description: 'SELECT country, COUNT(*) as competitors FROM unique_drivers GROUP BY country',
          result: 'France: 2, Belgium: 1, Brazil: 1'
        }
      ],
      answer: 'France',
      reasoning: 'France had the most competitors with 2 drivers (Alain Prost and Eric Bernard)'
    }
  ];

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    const steps = demoExamples[activeDemo].executionPlan;
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRunning(false);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };

  const currentDemo = demoExamples[activeDemo];

  return (
    <section id="demo" className="demo-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="demo-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Interactive Demo</h2>
            <p className="section-subtitle">
              See Weaver in action with real table reasoning examples
            </p>
          </motion.div>

          <motion.div className="demo-selector" variants={itemVariants}>
            <div className="demo-tabs">
              {demoExamples.map((demo, index) => (
                <button
                  key={demo.id}
                  className={`demo-tab ${activeDemo === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDemo(index);
                    resetDemo();
                  }}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div className="demo-workspace" variants={itemVariants}>
            <div className="demo-input">
              <div className="input-section">
                <h3>Input Table: {currentDemo.table.name}</h3>
                <div className="table-container">
                  <table className="demo-table">
                    <thead>
                      <tr>
                        {currentDemo.table.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentDemo.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="question-section">
                <h3>Question</h3>
                <div className="question-box">
                  <p>"{currentDemo.question}"</p>
                </div>
                <div className="demo-controls">
                  <button
                    className="btn btn-primary demo-btn"
                    onClick={runDemo}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <FiRefreshCw className="spinning" />
                        Running...
                      </>
                    ) : (
                      <>
                        <FiPlay />
                        Run Demo
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-secondary demo-btn"
                    onClick={resetDemo}
                    disabled={isRunning}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="demo-execution">
              <h3>Execution Plan</h3>
              <div className="execution-steps">
                {currentDemo.executionPlan.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`execution-step ${step.type} ${
                      currentStep > index ? 'completed' : ''
                    } ${currentStep === index + 1 ? 'active' : ''}`}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{
                      opacity: currentStep > index ? 1 : 0.7,
                      scale: currentStep === index + 1 ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="step-header">
                      <div className="step-indicator">
                        <div className="step-icon">
                          {step.type === 'sql' ? <FiDatabase /> : <FiCpu />}
                        </div>
                        <span className="step-number">{index + 1}</span>
                      </div>
                      <div className="step-info">
                        <h4>{step.title}</h4>
                        <p className="step-type">{step.type.toUpperCase()} Operation</p>
                      </div>
                      <div className="step-status">
                        {currentStep > index && (
                          <FiCheckCircle className="completed-icon" />
                        )}
                        {currentStep === index + 1 && isRunning && (
                          <FiClock className="running-icon" />
                        )}
                      </div>
                    </div>
                    <div className="step-content">
                      <div className="step-description">
                        <code>{step.description}</code>
                      </div>
                      <AnimatePresence>
                        {currentStep > index && (
                          <motion.div
                            className="step-result"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <strong>Result:</strong> {step.result}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {currentStep > currentDemo.executionPlan.length && !isRunning && (
                  <motion.div
                    className="demo-result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="result-header">
                      <FiCheckCircle className="result-icon" />
                      <h3>Final Answer</h3>
                    </div>
                    <div className="result-answer">
                      <strong>{currentDemo.answer}</strong>
                    </div>
                    <div className="result-reasoning">
                      <p>{currentDemo.reasoning}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
