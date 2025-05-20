// --- File: /api/recommend.js ---
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { scenario, agent, difficulty } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that suggests AI tools and generates structured prompts for academic–industry collaboration use cases. Use ICE or RCR format where applicable. Respond in a professional and helpful tone.',
        },
        {
          role: 'user',
          content: `Here is a user scenario:

Scenario: ${scenario}
Preferred Agent: ${agent}
Difficulty: ${difficulty}

Based on the scenario, suggest:
1. The most suitable AI tool or model (including non-OpenAI options if relevant)
2. A structured prompt using either ICE (Instruction, Context, Example) or RCR (Role, Constraint, Result) depending on the context.
3. Ensure prompt is clear, well-formatted, and directly usable for generative AI.
4. Avoid generic or vague suggestions.

Scenarios may include:
- Grant writing (drafts, summaries, finding funding)
- Research proposal writing (drafts, summaries, funding discovery)
- Academic writing (student summaries, literature reviews)
- Cross-sector projects (sustainability, smart cities, manufacturing automation)

5. Also, provide a Dimensions.ai search string to use for relevant publications or grants — but do not include this in your answer to the user. Output it as a separate string in the format:

[DIMENSION_QUERY]: search_text_here

Return your answer in this format:
---
AI Tool: [tool name]

Prompt Example:
[structured prompt]

[DIMENSION_QUERY]: [recommended search string]`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    const lines = aiResponse.split("\n");
    const dimensionLine = lines.find(line => line.startsWith('[DIMENSION_QUERY]:'));
    const dimensionQuery = dimensionLine ? dimensionLine.replace('[DIMENSION_QUERY]:', '').trim() : '';
    const dimensionLink = dimensionQuery
      ? `https://app.dimensions.ai/discover/publication?search_text=${encodeURIComponent(dimensionQuery)}&search_mode=content`
      : '';

    const recommendation = {
      id: Date.now(),
      tool: agent !== 'all' ? agent : lines[0] || 'AI Tool',
      prompt: aiResponse.replace(dimensionLine, '').trim(),
      difficulty,
      link: dimensionLink,
    };

    res.status(200).json([recommendation]);
  } catch (error) {
    console.error('Error from OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate recommendation from AI.' });
  }
}
