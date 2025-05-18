import React from 'react';
import { Brain, ExternalLink } from 'lucide-react';

const aiTools = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI\'s conversational AI'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    description: 'Anthropic\'s AI assistant'
  },
  {
    name: 'Dimensions',
    url: 'https://dimensions.ai',
    description: 'Research intelligence platform'
  }
];

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <Brain className="w-10 h-10 text-teal-300 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
              CollabAI Hub
            </h1>
          </div>
          <p className="text-sm sm:text-base text-teal-100 max-w-lg text-center sm:text-right">
            Bridging academia and industry through intelligent, prompt-based AI collaboration
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 px-4">
          {aiTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-blue-800/50 rounded-lg p-4 hover:bg-blue-800/70 transition-all group"
            >
              <div>
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <p className="text-sm text-teal-100">{tool.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;