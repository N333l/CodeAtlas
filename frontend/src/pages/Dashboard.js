import React from "react";
import RepoInput from "../components/RepoInput";
import GraphView from "../components/GraphView";
import TechStack from "../components/TechStack";
import InsightsPanel from "../components/InsightsPanel";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>CodeAtlas Dashboard</h1>

      <RepoInput />

      <div className="grid">
        <GraphView />
        <TechStack />
      </div>

      <InsightsPanel />
    </div>
  );
}
