import React, { useState } from "react";
import { analyzeRepo } from "../services/api";
import useAnalysisStore from "../store/analysisStore";

export default function RepoInput() {
  const [url, setUrl] = useState("");
  const { setData, setLoading, loading } = useAnalysisStore();

  const handleAnalyze = async () => {
    if (!url) return alert("Enter repo URL");

    setLoading(true);
    try {
      const res = await analyzeRepo(url);
      setData(res.data);
    } catch (err) {
      alert("Error analyzing repo");
    }
    setLoading(false);
  };

  return (
    <div className="repo-input">
      <input
        type="text"
        placeholder="Enter GitHub Repo URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
