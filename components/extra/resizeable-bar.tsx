"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";

import axios from "axios";
import { Message } from "ai";
import { useParams } from "next/navigation";
import { ObjectId } from "bson";
import LeftPannel from "../conversation/left-pannel";
import RightPannel from "../conversation/right-pannel";
import { handleSubmitClick } from "@/app/features/handleSubmitClick";
import { handleReload } from "./handleReload";
import { handleGenerateImage } from "@/app/features/handleGenerateImage";
type ImageType = {
  base64Data: string;
  mimeType: string;
};
export function ResizableChat() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<ImageType | undefined>();
  const [imageLoading, setImageLoading] = useState(false);

  const [count, setCount] = useState(0);
  const params = useParams();
  const id = params.id as string;
  const [convo, setConvo] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      initialMessages: convo,
      //saving the reply from assistent
      onFinish: async (message) => {
        if (!chatId) {
          console.error("chatId missing");
        }

        const res = await axios.post("/api/fetch/save-chats", {
          message,
          id: chatId,
        });
        setCount(res.data.count);
        if (chatId) {
          handleGenerateImage({
            msg: message,
            count: res.data.count,
            chatId,
            setImageLoading,
            setImageUrl,
          });
        } else {
          console.error("Cant find chatId for GeneratingImage");
        }
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
    if (id && id !== "new") {
      const handleFetchReload = async () => {
        await handleReload({ id, setConvo, setImageUrl, setCount });
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
      }
    };
    getPrompt();
  }, [chatId]);

  return (
    <ResizablePanelGroup direction="horizontal" className="  rounded-lg border">
      {/* Left Panel – User Messages */}
      <ResizablePanel defaultSize={33} minSize={20} maxSize={50}>
        <LeftPannel
          messages={messages}
          input={input}
          handleSubmitClick={() =>
            handleSubmitClick({ chatId: chatId!, input, handleSubmit })
          }
          handleInputChange={handleInputChange}
          count={count}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel – AI Responses */}
      <ResizablePanel defaultSize={67}>
        <RightPannel
          imageLoading={imageLoading}
          messages={messages}
          imageUrl={imageUrl}
          setImageLoading={setImageLoading}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
