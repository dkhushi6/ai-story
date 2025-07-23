import { MessagePropType } from "@/app/features/message-type";
import { Message } from "ai";
import React from "react";
type MessageProp = {
  messages: Message[];
};
const RightPannel = ({ messages }: MessageProp) => {
  return (
    <div className="flex flex-col items-center h-full w-full max-w-4xl mx-auto px-6 py-4">
      <div className="flex-1 w-full overflow-y-auto space-y-6">
        {messages
          .filter((msg) => msg.role === "assistant")
          .map((message) => {
            let title = "";
            let body = "";

            if (message.parts && message.parts.length > 0) {
              const allTextParts = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("\n");

              const [firstLine, ...rest] = allTextParts.split("\n");
              title = firstLine;
              body = rest.join("\n");
            }

            return (
              <div
                key={message.id}
                className="w-full  border border-muted rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Story Image */}
                <div className="w-full h-64 bg-[#393028] dark:bg-[#ffe0c2] text-white dark:text-black flex items-center justify-center text-3xl font-bold">
                  📖
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {title || "Untitled"}
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {body || message.content}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightPannel;
