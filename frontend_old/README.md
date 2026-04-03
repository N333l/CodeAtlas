# CodeAtlas Frontend v2.0

> Automated Codebase Architecture Analyzer — React frontend with D3 force-graph visualization.

![CodeAtlas](https://img.shields.io/badge/CodeAtlas-v2.0-38bdf8?style=flat-square&labelColor=060810)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&labelColor=060810)
![D3](https://img.shields.io/badge/D3-v7-f9a03c?style=flat-square&labelColor=060810)

## What's New in v2.0

- **Interactive D3 Force Graph** — Live dependency visualization with click-to-inspect, drag, and zoom
- **Dark industrial design system** — CSS custom property theming, Space Mono + Syne typography
- **4 full pages** — Graph view, Metrics dashboard, Issues tracker, Upload/analyze flow
- **Zustand state** — Centralized store with mock data for instant demo
- **Collapsible sidebar** — File tree, node detail panel, and issues list in one place
- **Micro-animations** — Staggered reveals, bar chart animations, glow effects, hover states
- **Responsive** — Adapts gracefully from desktop to tablet

## Getting Started

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## Project Structure

```
src/
├── styles/
│   └── globals.css          # Design tokens, animations, resets
├── store/
│   └── index.js             # Zustand store (state + mock data)
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx/.css  # Top navigation bar
│   │   └── Sidebar.jsx/.css # File tree + detail panel
│   └── graph/
│       └── GraphCanvas.jsx/.css  # D3 force-directed graph
└── pages/
    ├── Dashboard.jsx/.css   # Main graph view
    ├── Metrics.jsx/.css     # Stats, bar charts, complexity
    ├── Issues.jsx/.css      # Filterable issue table
    └── Upload.jsx/.css      # Upload / connect repo
```

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `--accent` | `#38bdf8` | Primary interactive elements |
| `--amber` | `#fbbf24` | Warnings, services |
| `--rose` | `#fb7185` | Errors, critical issues |
| `--green` | `#34d399` | Success, low complexity |
| `--purple` | `#a78bfa` | Store modules |
| `--font-mono` | Space Mono | Code, labels, UI text |
| `--font-display` | Syne | Headings, values |

## Connecting to the Backend

Replace mock data in `src/store/index.js` with real API calls:

```js
// src/services/api.js
import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const analyzeProject = (payload) => api.post('/analyze', payload);
export const getGraph = (projectId) => api.get(`/projects/${projectId}/graph`);
export const getMetrics = (projectId) => api.get(`/projects/${projectId}/metrics`);
export const getIssues = (projectId) => api.get(`/projects/${projectId}/issues`);
```

## Build

```bash
npm run build
```

Output goes to `/build`, ready for static hosting or Docker.
