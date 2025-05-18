export interface Recommendation {
  tool: string;
  prompt: string;
  category?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  icon?: string;
}

export interface AITool {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export type Difficulty = 'basic' | 'intermediate' | 'advanced';