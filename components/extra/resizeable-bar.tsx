"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { Send, SendHorizonal, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { CoreMessage, generateId, Message } from "ai";
import { useParams, useSearchParams } from "next/navigation";
import { ObjectId } from "bson";

export function ResizableChat() {
  const [chatId, setChatId] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string;
  const [convo, setConvo] = useState<Message[]>([]);
  // const searchParams = useSearchParams();
  // const initialPrompt = searchParams.get("prompt");
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      initialMessages: convo,
      onFinish: async (message) => {
        if (!chatId) {
          console.error("chatId missing");
        }
        const res = await axios.post("/api/fetch/save-chats", {
          message,
          id: chatId,
        });
      },
    });
  //params id get n set
  useEffect(() => {
    if (!id || id === "new") {
      const idg = new ObjectId().toHexString();
      setChatId(idg);

      console.log("Generated new chatId:", idg);
    } else {
      setChatId(id);
    }

    const handleReload = async () => {
      try {
        const res = await axios.post("/api/fetch/fetch-chats", {
          chatId: id,
        });
        console.log("Fetched:", res.data.chat?.message);
        setConvo(res.data.chat?.message || []);
      } catch (err) {
        console.log("error fetching data", err);
        setConvo([]); // fallback
      }
    };

    if (id && id !== "new") {
      handleReload();
    }
  }, [id]);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  // useEffect(() => {
  //   if (initialPrompt) {
  //     setInput(initialPrompt);
  //     handleSubmit();
  //   }
  // }, [initialPrompt]);

  // saving chats
  const handleSubmitClick = async () => {
    console.log(chatId);
    if (!chatId) {
      console.log("chatid is not set");
    }
    const userMsgFormate = {
      id: generateId(),
      role: "user",
      content: input,
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
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen rounded-lg border"
    >
      {/* Left Panel – User Messages */}
      <ResizablePanel defaultSize={33} minSize={20} maxSize={50}>
        <div className="flex flex-col h-full">
          {/* Scrollable Message Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages
              .filter((msg) => msg.role === "user")
              .map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 p-1 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center font-bold shadow-md">
                      <UserRound className="w-5" />
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white p-3 rounded-xl max-w-sm shadow-md">
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <p
                          key={`${message.id}-${i}`}
                          className="text-sm leading-relaxed"
                        >
                          {part.text}
                        </p>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Sticky Input at Bottom */}
          <form className="sticky bottom-0  p-4 border-t bg-muted rounded-2xl border-muted mb-19    ">
            <div className="flex items-center gap-2 px-4 py-2 ">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Say something..."
                className="flex-1 py-2 px-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmitClick();
                  }
                }}
              />

              <button
                type="submit"
                className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white hover:opacity-90 transition-all"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel – AI Responses */}
      <ResizablePanel defaultSize={67}>
        <div className="flex flex-col items-center h-full w-full max-w-4xl mx-auto px-6 py-4">
          <div className="flex-1 w-full overflow-y-auto space-y-6">
            {messages
              .filter((msg) => msg.role === "assistant")
              .map((message) => {
                const allTextParts = message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("\n");

                const [title, ...bodyLines] = allTextParts.split("\n");
                const body = bodyLines.join("\n");

                return (
                  <div
                    key={message.id}
                    className="w-full bg-white dark:bg-zinc-900 border border-muted rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* Story Image */}
                    <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-900 dark:to-fuchsia-800 flex items-center justify-center text-3xl font-bold text-white">
                      📖
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        {title}
                      </h2>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
