import React from 'react';
import { useAtlasStore } from './store';
import './NavBar.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Graph', icon: '⬡' },
  { id: 'metrics', label: 'Metrics', icon: '◈' },
  { id: 'issues', label: 'Issues', icon: '◬' },
  { id: 'upload', label: 'Upload', icon: '⊕' },
];

export default function NavBar() {
  const { activePage, setActivePage, projectName, isAnalyzing, startAnalysis, toggleSidebar } = useAtlasStore();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="nav-sidebar-toggle" onClick={toggleSidebar} title="Toggle Sidebar">
          <span /><span /><span />
        </button>
        <div className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.8"/>
              <line x1="12" y1="2" x2="12" y2="9" stroke="currentColor" strokeWidth="1"/>
              <line x1="22" y1="8" x2="15.6" y2="10.5" stroke="currentColor" strokeWidth="1"/>
              <line x1="22" y1="16" x2="15.6" y2="13.5" stroke="currentColor" strokeWidth="1"/>
              <line x1="12" y1="22" x2="12" y2="15" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="16" x2="8.4" y2="13.5" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="8" x2="8.4" y2="10.5" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <span className="brand-name">CODE<span className="brand-accent">ATLAS</span></span>
        </div>
        <div className="navbar-project">
          <span className="project-slash">/</span>
          <span className="project-name">{projectName}</span>
          <span className={`project-status ${isAnalyzing ? 'analyzing' : 'ready'}`}>
            {isAnalyzing ? 'analyzing' : 'ready'}
          </span>
        </div>
      </div>

      <div className="navbar-center">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <button
          className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`}
          onClick={startAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <><span className="spinner" /> Analyzing...</>
          ) : (
            <><span className="btn-icon">▶</span> Run Analysis</>
          )}
        </button>
      </div>
    </nav>
  );
}
