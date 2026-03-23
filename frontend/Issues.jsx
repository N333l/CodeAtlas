import React, { useState } from 'react';
import { useAtlasStore } from './store';
import './Issues.css';

const SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export default function Issues() {
  const { issues } = useAtlasStore();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('severity');

  const filtered = issues
    .filter(i => filter === 'all' || i.severity === filter)
    .sort((a, b) => sort === 'severity' ? SEV_ORDER[a.severity] - SEV_ORDER[b.severity] : a.file.localeCompare(b.file));

  const counts = issues.reduce((acc, i) => { acc[i.severity] = (acc[i.severity] || 0) + 1; return acc; }, {});

  return (
    <div className="issues-page">
      <div className="issues-header">
        <div>
          <h1 className="issues-title">Code Issues</h1>
          <p className="issues-subtitle">{issues.length} issues detected across the codebase</p>
        </div>
        <div className="issues-summary">
          {[['critical', 'var(--rose)'], ['high', 'var(--amber)'], ['medium', 'var(--accent)'], ['low', 'var(--text-muted)']].map(([sev, color]) => (
            <div key={sev} className="summary-chip" style={{ borderColor: color + '40' }}>
              <span className="summary-num" style={{ color }}>{counts[sev] || 0}</span>
              <span className="summary-label">{sev}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="issues-toolbar">
        <div className="filter-group">
          {['all', 'critical', 'high', 'medium', 'low'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'all' && counts[f] ? <span className="filter-count">{counts[f]}</span> : null}
            </button>
          ))}
        </div>
        <div className="sort-group">
          <span className="sort-label">sort by</span>
          <button className={`sort-btn ${sort === 'severity' ? 'active' : ''}`} onClick={() => setSort('severity')}>severity</button>
          <button className={`sort-btn ${sort === 'file' ? 'active' : ''}`} onClick={() => setSort('file')}>file</button>
        </div>
      </div>

      <div className="issues-table">
        <div className="table-header">
          <span>Severity</span>
          <span>File</span>
          <span>Message</span>
          <span>Type</span>
          <span>Line</span>
        </div>
        {filtered.map(issue => (
          <div key={issue.id} className={`table-row sev-${issue.severity}`}>
            <span className={`row-severity sev-badge-${issue.severity}`}>{issue.severity}</span>
            <span className="row-file">{issue.file}</span>
            <span className="row-msg">{issue.message}</span>
            <span className="row-type">{issue.type}</span>
            <span className="row-line">:{issue.line}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="no-issues">
            <span>✓</span>
            <p>No issues matching this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
