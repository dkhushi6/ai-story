"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/chat/new?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-purple-100 to-fuchsia-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 flex items-center justify-center px-4 py-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Quote */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-12 leading-tight">
          Stories spark wonder —<br />
          <span className="text-fuchsia-600 dark:text-fuchsia-400">
            let's create one together.
          </span>
        </h1>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 p-2 bg-white/40 dark:bg-zinc-800/50 backdrop-blur-md rounded-full border border-zinc-200 dark:border-white/20 shadow-inner"
          >
            <Input
              type="text"
              placeholder="Enter a story theme or idea (e.g. 'magic garden', 'space whale', 'robot school')..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent border-none text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-white/50 rounded-full px-6 py-4 text-lg focus:ring-2 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-600"
            />
            <Button
              type="submit"
              className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Story
            </Button>
          </form>
        </div>

        {/* Suggested Themes */}
        <div className="mt-16">
          <h2 className="text-xl text-zinc-700 dark:text-zinc-300 mb-6 font-medium">
            Or choose a popular Titles:
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: "🪐", text: "Space Adventure" },
              { emoji: "🧚", text: "Fairy Tale" },
              { emoji: "🐳", text: "Ocean Quest" },
              { emoji: "🌲", text: "Forest Mystery" },
              { emoji: "🤖", text: "Robot Friends" },
              { emoji: "💖", text: "Friendship" },
            ].map((promptObj, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(promptObj.text.toLowerCase());
                }}
                className="px-6 py-3 bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-zinc-700 rounded-full text-zinc-800 dark:text-white hover:bg-white/40 dark:hover:bg-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
              >
                <span className="mr-2">{promptObj.emoji}</span>
                {promptObj.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
