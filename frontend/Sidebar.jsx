import React, { useState } from 'react';
import { useAtlasStore } from './store';
import './Sidebar.css';

const TYPE_COLORS = {
  component: 'var(--accent)',
  service: 'var(--amber)',
  store: 'var(--purple)',
  page: 'var(--green)',
  hook: 'var(--rose)',
  util: 'var(--text-secondary)',
  config: 'var(--text-muted)',
  type: 'var(--text-muted)',
};

const COMPLEXITY_LABEL = (n) => n >= 80 ? { label: 'Critical', color: 'var(--rose)' }
  : n >= 60 ? { label: 'High', color: 'var(--amber)' }
  : n >= 40 ? { label: 'Medium', color: 'var(--accent)' }
  : { label: 'Low', color: 'var(--green)' };

export default function Sidebar() {
  const { sidebarOpen, selectedNode, graphData, setSelectedNode, issues, metrics } = useAtlasStore();
  const [tab, setTab] = useState('files');

  if (!sidebarOpen) return null;

  const nodesByType = graphData.nodes.reduce((acc, n) => {
    if (!acc[n.type]) acc[n.type] = [];
    acc[n.type].push(n);
    return acc;
  }, {});

  return (
    <aside className="sidebar">
      <div className="sidebar-tabs">
        {['files', 'details', 'issues'].map(t => (
          <button
            key={t}
            className={`sidebar-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
            {t === 'issues' && <span className="tab-badge">{issues.length}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-content">
        {tab === 'files' && (
          <div className="file-tree">
            {Object.entries(nodesByType).map(([type, nodes]) => (
              <div key={type} className="tree-group">
                <div className="tree-group-header">
                  <span className="tree-type-dot" style={{ background: TYPE_COLORS[type] }} />
                  <span className="tree-type-label">{type}</span>
                  <span className="tree-count">{nodes.length}</span>
                </div>
                {nodes.map(node => (
                  <button
                    key={node.id}
                    className={`tree-item ${selectedNode?.id === node.id ? 'active' : ''}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <span className="tree-item-name">{node.label}</span>
                    <span
                      className="tree-item-complexity"
                      style={{ color: COMPLEXITY_LABEL(node.complexity).color }}
                    >
                      {node.complexity}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === 'details' && (
          <div className="node-details">
            {selectedNode ? (
              <>
                <div className="detail-header">
                  <span className="detail-type-badge" style={{ borderColor: TYPE_COLORS[selectedNode.type], color: TYPE_COLORS[selectedNode.type] }}>
                    {selectedNode.type}
                  </span>
                  <h3 className="detail-name">{selectedNode.label}</h3>
                </div>

                <div className="detail-stats">
                  <div className="detail-stat">
                    <span className="stat-label">Lines of Code</span>
                    <span className="stat-value">{selectedNode.loc.toLocaleString()}</span>
                  </div>
                  <div className="detail-stat">
                    <span className="stat-label">Complexity</span>
                    <span className="stat-value" style={{ color: COMPLEXITY_LABEL(selectedNode.complexity).color }}>
                      {selectedNode.complexity}
                      <span className="stat-tag">{COMPLEXITY_LABEL(selectedNode.complexity).label}</span>
                    </span>
                  </div>
                  <div className="detail-stat">
                    <span className="stat-label">Imports</span>
                    <span className="stat-value">{selectedNode.imports}</span>
                  </div>
                </div>

                <div className="complexity-bar-wrap">
                  <div className="complexity-bar-track">
                    <div
                      className="complexity-bar-fill"
                      style={{
                        width: `${selectedNode.complexity}%`,
                        background: COMPLEXITY_LABEL(selectedNode.complexity).color,
                        boxShadow: `0 0 8px ${COMPLEXITY_LABEL(selectedNode.complexity).color}`,
                      }}
                    />
                  </div>
                </div>

                <div className="detail-connections">
                  <span className="connections-label">Connections</span>
                  <div className="connections-list">
                    {graphData.edges
                      .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((e, i) => {
                        const other = e.source === selectedNode.id ? e.target : e.source;
                        const dir = e.source === selectedNode.id ? '→' : '←';
                        return (
                          <div key={i} className="connection-item">
                            <span className="conn-dir">{dir}</span>
                            <span className="conn-name">{other}</span>
                            <span className="conn-weight">w:{e.weight}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <div className="no-sel-icon">⬡</div>
                <p>Select a node in the graph to inspect details</p>
              </div>
            )}
          </div>
        )}

        {tab === 'issues' && (
          <div className="issues-list">
            {issues.map(issue => (
              <div key={issue.id} className={`issue-card severity-${issue.severity}`}>
                <div className="issue-top">
                  <span className={`issue-sev sev-${issue.severity}`}>{issue.severity}</span>
                  <span className="issue-type">{issue.type}</span>
                </div>
                <p className="issue-msg">{issue.message}</p>
                <div className="issue-loc">
                  <span className="issue-file">{issue.file}</span>
                  <span className="issue-line">:{issue.line}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="footer-stat">
          <span>{metrics.totalFiles}</span> files
        </div>
        <div className="footer-sep" />
        <div className="footer-stat">
          <span>{(metrics.totalLoc / 1000).toFixed(1)}k</span> loc
        </div>
        <div className="footer-sep" />
        <div className="footer-stat">
          <span style={{ color: metrics.issues > 0 ? 'var(--rose)' : 'var(--green)' }}>{metrics.issues}</span> issues
        </div>
      </div>
    </aside>
  );
}
