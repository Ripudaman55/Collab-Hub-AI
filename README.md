# 🤖 CollabAI Hub – AI-Powered Collaboration Platform

Live Site: [captoneaicollaboration.vercel.app](https://captoneaicollaboration.vercel.app)

---

## 🚀 Overview

**CollabAI Hub** is a full-stack AI-powered recommendation platform designed to enhance **academic–industry collaboration**. It intelligently suggests the most suitable AI tools and structured prompt formats (ICE, RCR) for real-world use cases across research, education, grant writing, sustainability, and more.

---

## 🎯 Key Features

- ✨ AI-driven tool & prompt recommendations using OpenAI
- 🧠 Prompt examples generated based on scenario complexity and target agent
- 🌐 Direct search link to **Dimensions.ai** for related academic research
- ⚡ Built using Vite + React + TailwindCSS
- 🌱 Deployed on Vercel with serverless API routes

---

## 📁 Project Structure

project/
├── api/ # Serverless functions (Vercel)
│ └── recommend.js # AI-powered prompt generation
├── src/
│ ├── components/ # UI components (Header, Form, Results)
│ ├── types/ # TypeScript type definitions
│ ├── data/ # Sample data for fallback/demo
│ ├── App.tsx # Root component logic
│ └── main.tsx # Entry point
├── public/
├── index.html
├── vite.config.ts
└── README.md

## 🛠 Tech Stack

| Frontend       | Backend (API)     | Deployment |
|----------------|------------------|------------|
| React + Vite   | OpenAI API (via Vercel function) | Vercel |

---


🧪 Usage
Enter a scenario (e.g., "AI for sustainability in textiles")

Select AI agent and difficulty level

Get tool suggestions with structured prompts

Click "Search in Dimensions" to explore related publications

📸 Screenshot

🧠 Credits
Created by Ripudaman Thind & Team
Deakin University Capstone Project — 2025
