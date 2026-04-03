import React from 'react';
import { useAtlasStore } from './store';
import './Metrics.css';

const MetricCard = ({ label, value, unit, color, trend, sublabel }) => (
  <div className="metric-card">
    <div className="metric-top">
      <span className="metric-label">{label}</span>
      {trend && (
        <span className={`metric-trend ${trend > 0 ? 'up' : 'down'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="metric-value" style={{ color: color || 'var(--text-primary)' }}>
      {value}<span className="metric-unit">{unit}</span>
    </div>
    {sublabel && <div className="metric-sub">{sublabel}</div>}
  </div>
);

const BarChart = ({ data, label, color = 'var(--accent)' }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bar-chart">
      <div className="chart-title">{label}</div>
      <div className="bars">
        {data.map((d, i) => (
          <div key={i} className="bar-item">
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  background: d.color || color,
                  boxShadow: `0 0 8px ${d.color || color}60`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <div className="bar-value">{d.value}</div>
            <div className="bar-name">{d.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComplexityRow = ({ name, value, type }) => {
  const color = value >= 80 ? 'var(--rose)' : value >= 60 ? 'var(--amber)' : value >= 40 ? 'var(--accent)' : 'var(--green)';
  return (
    <div className="complexity-row">
      <div className="cr-info">
        <span className="cr-name">{name}</span>
        <span className="cr-type">{type}</span>
      </div>
      <div className="cr-bar-wrap">
        <div className="cr-bar-track">
          <div className="cr-bar-fill" style={{ width: `${value}%`, background: color, boxShadow: `0 0 6px ${color}60` }} />
        </div>
        <span className="cr-value" style={{ color }}>{value}</span>
      </div>
    </div>
  );
};

export default function Metrics() {
  const { metrics, graphData } = useAtlasStore();

  const typeDistribution = Object.entries(
    graphData.nodes.reduce((acc, n) => { acc[n.type] = (acc[n.type] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const complexityColors = { component: '#38bdf8', service: '#fbbf24', store: '#a78bfa', page: '#34d399', hook: '#fb7185', util: '#64748b', config: '#475569', type: '#475569' };
  const typeDistData = typeDistribution.map(d => ({ ...d, color: complexityColors[d.name] }));

  const topComplex = [...graphData.nodes].sort((a, b) => b.complexity - a.complexity).slice(0, 8);

  const locData = [...graphData.nodes].sort((a, b) => b.loc - a.loc).slice(0, 7)
    .map(n => ({ name: n.label.split('.')[0].slice(0, 8), value: n.loc, color: complexityColors[n.type] }));

  return (
    <div className="metrics-page">
      <div className="metrics-header">
        <h1 className="metrics-title">Project Metrics</h1>
        <span className="metrics-subtitle">codeatlas-frontend · analyzed just now</span>
      </div>

      <div className="metrics-grid">
        <MetricCard label="Total Files" value={metrics.totalFiles} color="var(--text-primary)" sublabel="across all modules" />
        <MetricCard label="Lines of Code" value={(metrics.totalLoc / 1000).toFixed(1)} unit="k" color="var(--accent)" trend={-3} sublabel="excluding comments" />
        <MetricCard label="Avg Complexity" value={metrics.avgComplexity} color="var(--amber)" trend={8} sublabel="cyclomatic" />
        <MetricCard label="Dependencies" value={metrics.dependencies} color="var(--purple)" sublabel="npm packages" />
        <MetricCard label="Test Coverage" value={metrics.coverage} unit="%" color="var(--green)" trend={2} sublabel="lines covered" />
        <MetricCard label="Duplicate Blocks" value={metrics.duplicateBlocks} color="var(--rose)" trend={-5} sublabel="code duplication" />
        <MetricCard label="Open Issues" value={metrics.issues} color="var(--rose)" sublabel="quality warnings" />
        <MetricCard label="Max Chain Depth" value={metrics.deepestChain} color="var(--amber)" sublabel="import depth" />
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <BarChart data={typeDistData} label="Module Distribution by Type" />
        </div>
        <div className="chart-card">
          <BarChart data={locData} label="Lines of Code by Module" color="var(--purple)" />
        </div>
      </div>

      <div className="complexity-section">
        <div className="section-header">
          <h2>Complexity Breakdown</h2>
          <span className="section-sub">Top 8 most complex modules</span>
        </div>
        <div className="complexity-list">
          {topComplex.map(node => (
            <ComplexityRow key={node.id} name={node.label} value={node.complexity} type={node.type} />
          ))}
        </div>
      </div>
    </div>
  );
}
