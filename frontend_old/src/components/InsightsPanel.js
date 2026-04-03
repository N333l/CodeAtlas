import React from "react";
import useAnalysisStore from "../store/analysisStore";

export default function InsightsPanel() {
  const { analysis } = useAnalysisStore();

  if (!analysis) return null;

  const insights = analysis.insights?.services || [];

  return (
    <div className="card">
      <h3>Architecture Insights</h3>
      {insights.length === 0 ? (
        <p>No insights available</p>
      ) : (
        insights.map((item, i) => (
          <div key={i} className="insight">
            ⚡ {item}
          </div>
        ))
      )}
    </div>
  );
}
