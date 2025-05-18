import { Recommendation } from "../types/index.ts";

export const aiAgents = [
  { value: "all", label: "All AI Agents" },
  { value: "gpt-3.5-turbo", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "dimensions", label: "Dimensions.ai" },
  { value: "gpt4", label: "GPT-4" },
];

export const difficultyLevels = [
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const sampleRecommendations: Recommendation[] = [
  {
    tool: "ChatGPT",
    category: "Grant Writing",
    difficulty: "basic",
    prompt: `Prompt: Drafting a Collaborative Grant Proposal
      Summarize what we need: Generate a 500-word draft grant proposal for a joint academic–industry project.
      What specifics: Proposal should include problem statement, objectives, impact, mutual benefits, and industrial partner's contribution.
      Avoids: Overly generic goals or missing stakeholder roles.
Results be like: A structured draft with 5 sections ready to be reviewed and refined.
Any other detail: Proposal should highlight innovation and real-world relevance.
Citation: Base structure on templates from Grantable.ai or previous successful submissions.
Reason: Streamlines the proposal-writing process and ensures alignment with grant evaluation criteria.`,
  },
  {
    tool: "Claude",
    category: "Research Planning",
    difficulty: "intermediate",
    prompt: `Summarize what we need: Identify a research gap in a field (e.g., AI in agriculture), and propose an experiment to address it.
  What specifics: Hypothesis, method, expected outcomes, impact.
  Avoids: Vague or theoretical-only solutions.
  Results be like: "Despite advancements in precision irrigation, AI lacks real-time plant stress data. I propose an IoT-AI hybrid trial..."
  Citation: Based on review from Scite.ai or Semantic Scholar.
  Reason: Trains students in research ideation and validation.`,
  },
  {
    tool: "Dimensions.ai",
    category: "Partnership Research",
    difficulty: "advanced",
    prompt: `Summarize what we need: Find potential industry partners for our research on [specific topic].
  What specifics: Companies actively publishing or patenting in this area in the last 3 years.
  Avoids: Companies without recent activity or irrelevant focus areas.
  Results be like: A ranked list of companies with publication counts, key researchers, and contact pathways.
  Any other detail: Focus on mid-to-large size companies with established R&D departments.
  Reason: Identifies partners with proven interest and capacity for research collaboration.`,
  },
  {
    tool: "GPT-4",
    category: "Research Translation",
    difficulty: "advanced",
    prompt: `Summarize what we need: Translate our academic findings on [topic] into industry-relevant language.
  What specifics: Convert our paper's abstract and conclusions into business benefits, ROI potential, and implementation pathways.
  Avoids: Academic jargon, overpromising results, or vague value propositions.
  Results be like: A one-pager with clear sections on business challenge, solution, implementation, and competitive advantage.
  Any other detail: Include suggested metrics for industry partners to measure success.
  Reason: Bridges communication gap between researchers and potential industry adopters.`,
  },
];
