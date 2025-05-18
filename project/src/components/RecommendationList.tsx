import React from "react";
import ToolCard from "./ToolCard";
import { Recommendation } from "../types";
import { Bot, BrainCircuit, BookOpen } from "lucide-react";
import axios from "axios";
interface RecommendationListProps {
  recommendations: Recommendation[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
}) => {
  if (!recommendations.length) {
    return null;
  }
  const [SearchLink, setSearchLink] = React.useState<string | null>(null);
  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="flex items-center mb-6 space-x-3">
        <BrainCircuit className="w-7 h-7 text-blue-700" />
        <h2 className="text-2xl font-bold text-gray-800">
          AI Tool Recommendations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {recommendations.map((recommendation, index) => (
          <ToolCard key={index} recommendation={recommendation} />
        ))}

        <button
          onClick={() => {
            console.log("Recommendations:", recommendations);
            axios
              .post("http://localhost:3000/api/search-dimensions", {})
              .then((response) => {
                const { data } = response;
                console.log("Search results:", data);

                const link = data.link;
                if (link) {
                  window.open(link, "_blank"); // ✅ Open in new tab
                  setSearchLink(link); // optional: save for future use
                }
              })
              .catch((error) => {
                console.error("Error searching Dimensions:", error);
              });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          🔍 Search in Dimensions
        </button>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-blue-700 mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            How To Use These Prompts
          </h3>
        </div>
        <ul className="text-gray-700 space-y-2">
          <li className="flex items-start">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center mr-2 mt-1">
              1
            </span>
            Copy the prompt example that best matches your needs
          </li>
          <li className="flex items-start">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center mr-2 mt-1">
              2
            </span>
            Customize the prompt with your specific details and requirements
          </li>
          <li className="flex items-start">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center mr-2 mt-1">
              3
            </span>
            Paste the modified prompt into the suggested AI tool
          </li>
          <li className="flex items-start">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center mr-2 mt-1">
              4
            </span>
            Review and refine the AI's response to meet your specific needs
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecommendationList;
