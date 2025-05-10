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
        "Authorization": "Bearer sk-3f520b1f84184dd1ac9f1ad40bd0fc5e"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  }