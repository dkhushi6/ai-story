"use client";

import { ResizableChat } from "@/components/extra/resizeable-bar";
import { useChat } from "@ai-sdk/react";
import { generateId } from "ai";
import axios from "axios";
import { ObjectId } from "bson";
import { useParams, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Chat() {
  const params = useParams();
  const id = params.id as string;
  const [convo, setConvo] = useState<any[] | null>(null);
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");
  const [chatId, setChatId] = useState<string | null>(null);

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

  // saving chats
  // const handleSubmitClick = async () => {
  //   console.log(chatId);
  //   if (!chatId) {
  //     console.log("chatid is not set");
  //   }
  //   const userMsgFormate = {
  //     id: generateId(),
  //     role: "user",
  //     content: input,
  //   };
  //   try {
  //     const res = await axios.post("/api/fetch/save-chats", {
  //       message: userMsgFormate,
  //       id: chatId,
  //     });

  //     handleSubmit();

  //     if (typeof window !== "undefined" && chatId) {
  //       window.history.replaceState({}, "", `/chat/${chatId}`);
  //     }
  //   } catch (err) {
  //     console.log("error fetching data", err);
  //   }
  // };
  if (!chatId) {
    return <div className="p-6 text-muted-foreground">Loading chat...</div>;
  }
  return (
    <div className="h-screen">
      <ResizableChat />
    </div>
  );
}
