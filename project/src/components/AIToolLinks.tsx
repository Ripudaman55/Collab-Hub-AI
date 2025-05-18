import React from 'react';
import { ExternalLink } from 'lucide-react';

const tools = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI\'s powerful language model for natural conversations and creative tasks',
    color: 'from-emerald-600 to-emerald-500'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    description: 'Anthropic\'s AI assistant known for nuanced analysis and detailed responses',
    color: 'from-purple-600 to-purple-500'
  },
  {
    name: 'Dimensions.ai',
    url: 'https://dimensions.ai',
    description: 'Comprehensive research intelligence platform for academic-industry insights',
    color: 'from-blue-600 to-blue-500'
  }
];

const AIToolLinks: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Explore Our Supported AI Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolLinks;