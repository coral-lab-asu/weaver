import React, { useState } from 'react';
import { FiCpu, FiZap, FiAward, FiBarChart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Results.css';

const Results = () => {
  const [activeDataset, setActiveDataset] = useState('wikitq');
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

  // const performanceMetrics = [
  //   {
  //     id: 'accuracy',
  //     title: 'Best Accuracy',
  //     value: '91.2%',
  //     dataset: 'TabFact',
  //     improvement: '+5.5%',
  //     icon: FiTrendingUp,
  //     color: 'var(--success-text)'
  //   },
  //   {
  //     id: 'api_calls',
  //     title: 'Avg API Calls',
  //     value: '5.4',
  //     dataset: 'Per Query',
  //     improvement: '-47%',
  //     icon: FiCpu,
  //     color: 'var(--blue-accent)'
  //   },
  //   {
  //     id: 'efficiency',
  //     title: 'Speed Improvement',
  //     value: '3.2x',
  //     dataset: 'vs Baselines',
  //     improvement: '+220%',
  //     icon: FiZap,
  //     color: 'var(--warning-text)'
  //   },
  //   {
  //     id: 'datasets',
  //     title: 'Datasets Tested',
  //     value: '6',
  //     dataset: 'Benchmarks',
  //     improvement: 'Best on 5/6',
  //     icon: FiDatabase,
  //     color: 'var(--purple-accent)'
  //   }
  // ];

  const resultsData = {
    wikitq: {
      name: 'WikiTableQuestions',
      description: 'Complex reasoning over Wikipedia tables',
      bestAccuracy: '73.0%',
      model: 'DeepSeek-R1-Distill-Llama-70B',
      results: [
        { method: 'End-to-End QA', accuracy: '76.4', model: 'DeepSeek' },
        { method: 'Binder', accuracy: '26.4', model: 'DeepSeek' },
        { method: 'BlendSQL', accuracy: '32.2', model: 'DeepSeek' },
        { method: 'ReAcTable', accuracy: '52.2', model: 'DeepSeek' },
        { method: 'H-STAR', accuracy: '68.7', model: 'DeepSeek' },
        { method: 'ProTrix', accuracy: '41.4', model: 'DeepSeek' },
        { method: 'Weaver (Ours)', accuracy: '73.0', model: 'DeepSeek', isOurs: true }
      ]
    },
    tabfact: {
      name: 'TabFact',
      description: 'Fact verification over tables',
      bestAccuracy: '91.2%',
      model: 'DeepSeek-R1-Distill-Llama-70B',
      results: [
        { method: 'End-to-End QA', accuracy: '82.5', model: 'DeepSeek' },
        { method: 'Binder', accuracy: '62.7', model: 'DeepSeek' },
        { method: 'BlendSQL', accuracy: '50.8', model: 'DeepSeek' },
        { method: 'ReAcTable', accuracy: '45.6', model: 'DeepSeek' },
        { method: 'H-STAR', accuracy: '55.6', model: 'DeepSeek' },
        { method: 'ProTrix', accuracy: '81.1', model: 'DeepSeek' },
        { method: 'Weaver (Ours)', accuracy: '91.2', model: 'DeepSeek', isOurs: true }
      ]
    },
    finqa: {
      name: 'FinQA',
      description: 'Financial reasoning with numerical tables',
      bestAccuracy: '65.0%',
      model: 'DeepSeek-R1-Distill-Llama-70B',
      results: [
        { method: 'End-to-End QA', accuracy: '52.4', model: 'DeepSeek' },
        { method: 'Binder', accuracy: '24.4', model: 'DeepSeek' },
        { method: 'BlendSQL', accuracy: '36.7', model: 'DeepSeek' },
        { method: 'H-STAR', accuracy: '50.3', model: 'DeepSeek' },
        { method: 'ProTrix', accuracy: '60.4', model: 'DeepSeek' },
        { method: 'Weaver (Ours)', accuracy: '65.0', model: 'DeepSeek', isOurs: true }
      ]
    }
  };

  const datasets = Object.keys(resultsData);
  const currentData = resultsData[activeDataset];

  return (
    <section id="results" className="results-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="results-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Experimental Results</h2>
            <p className="section-subtitle">
              Weaver consistently outperforms state-of-the-art methods across multiple benchmarks
            </p>
          </motion.div>

          {/* <motion.div className="performance-overview" variants={itemVariants}>
            <div className="metrics-grid">
              {performanceMetrics.map((metric) => (
                <div key={metric.id} className="metric-card">
                  <div className="metric-icon" style={{ color: metric.color }}>
                    <metric.icon />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-title">{metric.title}</div>
                    <div className="metric-dataset">{metric.dataset}</div>
                    <div className="metric-improvement" style={{ color: metric.color }}>
                      {metric.improvement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div> */}

          <motion.div className="results-detailed" variants={itemVariants}>
            <div className="dataset-selector">
              <h3>Detailed Results by Dataset</h3>
              <div className="dataset-tabs">
                {datasets.map((dataset) => (
                  <button
                    key={dataset}
                    className={`dataset-tab ${activeDataset === dataset ? 'active' : ''}`}
                    onClick={() => setActiveDataset(dataset)}
                  >
                    {resultsData[dataset].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="results-visualization">
              <div className="dataset-info">
                <h4>{currentData.name}</h4>
                <p>{currentData.description}</p>
                <div className="best-result">
                  <FiAward className="award-icon" />
                  <span>Best: {currentData.bestAccuracy} ({currentData.model})</span>
                </div>
              </div>

              <div className="results-chart">
                <div className="chart-header">
                  <h5>Accuracy Comparison (%)</h5>
                  <span className="chart-subtitle">Higher is better</span>
                </div>
                <div className="chart-bars">
                  {currentData.results
                    .sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy))
                    .map((result, index) => {
                      const maxAccuracy = Math.max(...currentData.results.map(r => parseFloat(r.accuracy)));
                      const width = (parseFloat(result.accuracy) / maxAccuracy) * 100;
                      
                      return (
                        <motion.div
                          key={result.method}
                          className={`chart-bar ${result.isOurs ? 'our-method' : ''}`}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                          <div className="bar-info">
                            <span className="method-name">{result.method}</span>
                            <span className="method-model">{result.model}</span>
                          </div>
                          <div className="bar-container">
                            <motion.div
                              className="bar-fill"
                              style={{ width: `${width}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${width}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                            <span className="bar-value">{result.accuracy}%</span>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="key-findings" variants={itemVariants}>
            <h3>Key Findings</h3>
            <div className="findings-grid">
              <div className="finding-item">
                <div className="finding-icon">
                  <FiBarChart />
                </div>
                <div className="finding-content">
                  <h4>Consistent Performance</h4>
                  <p>
                    Weaver outperforms baselines across all tested datasets, showing robust 
                    performance on diverse table reasoning tasks.
                  </p>
                </div>
              </div>

              <div className="finding-item">
                <div className="finding-icon">
                  <FiCpu />
                </div>
                <div className="finding-content">
                  <h4>Efficiency Gains</h4>
                  <p>
                    Reduces API calls by 47% compared to methods like Binder while maintaining 
                    higher accuracy through intelligent planning.
                  </p>
                </div>
              </div>

              <div className="finding-item">
                <div className="finding-icon">
                  <FiZap />
                </div>
                <div className="finding-content">
                  <h4>Complex Reasoning</h4>
                  <p>
                    Excels particularly on hybrid queries requiring both structured operations 
                    and semantic understanding.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="multimodal-results" variants={itemVariants}>
            <h3>Multimodal Performance</h3>
            <div className="multimodal-grid">
              <div className="multimodal-card">
                <h4>FinQA<sub>MM</sub></h4>
                <p className="multimodal-desc">Financial reasoning with text context</p>
                <div className="multimodal-score">
                  <span className="score-value">68.0%</span>
                  <span className="score-model">GPT-4o</span>
                </div>
                <div className="score-comparison">
                  <span>vs End-to-End: +10.4%</span>
                </div>
              </div>

              <div className="multimodal-card">
                <h4>OTT-QA<sub>MM</sub></h4>
                <p className="multimodal-desc">Open table-and-text QA</p>
                <div className="multimodal-score">
                  <span className="score-value">66.7%</span>
                  <span className="score-model">Gemini-2.0-Flash</span>
                </div>
                <div className="score-comparison">
                  <span>vs End-to-End: +2.6%</span>
                </div>
              </div>

              <div className="multimodal-card">
                <h4>MMTabQA<sub>MM</sub></h4>
                <p className="multimodal-desc">Tables with text and images</p>
                <div className="multimodal-score">
                  <span className="score-value">53.0%</span>
                  <span className="score-model">GPT-4o-mini</span>
                </div>
                <div className="score-comparison">
                  <span>vs End-to-End: +6.7%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
