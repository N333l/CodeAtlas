import React, { useState, useRef } from 'react';
import { useAtlasStore } from './store';
import './Upload.css';

export default function Upload() {
  const { startAnalysis, isAnalyzing, setActivePage } = useAtlasStore();
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('file');
  const fileRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploaded(file);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setUploaded(file);
  };

  const handleAnalyze = () => {
    startAnalysis();
    setTimeout(() => setActivePage('dashboard'), 3500);
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>Analyze Codebase</h1>
          <p>Upload a project archive or connect a repository to generate an architecture map</p>
        </div>

        <div className="mode-tabs">
          <button className={`mode-tab ${mode === 'file' ? 'active' : ''}`} onClick={() => setMode('file')}>
            <span>⊡</span> Upload Archive
          </button>
          <button className={`mode-tab ${mode === 'git' ? 'active' : ''}`} onClick={() => setMode('git')}>
            <span>⌥</span> Git Repository
          </button>
          <button className={`mode-tab ${mode === 'path' ? 'active' : ''}`} onClick={() => setMode('path')}>
            <span>⊞</span> Local Path
          </button>
        </div>

        {mode === 'file' && (
          <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''} ${uploaded ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !uploaded && fileRef.current.click()}
          >
            <input ref={fileRef} type="file" accept=".zip,.tar,.tar.gz,.tgz" onChange={handleFile} style={{ display: 'none' }} />
            {uploaded ? (
              <div className="file-selected">
                <div className="file-icon">✓</div>
                <div className="file-info">
                  <span className="file-name">{uploaded.name}</span>
                  <span className="file-size">{(uploaded.size / 1024).toFixed(1)} KB</span>
                </div>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); setUploaded(null); }}>×</button>
              </div>
            ) : (
              <>
                <div className="drop-icon">
                  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                    <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M24 16v16M17 23l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 36h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </div>
                <p className="drop-text">Drop your project archive here</p>
                <span className="drop-sub">or click to browse · .zip, .tar.gz supported</span>
              </>
            )}
          </div>
        )}

        {mode === 'git' && (
          <div className="input-section">
            <label className="input-label">Repository URL</label>
            <div className="input-row">
              <span className="input-prefix">git</span>
              <input
                className="url-input"
                type="text"
                placeholder="https://github.com/user/repository"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="option-chips">
              {['main', 'master', 'develop'].map(b => (
                <button key={b} className="option-chip">{b}</button>
              ))}
            </div>
          </div>
        )}

        {mode === 'path' && (
          <div className="input-section">
            <label className="input-label">Absolute Path</label>
            <div className="input-row">
              <span className="input-prefix">/</span>
              <input
                className="url-input"
                type="text"
                placeholder="home/user/projects/my-project"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="analysis-options">
          <h3>Analysis Options</h3>
          <div className="options-grid">
            {[
              { id: 'deps', label: 'Dependency Graph', on: true },
              { id: 'complexity', label: 'Complexity Analysis', on: true },
              { id: 'duplication', label: 'Duplication Detection', on: true },
              { id: 'coverage', label: 'Test Coverage', on: false },
              { id: 'security', label: 'Security Audit', on: false },
              { id: 'perf', label: 'Performance Hints', on: false },
            ].map(opt => (
              <label key={opt.id} className="option-toggle">
                <input type="checkbox" defaultChecked={opt.on} />
                <span className="toggle-track"><span className="toggle-thumb" /></span>
                <span className="option-name">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className={`analyze-action-btn ${isAnalyzing ? 'loading' : ''}`}
          onClick={handleAnalyze}
          disabled={isAnalyzing || (mode === 'file' && !uploaded) || (mode !== 'file' && !url)}
        >
          {isAnalyzing ? (
            <><span className="btn-spinner" /> Analyzing codebase...</>
          ) : (
            '▶ Run Analysis'
          )}
        </button>
      </div>
    </div>
  );
}
