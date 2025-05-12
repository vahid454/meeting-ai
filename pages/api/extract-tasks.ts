// pages/api/extract-tasks.ts

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_VERSION = "v1beta";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

  const { meetingText } = req.body;

  const prompt = `Extract ONLY task entries in this exact format:
[Task Description] [@Assignee]

Input Example: "John will fix the login page by Friday"
Output Example: [Fix login page] [@John]

Rules:
- Only include valid task entries
- Exclude all other text
- Never add bullet points or numbers
- If no clear task, return "No tasks found"

Meeting Notes:
${meetingText}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topP: 1,
          },
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = cleanTasks(raw);

    res.status(200).json({ tasks: cleaned });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

function cleanTasks(text: string) {
  return text.replace(/^[\s•*-]+\s*/gm, "").trim() || "No valid tasks found";
}
