import { MessagePropType } from "@/app/features/message-type";
import { Book, Send, UserRound } from "lucide-react";
import React from "react";

const LeftPannel = ({
  messages,
  input,
  handleInputChange,
  handleSubmitClick,
  handleGenerateImage,
}: MessagePropType) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages
          .filter((msg) => msg.role === "user")
          .map((message) => (
            <div
              key={message.id}
              className="flex items-start justify-end gap-3"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 p-1 rounded-full  dark:bg-[#ffe0c2]  dark:text-black
 text-white flex items-center justify-center font-bold shadow-md bg-[#393028]"
                >
                  <UserRound className="w-5" />
                </div>
              </div>

              {/* Message Bubble */}
              <div
                className="bg-gradient-to-br bg-[#393028] dark:bg-[#ffe0c2]  dark:text-black
 text-white p-3 rounded-xl max-w-sm shadow-md"
              >
                {message.parts && message.parts.length > 0 ? (
                  message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <p
                        key={`${message.id}-${i}`}
                        className="text-sm leading-relaxed"
                      >
                        {part.text}
                      </p>
                    ) : null
                  )
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Sticky Input at Bottom */}
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
          <button
            type="submit"
            className="p-2 rounded-lg bg-[#393028] dark:bg-[#ffe0c2] text-white dark:text-black hover:opacity-90 transition-all"
            aria-label="Send message"
            onClick={(e) => {
              e.preventDefault();

              handleGenerateImage?.();
            }}
          >
            <Book className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeftPannel;
