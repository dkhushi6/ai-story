"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";

export default function Dashboard() {
  // const [prompt, setPrompt] = useState("");
  // const router = useRouter();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (prompt.trim()) {
  //     router.push(`/chat?prompt=${encodeURIComponent(prompt)}`);
  //   }
  // };

  return (
    // <div className="flex items-center justify-center h-screen">
    //   <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-xl">
    //     <Input
    //       placeholder="Enter your story idea..."
    //       value={prompt}
    //       onChange={(e) => setPrompt(e.target.value)}
    //     />
    //     <Button type="submit">Generate</Button>
    //   </form>
    // </div>
    <div>
      <Hero />
    </div>
  );
}
