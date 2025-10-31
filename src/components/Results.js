import React, { useState } from 'react';
import { FiCpu, FiZap, FiAward, FiBarChart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Results.css';

const Results = () => {
  const [activeDataset, setActiveDataset] = useState('wikitq');
  const [activeModel, setActiveModel] = useState('gpt4mini');
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
      name: 'WikiTQ',
      fullName: 'WikiTQ',
      description: 'Complex reasoning over Wikipedia tables',
      models: {
        gpt4mini: {
          name: 'GPT-4o-mini',
          shortName: 'GPT-4o-mini',
          bestAccuracy: '65.0%',
          results: [
            { method: 'End-to-End QA', accuracy: '60.4' },
            { method: 'Binder', accuracy: '24.0' },
            { method: 'BlendSQL', accuracy: '26.0' },
            { method: 'ReAcTable', accuracy: '29.9' },
            { method: 'H-STAR', accuracy: '59.0' },
            { method: 'ProTrix', accuracy: '61.4' },
            { method: 'Weaver (Ours)', accuracy: '65.0', isOurs: true }
          ]
        },
        gpt4: {
          name: 'GPT-4o',
          shortName: 'GPT-4o',
          bestAccuracy: '70.7%',
          results: [
            { method: 'End-to-End QA', accuracy: '66.4' },
            { method: 'Binder', accuracy: '27.3' },
            { method: 'BlendSQL', accuracy: '42.0' },
            { method: 'ReAcTable', accuracy: '45.4' },
            { method: 'H-STAR', accuracy: '61.0' },
            { method: 'ProTrix', accuracy: '61.7' },
            { method: 'Weaver (Ours)', accuracy: '70.7', isOurs: true }
          ]
        },
        gemini: {
          name: 'Gemini-2.0-Flash',
          shortName: 'Gemini',
          bestAccuracy: '69.6%',
          results: [
            { method: 'End-to-End QA', accuracy: '67.5' },
            { method: 'Binder', accuracy: '12.9' },
            { method: 'BlendSQL', accuracy: '31.1' },
            { method: 'ReAcTable', accuracy: '20.4' },
            { method: 'H-STAR', accuracy: '63.5' },
            { method: 'ProTrix', accuracy: '62.2' },
            { method: 'Weaver (Ours)', accuracy: '69.6', isOurs: true }
          ]
        },
        deepseek: {
          name: 'DeepSeek-R1-Distill-Llama-70B',
          shortName: 'DeepSeek',
          bestAccuracy: '73.0%',
          results: [
            { method: 'End-to-End QA', accuracy: '76.4' },
            { method: 'Binder', accuracy: '26.4' },
            { method: 'BlendSQL', accuracy: '32.2' },
            { method: 'ReAcTable', accuracy: '52.2' },
            { method: 'H-STAR', accuracy: '68.7' },
            { method: 'ProTrix', accuracy: '41.4' },
            { method: 'Weaver (Ours)', accuracy: '73.0', isOurs: true }
          ]
        }
      }
    },
    tabfact: {
      name: 'TabFact',
      fullName: 'TabFact',
      description: 'Fact verification over tables',
      models: {
        gpt4mini: {
          name: 'GPT-4o-mini',
          shortName: 'GPT-4o-mini',
          bestAccuracy: '89.4%',
          results: [
            { method: 'End-to-End QA', accuracy: '84.4' },
            { method: 'Binder', accuracy: '62.0' },
            { method: 'BlendSQL', accuracy: '68.5' },
            { method: 'ReAcTable', accuracy: '37.4' },
            { method: 'H-STAR', accuracy: '83.0' },
            { method: 'ProTrix', accuracy: '81.5' },
            { method: 'Weaver (Ours)', accuracy: '89.4', isOurs: true }
          ]
        },
        gpt4: {
          name: 'GPT-4o',
          shortName: 'GPT-4o',
          bestAccuracy: '83.4%',
          results: [
            { method: 'End-to-End QA', accuracy: '80.8' },
            { method: 'Binder', accuracy: '60.3' },
            { method: 'BlendSQL', accuracy: '68.3' },
            { method: 'ReAcTable', accuracy: '45.4' },
            { method: 'H-STAR', accuracy: '87.0' },
            { method: 'ProTrix', accuracy: '80.5' },
            { method: 'Weaver (Ours)', accuracy: '83.4', isOurs: true }
          ]
        },
        gemini: {
          name: 'Gemini-2.0-Flash',
          shortName: 'Gemini',
          bestAccuracy: '85.4%',
          results: [
            { method: 'End-to-End QA', accuracy: '81.8' },
            { method: 'Binder', accuracy: '60.4' },
            { method: 'BlendSQL', accuracy: '60.1' },
            { method: 'ReAcTable', accuracy: '37.6' },
            { method: 'H-STAR', accuracy: '86.1' },
            { method: 'ProTrix', accuracy: '80.8' },
            { method: 'Weaver (Ours)', accuracy: '85.4', isOurs: true }
          ]
        },
        deepseek: {
          name: 'DeepSeek-R1-Distill-Llama-70B',
          shortName: 'DeepSeek',
          bestAccuracy: '91.2%',
          results: [
            { method: 'End-to-End QA', accuracy: '82.5' },
            { method: 'Binder', accuracy: '62.7' },
            { method: 'BlendSQL', accuracy: '50.8' },
            { method: 'ReAcTable', accuracy: '45.6' },
            { method: 'H-STAR', accuracy: '55.6' },
            { method: 'ProTrix', accuracy: '81.1' },
            { method: 'Weaver (Ours)', accuracy: '91.2', isOurs: true }
          ]
        }
      }
    },
    finqa: {
      name: 'FinQA',
      fullName: 'FinQA',
      description: 'Financial reasoning with numerical tables',
      models: {
        gpt4mini: {
          name: 'GPT-4o-mini',
          shortName: 'GPT-4o-mini',
          bestAccuracy: '49.3%',
          results: [
            { method: 'End-to-End QA', accuracy: '44.7' },
            { method: 'Binder', accuracy: '13.0' },
            { method: 'BlendSQL', accuracy: '37.0' },
            { method: 'H-STAR', accuracy: '40.1' },
            { method: 'ProTrix', accuracy: '46.4' },
            { method: 'Weaver (Ours)', accuracy: '49.3', isOurs: true }
          ]
        },
        gpt4: {
          name: 'GPT-4o',
          shortName: 'GPT-4o',
          bestAccuracy: '60.8%',
          results: [
            { method: 'End-to-End QA', accuracy: '58.3' },
            { method: 'Binder', accuracy: '17.0' },
            { method: 'BlendSQL', accuracy: '34.3' },
            { method: 'H-STAR', accuracy: '46.0' },
            { method: 'ProTrix', accuracy: '54.3' },
            { method: 'Weaver (Ours)', accuracy: '60.8', isOurs: true }
          ]
        },
        gemini: {
          name: 'Gemini-2.0-Flash',
          shortName: 'Gemini',
          bestAccuracy: '44.5%',
          results: [
            { method: 'End-to-End QA', accuracy: '29.4' },
            { method: 'Binder', accuracy: '21.3' },
            { method: 'BlendSQL', accuracy: '19.7' },
            { method: 'H-STAR', accuracy: '38.7' },
            { method: 'ProTrix', accuracy: '42.9' },
            { method: 'Weaver (Ours)', accuracy: '44.5', isOurs: true }
          ]
        },
        deepseek: {
          name: 'DeepSeek-R1-Distill-Llama-70B',
          shortName: 'DeepSeek',
          bestAccuracy: '65.0%',
          results: [
            { method: 'End-to-End QA', accuracy: '52.4' },
            { method: 'Binder', accuracy: '24.4' },
            { method: 'BlendSQL', accuracy: '36.7' },
            { method: 'H-STAR', accuracy: '50.3' },
            { method: 'ProTrix', accuracy: '60.4' },
            { method: 'Weaver (Ours)', accuracy: '65.0', isOurs: true }
          ]
        }
      }
    }
  };

  const datasets = Object.keys(resultsData);
  const currentData = resultsData[activeDataset];
  const availableModels = currentData ? Object.keys(currentData.models) : [];
  const currentModelData = currentData?.models?.[activeModel];

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
                    onClick={() => {
                      setActiveDataset(dataset);
                      // Reset to first available model when switching datasets
                      const firstModel = Object.keys(resultsData[dataset].models)[0];
                      setActiveModel(firstModel);
                    }}
                  >
                    {resultsData[dataset].name}<sub>hybrid</sub>
                  </button>
                ))}
              </div>
            </div>

            {currentModelData && (
              <div className="model-selector">
                <h4>Select Model</h4>
                <div className="model-tabs">
                  {availableModels.map((modelKey) => (
                    <button
                      key={modelKey}
                      className={`model-tab ${activeModel === modelKey ? 'active' : ''}`}
                      onClick={() => setActiveModel(modelKey)}
                    >
                      {currentData.models[modelKey].shortName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="results-visualization">
              <div className="dataset-info">
                <h4>{currentData?.name}<sub>hybrid</sub></h4>
                <p>{currentData?.description}</p>
                {currentModelData && (
                  <div className="best-result">
                    <FiAward className="award-icon" />
                    <span>Best: {currentModelData.bestAccuracy} ({currentModelData.name})</span>
                  </div>
                )}
              </div>

              {currentModelData && (
                <div className="results-chart">
                  <div className="chart-header">
                    <h5>Accuracy Comparison (%)</h5>
                    <span className="chart-subtitle">Higher is better • {currentModelData.name}</span>
                  </div>
                  <div className="chart-bars">
                    {currentModelData.results
                      .sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy))
                      .map((result, index) => {
                        const maxAccuracy = Math.max(...currentModelData.results.map(r => parseFloat(r.accuracy)));
                        const width = maxAccuracy > 0 ? (parseFloat(result.accuracy) / maxAccuracy) * 100 : 0;
                        
                        return (
                          <motion.div
                            key={`${result.method}-${index}`}
                            className={`chart-bar ${result.isOurs ? 'our-method' : ''}`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          >
                            <div className="bar-info">
                              <span className="method-name">{result.method}</span>
                              <span className="method-model">{currentModelData.shortName}</span>
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
              )}
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
