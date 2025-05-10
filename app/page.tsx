"use client";
import { useState } from "react";
import { extractTasks } from "@/lib/ai";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const extractedTasks = await extractTasks(text);
    setTasks(extractedTasks.split("\n"));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meeting Notes to Tasks</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste meeting notes..."
          rows={8}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Extract Tasks
        </button>
      </form>
      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Extracted Tasks:</h2>
        {tasks.length > 0 ? (
          <ul className="list-disc pl-5">
            {tasks.map((task, i) => (
              <li key={i} className="py-1">
                {task}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks extracted yet.</p>
        )}
      </div>
    </div>
  );
}