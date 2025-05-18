import React from "react";
import { Recommendation } from "../types";

interface ToolCardProps {
  recommendation: Recommendation;
}

const ToolCard: React.FC<ToolCardProps> = ({ recommendation }) => {
  const difficultyColors = {
    basic: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg mb-6">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">
            {recommendation.tool}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              difficultyColors[recommendation.difficulty]
            }`}
          >
            {recommendation.difficulty}
          </span>
        </div>
        {recommendation.category && (
          <span className="inline-block bg-blue-900 text-teal-100 text-xs px-3 py-1 rounded-full mt-2">
            {recommendation.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">
          Prompt Example:
        </h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto max-h-[400px]">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {recommendation.prompt
              .split("\n")
              .filter((line) => !line.startsWith("[DIMENSION_QUERY]:"))
              .join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
