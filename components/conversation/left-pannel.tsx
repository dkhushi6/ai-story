"use client";
import { MessagePropType } from "@/app/features/message-type";
import { cn } from "@/lib/utils";
import { Book, Send, UserRound } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const LeftPannel = ({
  messages,
  input,
  handleInputChange,
  handleSubmitClick,
  count,
}: MessagePropType) => {
  useEffect(() => {
    console.log("count in left pannel:", count);
    if (count >= 3) {
      toast.success("Your chat limit is over");
    }
  }, [count]);
  const systemReplies = [
    "Got it! Generating a beautiful story based on your prompt. This includes crafting the storyline and creating a visual illustration. Please note that the image may take a few moments to load — thanks for your patience!",
    "Understood! Editing your story now based on your latest input. We're updating the plot, dialogue, and visuals to match your changes. Feel free to keep refining — you can make up to 3 edits to perfect your tale.",
    "Thank you! You've reached the maximum number of edits. Your story is now finalized and ready to be downloaded, shared, or read again anytime.",
  ];

  return (
    <div
      className="flex flex-col h-[calc(100vh-69px)]" // full height minus navbar
    >
      {" "}
      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages
          .filter((msg) => msg.role === "user")
          .map((message, idx) => (
            <React.Fragment key={message.id}>
              {/* User message bubble */}
              <div className="flex items-start justify-end gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 p-1 rounded-full dark:bg-[#ffe0c2] dark:text-black text-white flex items-center justify-center font-bold shadow-md bg-[#393028]">
                    <UserRound className="w-5" />
                  </div>
                </div>
                <div className="bg-gradient-to-br bg-[#393028] dark:bg-[#ffe0c2] dark:text-black text-white p-3 rounded-xl max-w-sm shadow-md">
                  {message.parts && message.parts.length > 0 ? (
                    message.parts
                      .filter((part) => part.type === "text")
                      .map((part, i) => (
                        <p
                          key={`${message.id}-${i}`}
                          className="text-sm leading-relaxed"
                        >
                          {part.text}
                        </p>
                      ))
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>

              {/* System reply after each user message */}
              {idx < 3 && (
                <div className="bg-muted text-muted-foreground p-4 rounded-xl max-w-md shadow-lg border border-border text-sm leading-relaxed backdrop-blur-sm">
                  {systemReplies[idx]}
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
      {/* Sticky Input at Bottom */}
      <div className={cn("", count >= 3 ? "hidden" : "")}>
        <form className="sticky bottom-0 p-4 bg-muted border-t border-gray-200 dark:border-muted shadow-md rounded-t-2xl ">
          <div className="flex items-center gap-2 px-4 py-2 ">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Say something..."
              className="flex-1 py-2 px-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitClick();
                }
              }}
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#393028] dark:bg-[#ffe0c2] text-white dark:text-black hover:opacity-90 transition-all"
              aria-label="Send message"
              onClick={(e) => {
                e.preventDefault();
                handleSubmitClick();
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeftPannel;
