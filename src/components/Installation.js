import React, { useState } from 'react';
import { FiDownload, FiTerminal, FiCopy, FiCheck, FiGithub, FiSettings, FiDatabase, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Installation.css';

const Installation = () => {
  const [copiedStep, setCopiedStep] = useState(null);
  const [activeTab, setActiveTab] = useState('quickstart');
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

  const copyToClipboard = (text, stepId) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const installationSteps = [
    {
      id: 'clone',
      title: '1. Clone Repository',
      code: 'git clone https://github.com/rohitkhoja/weaver.git\ncd weaver',
      description: 'Download the Weaver repository from GitHub'
    },
    {
      id: 'install-deps',
      title: '2. Install Dependencies',
      code: 'pip install -r requirements.txt',
      description: 'Install all required Python packages'
    },
    {
      id: 'install-package',
      title: '3. Install Weaver',
      code: 'pip install -e .',
      description: 'Install Weaver in development mode'
    },
    {
      id: 'setup-env',
      title: '4. Setup Environment',
      code: 'cp .env.example .env\n# Edit .env file with your configuration',
      description: 'Copy and configure environment variables'
    }
  ];

  const configurationExample = `# 🔑 REQUIRED: LLM API Key (choose one provider)
OPENAI_API_KEY=your-openai-api-key-here

# 🎯 REQUIRED: LLM Model (LiteLLM format: provider/model)
LLM_MODEL=openai/gpt-4o-mini

# 📁 REQUIRED: Dataset Directory
WEAVER_DATASETS_DIR=./datasets

# 🗄️ REQUIRED: Database Configuration (MySQL recommended)
WEAVER_DB_TYPE=mysql
WEAVER_DB_HOST=localhost
WEAVER_DB_PORT=3306
WEAVER_DB_NAME=weaver_db
WEAVER_DB_USER=root
WEAVER_DB_PASSWORD=your-mysql-password

# 📊 Optional: Logging Level
WEAVER_LOG_LEVEL=INFO`;

  const usageExample = `from weaver import TableQA, WeaverConfig

# Initialize with environment configuration
config = WeaverConfig.from_env()
qa = TableQA(config)

# Ask a question using JSON object format
question_obj = {
    "table_id": "example-001",
    "question": "Which country had the most cyclists finish within the top 10?",
    "table_file_name": "./datasets/WikiTableQuestions/csv/203-csv/733.csv",
    "target_value": "Italy",
    "table_name": "2008 Clásica de San Sebastián"
}

result = qa.ask(question_obj)
print(f"Answer: {result.answer}")
print(f"Correct: {result.is_correct}")`;

  const mysqlSetup = `# Install MySQL (if not already installed)
# On macOS:
brew install mysql
brew services start mysql

# On Ubuntu:
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE weaver_db;
exit`;

  const tabs = [
    { id: 'quickstart', label: 'Quick Start', icon: FiDownload },
    { id: 'configuration', label: 'Configuration', icon: FiSettings },
    { id: 'usage', label: 'Usage Example', icon: FiTerminal },
    { id: 'database', label: 'Database Setup', icon: FiDatabase }
  ];

  return (
    <section id="installation" className="installation-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="installation-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Installation & Setup</h2>
            <p className="section-subtitle">
              Get started with Weaver in just a few simple steps
            </p>
          </motion.div>

          <motion.div className="installation-tabs" variants={itemVariants}>
            <div className="tabs-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="tab-icon" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'quickstart' && (
                <motion.div
                  className="quickstart-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="requirements-banner">
                    <h3>Requirements</h3>
                    <div className="requirements-grid">
                      <div className="req-item">
                        <span className="req-label">Python:</span>
                        <span className="req-value">3.8+</span>
                      </div>
                      <div className="req-item">
                        <span className="req-label">Database:</span>
                        <span className="req-value">MySQL 5.7+</span>
                      </div>
                      <div className="req-item">
                        <span className="req-label">API Key:</span>
                        <span className="req-value">OpenAI/Anthropic/etc.</span>
                      </div>
                    </div>
                  </div>

                  <div className="installation-steps">
                    {installationSteps.map((step, index) => (
                      <div key={step.id} className="install-step">
                        <div className="step-header">
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                        <div className="code-block">
                          <div className="code-header">
                            <span className="code-lang">bash</span>
                            <button
                              className="copy-btn"
                              onClick={() => copyToClipboard(step.code, step.id)}
                            >
                              {copiedStep === step.id ? <FiCheck /> : <FiCopy />}
                            </button>
                          </div>
                          <SyntaxHighlighter
                            language="bash"
                            style={prism}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0 0 0.5rem 0.5rem',
                              fontSize: '0.875rem'
                            }}
                          >
                            {step.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="quick-links">
                    <a
                      href="https://github.com/rohitkhoja/weaver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FiGithub />
                      View on GitHub
                    </a>
                    <a
                      href="https://github.com/rohitkhoja/weaver/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <FiDownload />
                      Download Release
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === 'configuration' && (
                <motion.div
                  className="config-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="config-description">
                    <h3>Environment Configuration</h3>
                    <p>
                      Configure your environment variables in the <code>.env</code> file. 
                      These settings control Weaver's behavior and integration with external services.
                    </p>
                  </div>

                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">.env file</span>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(configurationExample, 'config')}
                      >
                        {copiedStep === 'config' ? <FiCheck /> : <FiCopy />}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language="bash"
                      style={prism}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {configurationExample}
                    </SyntaxHighlighter>
                  </div>

                  <div className="config-notes">
                    <h4>Configuration Notes:</h4>
                    <ul>
                      <li><strong>API Keys:</strong> Choose one LLM provider (OpenAI, Anthropic, etc.)</li>
                      <li><strong>Model Format:</strong> Use LiteLLM format: <code>provider/model</code></li>
                      <li><strong>Database:</strong> MySQL is recommended for optimal performance</li>
                      <li><strong>Datasets:</strong> Point to your local dataset directory</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'usage' && (
                <motion.div
                  className="usage-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="usage-description">
                    <h3>Basic Usage Example</h3>
                    <p>
                      Here's a simple example of how to use Weaver for table-based question answering:
                    </p>
                  </div>

                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">python</span>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(usageExample, 'usage')}
                      >
                        {copiedStep === 'usage' ? <FiCheck /> : <FiCopy />}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={prism}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {usageExample}
                    </SyntaxHighlighter>
                  </div>

                  <div className="usage-features">
                    <h4>Key Features:</h4>
                    <div className="features-grid">
                      <div className="feature-card">
                        <FiCpu className="feature-icon" />
                        <h5>Simple API</h5>
                        <p>Easy-to-use interface for table QA tasks</p>
                      </div>
                      <div className="feature-card">
                        <FiSettings className="feature-icon" />
                        <h5>Flexible Configuration</h5>
                        <p>Environment-based configuration management</p>
                      </div>
                      <div className="feature-card">
                        <FiTerminal className="feature-icon" />
                        <h5>CLI Support</h5>
                        <p>Command-line interface for batch processing</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'database' && (
                <motion.div
                  className="database-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="database-description">
                    <h3>MySQL Database Setup</h3>
                    <p>
                      Weaver requires a MySQL database for optimal performance. Follow these steps to set up your database:
                    </p>
                  </div>

                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">bash</span>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(mysqlSetup, 'mysql')}
                      >
                        {copiedStep === 'mysql' ? <FiCheck /> : <FiCopy />}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language="bash"
                      style={prism}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {mysqlSetup}
                    </SyntaxHighlighter>
                  </div>

                  <div className="database-tips">
                    <h4>Database Tips:</h4>
                    <div className="tips-grid">
                      <div className="tip-item">
                        <FiDatabase className="tip-icon" />
                        <div>
                          <h5>Performance</h5>
                          <p>MySQL provides optimal performance for SQL operations</p>
                        </div>
                      </div>
                      <div className="tip-item">
                        <FiSettings className="tip-icon" />
                        <div>
                          <h5>Configuration</h5>
                          <p>Ensure proper connection settings in your .env file</p>
                        </div>
                      </div>
                      <div className="tip-item">
                        <FiCheck className="tip-icon" />
                        <div>
                          <h5>Compatibility</h5>
                          <p>Support for other databases is in development</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Installation;
