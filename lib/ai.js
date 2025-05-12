
const MODEL_NAME = "gemini-1.5-flash-latest";  // Currently most stable
const API_VERSION = "v1beta";  // Works with both v1 and v1beta
export async function extractTasks(meetingText) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");
  
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
              topP: 1
            }
          }),
        }
      );
  
      const data = await response.json();
      console.log("Full Response:", JSON.stringify(data, null, 2));
  
      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }
        // Usage:
        const rawOutput = data.candidates[0].content.parts[0].text;
        const cleanedTasks = cleanTasks(rawOutput);
        return cleanedTasks;

    } catch (error) {
      console.error("Request Failed:", error);
      return `Error: ${error.message}`;
    }
  }


function cleanTasks(rawOutput) {
   // Remove leading bullets or asterisks only
   let cleaned = rawOutput.replace(/^[\s•*-]+\s*/gm, '');
  
   return cleaned.trim() || "No valid tasks found";
  }