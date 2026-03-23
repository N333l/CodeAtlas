import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to CodeAtlas</h1>
      <p>Analyze and visualize codebase architecture</p>
      <button onClick={() => navigate("/dashboard")}>
        Start Analyzing
      </button>
    </div>
  );
}
