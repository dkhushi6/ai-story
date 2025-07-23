"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { Send, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { generateId, Message } from "ai";
import { useParams } from "next/navigation";
import { ObjectId } from "bson";
import LeftPannel from "../conversation/left-pannel";
import RightPannel from "../conversation/right-pannel";
import { handleSubmitClick } from "@/app/features/handleSubmitClick";
import { handleReload } from "./handleReload";

export function ResizableChat() {
  const [chatId, setChatId] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string;
  const [convo, setConvo] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      initialMessages: convo,
      onFinish: async (message) => {
        if (!chatId) {
          console.error("chatId missing");
        }

        await axios.post("/api/fetch/save-chats", {
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
    if (id || id !== "new") {
      const handleFetchReload = async () => {
        await handleReload({ id, setConvo });
      };
      handleFetchReload();
    }
  }, [id]);

  useEffect(() => {
    const getPrompt = async () => {
      const prompt = await localStorage.getItem("prompt");
      console.log("input prompt:", prompt);
      if (prompt) {
        setInput(prompt);
        handleSubmit();
      }
    };
    getPrompt();
  }, []);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen rounded-lg border"
    >
      {/* Left Panel – User Messages */}
      <ResizablePanel defaultSize={33} minSize={20} maxSize={50}>
        <LeftPannel
          messages={messages}
          input={input}
          handleSubmitClick={() =>
            handleSubmitClick({ chatId: chatId!, input, handleSubmit })
          }
          handleInputChange={handleInputChange}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel – AI Responses */}
      <ResizablePanel defaultSize={67}>
        <RightPannel messages={messages} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
