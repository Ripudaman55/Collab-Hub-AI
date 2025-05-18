const API_URL = 'http://localhost:3000/api';

export async function getPrompts() {
  const response = await fetch(`${API_URL}/prompts`);
  if (!response.ok) throw new Error('Failed to fetch prompts');
  return response.json();
}

export async function getRecommendations(params: {
  scenario: string;
  agent: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}) {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) throw new Error('Failed to get recommendations');
  return response.json();
}