import React from 'react';
import { FiFileText, FiExternalLink, FiDatabase, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Abstract.css';

const Abstract = () => {
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
    <section id="abstract" className="abstract-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="abstract-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Abstract</h2>
            <p className="section-subtitle">
              Bridging structured and unstructured reasoning for complex table understanding
            </p>
          </motion.div>

          <motion.div className="abstract-main" variants={itemVariants}>
            <div className="abstract-text">
              <p>
                Querying tables with unstructured data is challenging due to the presence of text 
                (or image), either embedded in the table or in external paragraphs, which traditional 
                SQL struggles to process, especially for tasks requiring semantic reasoning. While 
                Large Language Models (LLMs) excel at understanding context, they face limitations 
                with long input sequences.
              </p>
              <p>
                Existing approaches that combine SQL and LLM typically rely on rigid, predefined 
                workflows, limiting their adaptability to complex queries. To address these issues, 
                we introduce <strong>Weaver</strong>, a modular pipeline that dynamically integrates 
                SQL and LLM for table-based question answering (Table QA).
              </p>
              <p>
                Weaver generates a flexible, step-by-step plan that combines SQL for structured 
                data retrieval with LLMs for semantic processing. By decomposing complex queries 
                into manageable subtasks, Weaver improves accuracy and generalization. Our experiments 
                show that Weaver consistently outperforms state-of-the-art methods across four 
                Table QA datasets, reducing both API calls and error rates.
              </p>
            </div>

            <div className="abstract-highlights">
              <div className="highlight-item">
                <div className="highlight-icon sql-highlight">
                  <FiDatabase />
                </div>
                <div className="highlight-content">
                  <h4>SQL Operations</h4>
                  <p>Efficient structured data filtering, aggregation, and manipulation</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon llm-highlight">
                  <FiCpu />
                </div>
                <div className="highlight-content">
                  <h4>LLM Reasoning</h4>
                  <p>Semantic inference, entity extraction, and contextual understanding</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="key-contributions" variants={itemVariants}>
            <h3 className="contributions-title">Key Contributions</h3>
            <div className="contributions-grid">
              <div className="contribution-item">
                <div className="contribution-number">01</div>
                <div className="contribution-content">
                  <h4>Modular Framework</h4>
                  <p>
                    A interpretable framework for hybrid query execution that dynamically 
                    decomposes complex queries into modality-specific steps without manual effort.
                  </p>
                </div>
              </div>

              <div className="contribution-item">
                <div className="contribution-number">02</div>
                <div className="contribution-content">
                  <h4>Superior Performance</h4>
                  <p>
                    Extensive experiments on multiple hybrid QA benchmarks show large performance 
                    gains, particularly on complex, multi-hop reasoning queries.
                  </p>
                </div>
              </div>

              <div className="contribution-item">
                <div className="contribution-number">03</div>
                <div className="contribution-content">
                  <h4>Query Optimization</h4>
                  <p>
                    A query plan optimization strategy that improves execution efficiency with 
                    minimal accuracy loss while enabling transparent debugging.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="abstract-actions" variants={itemVariants}>
            <a
              href="https://arxiv.org/abs/2505.18961"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FiFileText />
              Read Full Paper
              <FiExternalLink className="external-icon" />
            </a>
            <a
              href="https://arxiv.org/pdf/2505.18961.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FiFileText />
              Download PDF
              <FiExternalLink className="external-icon" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Abstract;
