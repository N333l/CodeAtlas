import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { useAtlasStore } from './store';
import './GraphCanvas.css';

const TYPE_COLORS = {
  component: '#38bdf8',
  service: '#fbbf24',
  store: '#a78bfa',
  page: '#34d399',
  hook: '#fb7185',
  util: '#64748b',
  config: '#475569',
  type: '#475569',
};

const NODE_RADIUS = (d) => 8 + d.size * 5;

export default function GraphCanvas() {
  const svgRef = useRef(null);
  const { graphData, selectedNode, setSelectedNode, graphLayout } = useAtlasStore();

  const draw = useCallback(() => {
    if (!svgRef.current || !graphData) return;

    const container = svgRef.current.parentElement;
    const W = container.clientWidth;
    const H = container.clientHeight;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', W)
      .attr('height', H);

    // Defs: glow filters + arrow markers
    const defs = svg.append('defs');

    Object.entries(TYPE_COLORS).forEach(([type, color]) => {
      const filter = defs.append('filter').attr('id', `glow-${type}`).attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'blur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -4 8 8')
      .attr('refX', 16)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L8,0L0,4')
      .attr('fill', 'rgba(99,179,237,0.3)');

    // Zoom
    const g = svg.append('g');
    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (e) => g.attr('transform', e.transform));
    svg.call(zoom);
    svg.on('dblclick.zoom', null);

    // Links
    const nodes = graphData.nodes.map(d => ({ ...d }));
    const edges = graphData.edges.map(d => ({ ...d }));

    const link = g.append('g').attr('class', 'links')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('class', 'graph-link')
      .attr('stroke-width', d => Math.sqrt(d.weight) * 0.8)
      .attr('marker-end', 'url(#arrow)');

    // Node groups
    const node = g.append('g').attr('class', 'nodes')
      .selectAll('.graph-node')
      .data(nodes)
      .join('g')
      .attr('class', 'graph-node')
      .call(drag(simulation));

    // Outer glow ring
    node.append('circle')
      .attr('r', d => NODE_RADIUS(d) + 4)
      .attr('fill', 'none')
      .attr('stroke', d => TYPE_COLORS[d.type] || '#64748b')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.2)
      .attr('class', 'node-ring');

    // Main circle
    node.append('circle')
      .attr('r', NODE_RADIUS)
      .attr('fill', d => TYPE_COLORS[d.type] || '#64748b')
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => TYPE_COLORS[d.type] || '#64748b')
      .attr('stroke-width', 1.5)
      .attr('class', 'node-circle')
      .style('filter', d => `url(#glow-${d.type})`);

    // Label
    node.append('text')
      .text(d => d.label.replace(/\.(jsx?|ts|tsx|css)$/, ''))
      .attr('dy', d => NODE_RADIUS(d) + 14)
      .attr('text-anchor', 'middle')
      .attr('class', 'node-label')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', 'Space Mono, monospace');

    // Complexity dot
    node.append('circle')
      .attr('r', 3)
      .attr('cx', d => NODE_RADIUS(d) - 2)
      .attr('cy', d => -(NODE_RADIUS(d) - 2))
      .attr('fill', d => d.complexity >= 80 ? '#fb7185' : d.complexity >= 60 ? '#fbbf24' : '#34d399')
      .attr('class', 'complexity-dot');

    // Interaction
    node.on('click', (event, d) => {
      event.stopPropagation();
      setSelectedNode(d);
      highlightNode(d);
    }).on('mouseover', (event, d) => {
      d3.select(event.currentTarget).select('.node-circle')
        .transition().duration(150)
        .attr('fill-opacity', 0.4)
        .attr('stroke-width', 2.5);
      d3.select(event.currentTarget).select('.node-ring')
        .transition().duration(150)
        .attr('stroke-opacity', 0.5)
        .attr('r', d => NODE_RADIUS(d) + 7);
    }).on('mouseout', (event, d) => {
      d3.select(event.currentTarget).select('.node-circle')
        .transition().duration(150)
        .attr('fill-opacity', 0.15)
        .attr('stroke-width', 1.5);
      d3.select(event.currentTarget).select('.node-ring')
        .transition().duration(150)
        .attr('stroke-opacity', 0.2)
        .attr('r', d => NODE_RADIUS(d) + 4);
    });

    svg.on('click', () => {
      setSelectedNode(null);
      resetHighlight();
    });

    function highlightNode(d) {
      const connectedIds = new Set(
        edges
          .filter(e => e.source.id === d.id || e.target.id === d.id)
          .flatMap(e => [e.source.id, e.target.id])
      );
      connectedIds.add(d.id);

      node.select('.node-circle')
        .attr('fill-opacity', n => connectedIds.has(n.id) ? 0.35 : 0.06)
        .attr('stroke-opacity', n => connectedIds.has(n.id) ? 1 : 0.25);
      node.select('.node-label')
        .attr('fill', n => connectedIds.has(n.id) ? '#e2e8f0' : '#334155');
      link
        .attr('stroke-opacity', e => (e.source.id === d.id || e.target.id === d.id) ? 0.9 : 0.05)
        .attr('stroke', e => (e.source.id === d.id || e.target.id === d.id) ? TYPE_COLORS[d.type] : 'rgba(99,179,237,0.15)');
    }

    function resetHighlight() {
      node.select('.node-circle').attr('fill-opacity', 0.15).attr('stroke-opacity', 1);
      node.select('.node-label').attr('fill', '#94a3b8');
      link.attr('stroke-opacity', 0.4).attr('stroke', 'rgba(99,179,237,0.2)');
    }

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(90).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide().radius(d => NODE_RADIUS(d) + 20))
      .on('tick', () => {
        link
          .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });

    // Reset zoom button
    d3.select('#graph-reset-zoom').on('click', () => {
      svg.transition().duration(500).call(
        zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.9)
      );
    });

    function drag(sim) {
      return d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });
    }

  }, [graphData, setSelectedNode]);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(draw);
    if (svgRef.current?.parentElement) observer.observe(svgRef.current.parentElement);
    return () => observer.disconnect();
  }, [draw]);

  return <svg ref={svgRef} className="graph-canvas" />;
}
