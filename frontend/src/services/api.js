import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeRepo = (repo_url) =>
  API.post("/analyze", { repo_url });
