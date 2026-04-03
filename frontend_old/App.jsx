import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Metrics from './Metrics';
import Issues from './Issues';
import Upload from './Upload';
import { useAtlasStore } from './store';
import './App.css';

const PAGES = {
  dashboard: Dashboard,
  metrics: Metrics,
  issues: Issues,
  upload: Upload,
};

export default function App() {
  const { activePage, sidebarOpen } = useAtlasStore();
  const Page = PAGES[activePage] || Dashboard;

  return (
    <div className="app">
      <NavBar />
      <div className="app-body">
        <Sidebar />
        <main className={`app-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Page />
        </main>
      </div>
    </div>
  );
}
