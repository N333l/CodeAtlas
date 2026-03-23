import React, { useState } from 'react';
import GraphCanvas from './GraphCanvas';
import { useAtlasStore } from './store';
import './Dashboard.css';

const LAYOUTS = ['force', 'radial', 'tree'];
const TYPE_COLORS = {
  component: '#38bdf8', service: '#fbbf24', store: '#a78bfa',
  page: '#34d399', hook: '#fb7185', util: '#64748b', config: '#475569', type: '#475569',
};

export default function Dashboard() {
  const { metrics, graphData, graphLayout, setGraphLayout, isAnalyzing } = useAtlasStore();
  const [showLegend, setShowLegend] = useState(true);

  const uniqueTypes = [...new Set(graphData.nodes.map(n => n.type))];

  return (
    <div className="dashboard">
      {/* Stats bar */}
      <div className="stats-bar">
        <div className="stat-chip">
          <span className="chip-value">{graphData.nodes.length}</span>
          <span className="chip-label">Modules</span>
        </div>
        <div className="stat-chip">
          <span className="chip-value">{graphData.edges.length}</span>
          <span className="chip-label">Connections</span>
        </div>
        <div className="stat-chip">
          <span className="chip-value" style={{ color: 'var(--amber)' }}>{metrics.avgComplexity}</span>
          <span className="chip-label">Avg Complexity</span>
        </div>
        <div className="stat-chip">
          <span className="chip-value">{metrics.dependencies}</span>
          <span className="chip-label">Dependencies</span>
        </div>
        <div className="stat-chip">
          <span className="chip-value" style={{ color: 'var(--green)' }}>{metrics.coverage}%</span>
          <span className="chip-label">Coverage</span>
        </div>
        <div className="stat-chip">
          <span className="chip-value" style={{ color: 'var(--rose)' }}>{metrics.issues}</span>
          <span className="chip-label">Issues</span>
        </div>

        <div className="stats-bar-sep" />

        <div className="layout-controls">
          {LAYOUTS.map(l => (
            <button
              key={l}
              className={`layout-btn ${graphLayout === l ? 'active' : ''}`}
              onClick={() => setGraphLayout(l)}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          className={`legend-toggle ${showLegend ? 'active' : ''}`}
          onClick={() => setShowLegend(s => !s)}
        >
          legend
        </button>
      </div>

      {/* Graph area */}
      <div className="graph-area">
        {isAnalyzing && (
          <div className="analysis-overlay">
            <div className="analysis-spinner" />
            <p>Analyzing codebase...</p>
            <span>Building dependency graph</span>
          </div>
        )}

        <GraphCanvas />

        {/* Controls */}
        <div className="graph-controls">
          <button id="graph-reset-zoom" className="control-btn" title="Reset zoom">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="8" y1="5" x2="8" y2="11" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="control-btn" title="Fit to screen">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="7" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="11.5" y1="7" x2="11.5" y2="9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="graph-legend">
            {uniqueTypes.map(type => (
              <div key={type} className="legend-item">
                <span className="legend-dot" style={{ background: TYPE_COLORS[type], boxShadow: `0 0 6px ${TYPE_COLORS[type]}` }} />
                <span className="legend-label">{type}</span>
              </div>
            ))}
            <div className="legend-divider" />
            <div className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--rose)' }} />
              <span className="legend-label">high complexity</span>
            </div>
          </div>
        )}

        {/* Corner tip */}
        <div className="graph-hint">
          Click node to inspect · Drag to rearrange · Scroll to zoom
        </div>
      </div>
    </div>
  );
}
