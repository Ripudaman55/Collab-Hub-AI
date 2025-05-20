import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import ScenarioForm from "./components/ScenarioForm";
import RecommendationList from "./components/RecommendationList";
import AIToolLinks from "./components/AIToolLinks";
import { Recommendation, Difficulty } from "./types";
import { sampleRecommendations } from "./data/sampleData";
import "./App.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (
    scenario: string,
    agent: string,
    difficulty: Difficulty
  ) => {
    setIsLoading(true);
    setHasSubmitted(true);

    try {
      console.log("scenario:", scenario);
      console.log("agent:", agent);
      console.log("difficulty:", difficulty);
      // In the future, replace this with an actual API call:
      const response = await axios.post("/api/recommend", {
        scenario,
        agent,
        difficulty,
      });
      console.log("API Response:", response.data);

      setRecommendations(response.data);
      setIsLoading(false);
      // For now, simulate an API call with a timeout and filter sample data
      // setTimeout(() => {
      //   let filtered = [...sampleRecommendations];

      //   if (agent !== "all") {
      //     filtered = filtered.filter((rec) => rec.tool.toLowerCase() === agent);
      //   }

      //   filtered = filtered.filter((rec) => rec.difficulty === difficulty);

      //   setRecommendations(filtered);
      //   setIsLoading(false);
      // }, 1200);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Enhancing Research Collaboration with AI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your academic-industry collaboration scenario below, and
            we'll recommend the most effective AI tools and customized prompts
            to help you succeed.
          </p>
        </div>

        <ScenarioForm onSubmit={handleSubmit} isLoading={isLoading} />

        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-600 animate-spin"></div>
          </div>
        )}

        {hasSubmitted && !isLoading && (
          <>
            <RecommendationList recommendations={recommendations} />
          </>
        )}
      </main>

      <AIToolLinks />

      <footer className="bg-blue-900 text-white py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-blue-200">
                © 2025 CollabAI Hub | Bridging Academic-Industry Partnerships
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
