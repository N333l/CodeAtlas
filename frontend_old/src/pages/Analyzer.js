import React, { useState, useRef } from 'react';
import { analyzeRepo } from '../services/api';
import { useAnalysisStore } from '../store/analysisStore';
import ArchitectureVisualization from '../components/ArchitectureVisualization';
import './Analyzer.css';

function Analyzer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const { analysis, setAnalysis } = useAnalysisStore();
  const canvasRef = useRef(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      setLocalError('Please enter a repository URL');
      return;
    }

    setLocalLoading(true);
    setLocalError('');

    try {
      const result = await analyzeRepo(repoUrl);
      setAnalysis(result);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to analyze repository';
      setLocalError(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <div className="analyzer-form-section">
        <h2>Analyze Repository</h2>
        <form onSubmit={handleAnalyze}>
          <div className="input-group">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
              className="repo-input"
              disabled={localLoading}
            />
            <button 
              type="submit" 
              className="analyze-button"
              disabled={localLoading}
            >
              {localLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>
        
        {localError && (
          <div className="error-message">{localError}</div>
        )}
      </div>

      {analysis && (
        <div className="analysis-results">
          <div className="results-container">
            <div className="visualization-panel">
              <h3>Architecture Diagram</h3>
              <ArchitectureVisualization data={analysis.architecture} canvasRef={canvasRef} />
            </div>

            <div className="info-panel">
              <div className="info-section">
                <h3>Detected Technologies</h3>
                {analysis.technologies && Object.entries(analysis.technologies).map(([category, techs]) => (
                  techs.length > 0 && (
                    <div key={category} className="tech-category">
                      <h4>{category}</h4>
                      <div className="tech-list">
                        {techs.map((tech, idx) => (
                          <span key={idx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="info-section">
                <h3>Architecture Insights</h3>
                {analysis.insights && (
                  <>
                    {analysis.insights.services.length > 0 && (
                      <div>
                        <h4>Services</h4>
                        <ul>
                          {analysis.insights.services.map((service, idx) => (
                            <li key={idx}>{service}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.insights.potential_issues.length > 0 && (
                      <div className="issues">
                        <h4>⚠️ Potential Issues</h4>
                        <ul>
                          {analysis.insights.potential_issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.insights.recommendations.length > 0 && (
                      <div className="recommendations">
                        <h4>💡 Recommendations</h4>
                        <ul>
                          {analysis.insights.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analyzer;
