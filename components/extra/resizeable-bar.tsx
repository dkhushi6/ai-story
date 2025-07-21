"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function ResizableChat() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");
  const hasSubmitted = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialPrompt && !hasSubmitted.current) {
      hasSubmitted.current = true;
      setInput(initialPrompt);
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);
    }
  }, [initialPrompt]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen rounded-lg border"
    >
      {/* Left Panel – User Messages */}
      <ResizablePanel defaultSize={33} minSize={20} maxSize={50}>
        <div className="flex flex-col h-full justify-between p-6 overflow-auto">
          <div className="space-y-2">
            {messages
              .filter((msg) => msg.role === "user")
              .map((message) => (
                <div
                  key={message.id}
                  className="bg-muted text-left p-3 rounded-lg max-w-sm"
                >
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <div key={`${message.id}-${i}`}>{part.text}</div>
                    ) : null
                  )}
                </div>
              ))}
          </div>

          {/* Input */}
          <form ref={formRef} onSubmit={handleSubmit} className="pt-4 mb-20">
            <input
              className="w-full p-2 border rounded"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel – AI Responses */}
      <ResizablePanel defaultSize={67}>
        <div className="flex flex-col h-full p-6 overflow-auto">
          {messages
            .filter((msg) => msg.role === "assistant")
            .map((message) => (
              <div
                key={message.id}
                className="bg-primary/10 text-left p-4 mb-2 rounded-lg max-w-xl"
              >
                {message.parts.map((part, i) =>
                  part.type === "text" ? (
                    <div key={`${message.id}-${i}`}>{part.text}</div>
                  ) : null
                )}
              </div>
            ))}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
