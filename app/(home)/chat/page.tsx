"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal } from "lucide-react";
import axios from "axios";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await axios.post("/api/text-ai", { input });
      const output = res.data.output;

      setMessages((prev) => [...prev, { role: "ai", content: output }]);
    } catch (err) {
      console.error("Failed to fetch response:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: " Error fetching response." },
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-4xl h-[90vh] mx-auto border rounded-xl overflow-hidden shadow-md mt-5">
      {/* Make sure ScrollArea fills available space */}
      <div className="flex-1 overflow-y-auto">
        <ScrollArea className="h-full p-4 space-y-4 bg-background">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <Avatar>
                  <AvatarImage src="/bot.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <Card
                className={`max-w-xs ${
                  msg.role === "user"
                    ? "bg-violet-200 dark:bg-violet-800"
                    : "bg-muted"
                }`}
              >
                <CardContent className="p-3 text-sm whitespace-pre-line">
                  {msg.content}
                </CardContent>
              </Card>
              {msg.role === "user" && (
                <Avatar>
                  <AvatarImage src="/user.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </ScrollArea>
      </div>

      {/* Input area fixed at bottom */}
      <div className="p-4 border-t flex items-center gap-2 bg-background">
        <Input
          placeholder="Write your story idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} className="p-2">
          <SendHorizonal size={18} />
        </Button>
      </div>
    </div>
  );
}
