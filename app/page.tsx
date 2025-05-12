"use client";

import { useState } from "react";
import { extractTasks } from "@/lib/ai";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const extractedTasks = await extractTasks(text);
    setTasks(extractedTasks.split("\n"));
  };

  return (
    <div className="relative p-8 max-w-2xl mx-auto text-white">
      <ParticleBackground />
      <div className="absolute inset-0 bg-black opacity-40 z-[-1]" />
      
      <h1 className="text-3xl font-bold text-center mb-6">Meeting Notes to Tasks</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <textarea
          className="w-full p-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste meeting notes..."
          rows={8}
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        >
          Extract Tasks
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-center">Extracted Tasks:</h2>
        {tasks.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {tasks.map((task, i) => (
              <li key={i} className="bg-gray-700 p-3 rounded-lg shadow-md">
                {task}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No tasks extracted yet.</p>
        )}
      </div>
    </div>
  );
}
