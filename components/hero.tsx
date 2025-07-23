"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import SparklesComp from "./extra/sparkles";

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      localStorage.setItem("prompt", prompt);
      router.push("/chat/new");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-500">
      <div>
        <SparklesComp />
      </div>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Quote */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-12 leading-tight tracking-tight">
          Stories spark wonder —<br />
          <span className="text-[#725C52] dark:text-[#ffe0c2] drop-shadow-sm">
            let’s create one together.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-inter font-light max-w-2xl mx-auto">
          Just type an idea — we'll do the rest
        </p>
        {/* Input Section */}
        <div className="max-w-3xl mx-auto my-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-5 p-4 bg-white/50 dark:bg-zinc-800/60 backdrop-blur-lg rounded-full border border-zinc-200 dark:border-white/20 shadow-xl transition-all duration-300"
          >
            <Input
              type="text"
              placeholder="Enter a story theme or idea (e.g. 'magic garden', 'space whale', 'robot school')..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent border-none text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-white/50 rounded-full px-7 py-5 text-lg sm:text-xl focus:ring-2 focus:ring-[#393028] dark:focus:ring-[#ffe0c2] transition-all"
            />
            <Button
              type="submit"
              className="bg-[#393028] dark:bg-[#ffe0c2] text-white dark:text-black px-9 py-5 rounded-full font-semibold text-lg sm:text-xl hover:shadow-glow hover:scale-105 transition-all duration-300"
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
