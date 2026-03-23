import { create } from "zustand";

const useAnalysisStore = create((set) => ({
  analysis: null,
  loading: false,
  setAnalysis: (analysis) => set({ analysis }),
  setLoading: (loading) => set({ loading }),
}));

export default useAnalysisStore;
