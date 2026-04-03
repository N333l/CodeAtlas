import React, { useEffect } from "react";
import useAnalysisStore from "../store/analysisStore";

export default function GraphView() {
  const { data } = useAnalysisStore();

  useEffect(() => {
    if (!data) return;
    console.log("Graph data:", data.architecture);
  }, [data]);

  return (
    <div className="card">
      <h3>Architecture Graph</h3>
      <div id="graph-container">
        {data ? "Graph Loaded (Integrate D3 here)" : "No Data"}
      </div>
    </div>
  );
}
