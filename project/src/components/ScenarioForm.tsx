import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { aiAgents, difficultyLevels } from "../data/sampleData";
import { Difficulty } from "../types";

interface ScenarioFormProps {
  onSubmit: (scenario: string, agent: string, difficulty: Difficulty) => void;
  isLoading?: boolean;
}

const ScenarioForm: React.FC<ScenarioFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [scenario, setScenario] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("basic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("scenario:", scenario);
    console.log("agent:", selectedAgent);
    console.log("difficulty:", selectedDifficulty);
    if (scenario.trim()) {
      onSubmit(scenario, selectedAgent, selectedDifficulty);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all hover:shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Describe Your Collaboration Scenario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <select
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              name="agent"
              title="Select AI Agent"
              id="agent"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              {aiAgents.map((agent) => (
                <option key={agent.value} value={agent.value}>
                  {agent.label}
                </option>
              ))}
            </select>
            <select
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              name="difficulty"
              title="Select Difficulty Level"
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(e.target.value as Difficulty)
              }
            >
              {difficultyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px] text-gray-700"
              placeholder="Describe your use case or research need (e.g., grant writing, research planning, outreach)..."
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !scenario.trim()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-all
                ${
                  isLoading || !scenario.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 hover:shadow-md"
                }`}
            >
              <span>Get Recommendations</span>
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScenarioForm;
