import React from "react";
import useAnalysisStore from "../store/analysisStore";

export default function TechStack() {
  const { data } = useAnalysisStore();

  if (!data) return null;

  return (
    <div className="card">
      <h3>Tech Stack</h3>
      <ul>
        {Object.entries(data.technologies || {}).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {Array.isArray(value) ? value.join(", ") : value}
          </li>
        ))}
      </ul>
    </div>
  );
}
