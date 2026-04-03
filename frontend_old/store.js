import { create } from 'zustand';

const mockGraphData = {
  nodes: [
    { id: 'app', label: 'App.jsx', type: 'component', size: 3, complexity: 72, loc: 340, imports: 8 },
    { id: 'router', label: 'Router.jsx', type: 'component', size: 2, complexity: 45, loc: 120, imports: 3 },
    { id: 'auth', label: 'auth.service', type: 'service', size: 2.5, complexity: 88, loc: 290, imports: 5 },
    { id: 'api', label: 'api.service', type: 'service', size: 3, complexity: 95, loc: 480, imports: 6 },
    { id: 'store', label: 'store/index', type: 'store', size: 2, complexity: 60, loc: 210, imports: 4 },
    { id: 'dashboard', label: 'Dashboard', type: 'page', size: 2.5, complexity: 78, loc: 310, imports: 7 },
    { id: 'graph', label: 'GraphView', type: 'component', size: 3.5, complexity: 98, loc: 620, imports: 9 },
    { id: 'sidebar', label: 'Sidebar', type: 'component', size: 1.5, complexity: 40, loc: 180, imports: 4 },
    { id: 'navbar', label: 'NavBar', type: 'component', size: 1, complexity: 30, loc: 90, imports: 2 },
    { id: 'upload', label: 'UploadPage', type: 'page', size: 2, complexity: 55, loc: 200, imports: 5 },
    { id: 'report', label: 'ReportPage', type: 'page', size: 2.5, complexity: 70, loc: 380, imports: 6 },
    { id: 'utils', label: 'utils/index', type: 'util', size: 1.5, complexity: 35, loc: 150, imports: 1 },
    { id: 'hooks', label: 'useGraph', type: 'hook', size: 1.5, complexity: 52, loc: 160, imports: 3 },
    { id: 'config', label: 'config.js', type: 'config', size: 1, complexity: 20, loc: 60, imports: 0 },
    { id: 'types', label: 'types.ts', type: 'type', size: 1, complexity: 15, loc: 80, imports: 0 },
  ],
  edges: [
    { source: 'app', target: 'router', weight: 3 },
    { source: 'app', target: 'store', weight: 2 },
    { source: 'app', target: 'auth', weight: 2 },
    { source: 'router', target: 'dashboard', weight: 3 },
    { source: 'router', target: 'upload', weight: 2 },
    { source: 'router', target: 'report', weight: 2 },
    { source: 'dashboard', target: 'graph', weight: 3 },
    { source: 'dashboard', target: 'sidebar', weight: 2 },
    { source: 'dashboard', target: 'navbar', weight: 1 },
    { source: 'dashboard', target: 'store', weight: 2 },
    { source: 'graph', target: 'hooks', weight: 3 },
    { source: 'graph', target: 'utils', weight: 2 },
    { source: 'graph', target: 'store', weight: 2 },
    { source: 'auth', target: 'api', weight: 3 },
    { source: 'auth', target: 'config', weight: 1 },
    { source: 'api', target: 'config', weight: 2 },
    { source: 'api', target: 'types', weight: 2 },
    { source: 'store', target: 'api', weight: 3 },
    { source: 'sidebar', target: 'store', weight: 2 },
    { source: 'upload', target: 'api', weight: 3 },
    { source: 'upload', target: 'store', weight: 2 },
    { source: 'report', target: 'store', weight: 2 },
    { source: 'report', target: 'utils', weight: 1 },
    { source: 'hooks', target: 'utils', weight: 2 },
    { source: 'hooks', target: 'types', weight: 1 },
  ]
};

const mockMetrics = {
  totalFiles: 247,
  totalLoc: 18430,
  avgComplexity: 58,
  dependencies: 42,
  issues: 14,
  coverage: 67,
  duplicateBlocks: 23,
  deepestChain: 8,
};

const mockIssues = [
  { id: 1, severity: 'critical', file: 'api.service.js', line: 142, message: 'Circular dependency detected', type: 'dependency' },
  { id: 2, severity: 'high', file: 'GraphView.jsx', line: 89, message: 'Cyclomatic complexity exceeds threshold (98 > 80)', type: 'complexity' },
  { id: 3, severity: 'high', file: 'auth.service.js', line: 204, message: 'Deep import chain (8 levels)', type: 'coupling' },
  { id: 4, severity: 'medium', file: 'Dashboard.jsx', line: 34, message: 'Missing error boundary', type: 'quality' },
  { id: 5, severity: 'medium', file: 'store/index.js', line: 67, message: 'Potential memory leak in subscription', type: 'performance' },
  { id: 6, severity: 'low', file: 'utils/index.js', line: 12, message: '3 duplicate utility functions detected', type: 'duplication' },
];

export const useAtlasStore = create((set, get) => ({
  // Navigation
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  // Project
  projectLoaded: true,
  projectName: 'codeatlas-frontend',
  projectPath: '/home/user/projects/codeatlas',
  isAnalyzing: false,

  // Graph
  graphData: mockGraphData,
  selectedNode: null,
  graphLayout: 'force',
  setSelectedNode: (node) => set({ selectedNode: node }),
  setGraphLayout: (layout) => set({ graphLayout: layout }),

  // Metrics
  metrics: mockMetrics,
  issues: mockIssues,

  // UI
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  theme: 'dark',

  // Analysis
  startAnalysis: () => {
    set({ isAnalyzing: true });
    setTimeout(() => set({ isAnalyzing: false }), 3200);
  },
}));
