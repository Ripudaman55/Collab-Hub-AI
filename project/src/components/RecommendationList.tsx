import React from "react";
import ToolCard from "./ToolCard";
import { Recommendation } from "../types";
import { BrainCircuit, BookOpen } from "lucide-react";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
}) => {
  const [searchLink, setSearchLink] = React.useState<string | null>(null);

  if (!recommendations.length) return null;

  // Extract the first available link
  const firstLink = recommendations.find(r => r.link)?.link || null;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="flex items-center mb-6 space-x-3">
        <BrainCircuit className="w-7 h-7 text-blue-700" />
        <h2 className="text-2xl font-bold text-gray-800">AI Tool Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {recommendations.map((recommendation, index) => (
          <ToolCard key={index} recommendation={recommendation} />
        ))}

        {firstLink && (
          <button
            onClick={() => {
              window.open(firstLink, "_blank");
              setSearchLink(firstLink);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            🔍 Search in Dimensions
          </button>
        )}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-blue-700 mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            How To Use These Prompts
          </h3>
        </div>
        <ul className="text-gray-700 space-y-2">
          {["Copy the prompt example that best matches your needs",
            "Customize the prompt with your specific details and requirements",
            "Paste the modified prompt into the suggested AI tool",
            "Review and refine the AI's response to meet your specific needs"]
            .map((step, index) => (
              <li className="flex items-start" key={index}>
                <span className="inline-block w-4 h-4 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center mr-2 mt-1">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationList;
