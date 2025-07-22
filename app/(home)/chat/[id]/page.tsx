"use client";

import { useChat } from "@ai-sdk/react";
import { generateId } from "ai";
import axios from "axios";
import { ObjectId } from "bson";
import { use, useEffect, useState } from "react";

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [chatId, setChatId] = useState<string | null>(null);

  //params id get n set
  useEffect(() => {
    if (!id && id === "new") {
      setChatId(null);

      const idg = new ObjectId().toHexString();
      setChatId(idg);
    } else {
      setChatId(id);
    }
  }, []);
  // saving chats
  const handleSubmitClick = async () => {
    if (!chatId) {
      console.log("chatid is not set");
    }
    const userMsgFormate = {
      id: generateId(),
      role: "user",
      content: "input",
    };
    try {
      const res = await axios.post("/api/fetch/save-chats", {
        message: userMsgFormate,
        id: chatId,
      });

      handleSubmit();

      if (typeof window !== "undefined" && chatId) {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }
    } catch (err) {
      console.log("error fetching data", err);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div>chatID:{chatId}</div>
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <input
        className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
        value={input}
        placeholder="Say something..."
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmitClick();
          }
        }}
      />
    </div>
  );
}
