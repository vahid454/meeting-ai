
  export async function extractTasks(meetingText) {
    const prompt = `
    Extract tasks in this format: [Task] [Assignee] [Deadline].  
    Example: "We need to fix the login page by Monday" → [Fix login page] [@Dev] [2024-05-20]  
    ---  
    ${meetingText}
    `;
  
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });
  
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    
    // DeepSeek response structure is different from OpenAI
    return data.choices?.[0]?.message?.content || "No tasks extracted";
  }