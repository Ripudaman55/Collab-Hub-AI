// --- File: /api/recommend.js ---
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  if (
    !req.body ||
    !req.body.scenario ||
    !req.body.agent ||
    !req.body.difficulty
  ) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const { scenario, agent, difficulty } = req.body;
  console.log("Received request:", { scenario, agent, difficulty });
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that suggests AI tools and generates structured prompts for academic–industry collaboration use cases. Use ICE or RCR format where applicable. Respond in a professional and helpful tone. If you dont get the input right ask the user to clarify." +
            "give a little more context. Use the resaerch work given 'https://github.com/Ripudaman55/Capstone-.git' as a reference to prompts and all give user more reliable infomation for promts and all. ",
        },
        {
          role: "user",
          content: `Here is a user scenario:

Scenario: ${scenario}
Preferred Agent: ${agent}
Difficulty: ${difficulty}

Based on the scenario, suggest:
1. The most suitable AI tool or model (including non-OpenAI options if relevant)
2. A structured prompt using either ICE (Instruction, Context, Example) or RCR (Role, Constraint, Result) or just give sentense depending on the context.
3. Ensure prompt is clear, well-formatted, and directly usable for generative AI.
4. Avoid generic or vague suggestions.

Scenarios may include:
- Grant writing (drafts, summaries, finding funding)
- Research proposal writing (drafts, summaries, funding discovery)
- Academic writing (student summaries, literature reviews)
- Cross-sector projects (sustainability, smart cities, manufacturing automation)

5. Also, provide a Dimensions.ai search string to use for relevant publications or grants, where it will become the search string for research work so keep is consisce related to scenario — but do not include this in your answer to the user. Output it as a separate string in the format:

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
      temperature: 0.21,
    });

    const aiResponse = completion.choices[0].message.content;
    const lines = aiResponse.split("\n");
    const dimensionLine = lines.find((line) =>
      line.startsWith("[DIMENSION_QUERY]:")
    );
    const dimensionQuery = dimensionLine
      ? dimensionLine.replace("[DIMENSION_QUERY]:", "").trim()
      : "";
    const dimensionLink = dimensionQuery
      ? `https://app.dimensions.ai/discover/publication?search_text=${encodeURIComponent(
          dimensionQuery
        )}&search_mode=content`
      : "";

    console.log("AI Response:", aiResponse);
    console.log("Lines:", lines);
    console.log("Dimension Query:", dimensionQuery);
    console.log("Dimension Link:", dimensionLink);

    const recommendation = {
      id: Date.now(),
      tool: agent !== "all" ? agent : lines[0] || "AI Tool",
      prompt: aiResponse.replace(dimensionLine, "").trim(),
      difficulty,
      link: dimensionLink,
    };

    res.status(200).json([recommendation]);
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res
      .status(500)
      .json({ error: "Failed to generate recommendation from AI." });
  }
}
