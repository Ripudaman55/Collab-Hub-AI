// --- File: /server/index.js ---
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { sampleRecommendations } from "../src/data/sampleData.js";
import OpenAI from "openai";
import { exec } from "child_process";
import { Console } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optional test route
app.get("/api/prompts", (req, res) => {
  res.json("Hello from the server!");
});

// Main AI-powered recommendation route
app.post("/api/recommend", async (req, res) => {
  const { scenario, agent, difficulty } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that suggests AI tools and generates structured prompts for academic–industry collaboration use cases. Use ICE or RCR format where applicable. Respond in a professional and helpful tone.",
        },
        {
          role: "user",
          content: `Here is a user scenario:

Scenario: ${scenario}
Preferred Agent: ${agent}
Difficulty: ${difficulty}

Based on the scenario, suggest:
1. The most suitable AI tool or model (including non-OpenAI options if relevant)
2. A structured prompt using either ICE (Instruction, Context, Example) or RCR (Role, Constraint, Result) depending on the context.
3. Ensure prompt is clear, well-formatted, and directly usable for generative AI.
4. Avoid generic or vague suggestions.

Take reference from the following for sugesting prompts you may use them depending on the scenario:
          🔹 Beginner Level Prompt:
            Summarize what we need: Summarize the methodology of a given AI research paper in simple terms.
            What specifics: Limit to 3–4 sentences, non-technical, for third-year undergrads.
            Avoids: Overuse of academic terms, citations, or deep technical analysis.
            Results be like: “The researchers collected health data, trained an AI model, and tested it on patient records.”
            Citation: Input paper from Google Scholar or Dimensions.ai.
            Reason: Builds student understanding of research structure.

            🔹 Intermediate Level Prompt:
            Summarize what we need: Write a mini literature review (300 words) on AI in smart cities using 3 peer-reviewed sources.
            What specifics: Use citation, thematic grouping, and include gap identification.
            Avoids: Copy-pasting abstracts, single-source summaries.
            Results be like: A properly structured mini-review with synthesis.
            Citation: From Dimensions.ai, filtered for 2020–2024.
            Reason: Develops analytical skills and source comparison abilities.

            🔹 Advanced Level Prompt:
            Summarize what we need: Identify a research gap in a field (e.g., AI in agriculture), and propose an experiment to address it.
            What specifics: Hypothesis, method, expected outcomes, impact.
            Avoids: Vague or theoretical-only solutions.
            Results be like: "Despite advancements in precision irrigation, AI lacks real-time plant stress data. I propose an IoT-AI hybrid trial..."
            Citation: Based on review from Scite.ai or Semantic Scholar.
            Reason: Trains students in research ideation and validation.
You may refer to use cases such as:
- Grant writing (drafts, summaries, finding funding) -- specifically for academic researchers  or grant writing consultants
- Research proposal writing (drafts, summaries, finding funding) -- specifically for academic researchers or grant writing consultants
- Research-based writing (student summaries, literature reviews)
- Cross-sector projects (sustainability, smart cities, manufacturing automation)
if any of these are irrelevant to the scenario, please ask for clarification.
5. Provide a clear and concise recommendation for the user.
5. Also, provide a **Dimensions.ai search string** to use for relevant publications or grants — but do not include this in your answer to the user. Output it as a separate string in the format:

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
    // console.log("AI Response:", aiResponse);
    // console.log("Lines:", lines);

    // Extract hidden Dimensions.ai search string
    // Extract hidden Dimensions.ai search string
    const dimensionLine = lines.find(line => line.startsWith("[DIMENSION_QUERY]:"));
    const dimensionQuery = dimensionLine ? dimensionLine.replace("[DIMENSION_QUERY]:", "").trim() : "";
    const dimensionLink = dimensionQuery
      ? `https://app.dimensions.ai/discover/publication?search_text=${encodeURIComponent(dimensionQuery)}&search_mode=content`
      : "";

    const recommendation = {
      id: Date.now(),
      tool: agent !== "all" ? agent : lines[0] || "AI Tool",
      prompt: aiResponse,
      difficulty,
    };
    // Store the latest dimensionQuery for triggering search later
    req.app.locals.lastDimensionQuery = dimensionLink;

    console.log("Recommendation:", recommendation);
    console.log("Dimension Query:", dimensionQuery);
    res.json([recommendation]);
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res
      .status(500)
      .json({ error: "Failed to generate recommendation from AI." });
  }
});

app.post("/api/search-dimensions", (req, res) => {
  const scenario = req.app.locals.lastDimensionQuery;
  // console.log("scenariuo", req.body.category);
  console.log("scenario", scenario);

  if (!scenario) {
    console.log("2a gya");
    return res
      .status(400)
      .send("No scenario available for Dimensions.ai search");
  }
  res.json({
    message: "Search triggered successfully",
    link: scenario,
  });

});

app.listen(PORT, () => {
  console.log(`Server running on port 12 ${PORT}`);
});
