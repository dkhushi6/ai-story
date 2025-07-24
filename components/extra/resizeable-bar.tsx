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
import { Message } from "ai";
import { useParams } from "next/navigation";
import { ObjectId } from "bson";
import LeftPannel from "../conversation/left-pannel";
import RightPannel from "../conversation/right-pannel";
import { handleSubmitClick } from "@/app/features/handleSubmitClick";
import { handleReload } from "./handleReload";
type ImageType = {
  base64Data: string;
  mimeType: string;
};
export function ResizableChat() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<ImageType | undefined>();
  const [imageLoading, setImageLoading] = useState(false);

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

  const handleGenerateImage = async () => {
    if (messages[messages.length - 1].role !== "assistant") {
      console.log(
        "cannot generate image ...last msg is not from assistant but user"
      );
      return;
    }
    console.log("msg content", messages[messages.length - 1].content);

    const res = await axios.post("/api/image", {
      prompt: messages[messages.length - 1].content,
    });
    if (res.data.imageUrl) {
      setImageLoading(true);

      setImageUrl(res.data.imageUrl);
    }
    //saving the url generated
    if (!chatId) {
      console.log("chatid not found");
    }
    console.log("Image URL data:", res.data.imageUrl);

    const response = await axios.post("/api/fetch-image/save-image", {
      id: chatId,
      imageUrl: res.data.imageUrl,
    });

    console.log(response.data);
    if (response.data.status === "ok") {
      setImageUrl(res.data.imageUrl);
      console.log("image saved successfully");
    } else {
      console.error("failed to save image");
    }
  };
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
        await handleReload({ id, setConvo, setImageUrl });
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
          handleGenerateImage={handleGenerateImage}
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
