
export async function extractTasks(meetingText) {
    const res = await fetch("/api/extract-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetingText }),
    });
  
    const data = await res.json();
  
    if (res.ok) return data.tasks;
    else throw new Error(data.error || "Unknown error");
  }
  
function cleanTasks(rawOutput) {
   // Remove leading bullets or asterisks only
   let cleaned = rawOutput.replace(/^[\s•*-]+\s*/gm, '');
  
   return cleaned.trim() || "No valid tasks found";
  }