"use client";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ChatHistory = () => {
  const router = useRouter();
  const [response, setResponse] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  useEffect(() => {
    localStorage.setItem("prompt", "");

    const handleUserchats = async () => {
      try {
        const res = await axios.get("/api/fetch/fetch-chats");
        if (!res) {
          console.error("res not found ");
        }
        console.log(res.data);
        setResponse(res.data.chats);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    handleUserchats();
  }, []);
  const handleClear = async () => {
    try {
      const res = await axios.delete("/api/fetch/fetch-chats");
      console.log(res.data);
      setResponse([]);
      window.location.reload();
    } catch (err) {
      console.log("error fetching data", err);
    }
  };
  if (!response) {
    return <p>loading</p>;
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
      {/* Header */}

      {/* Chat Grid */}
      {response.length > 0 ? (
        <div>
          <div className="flex items-center justify-between pb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Recent Chats
            </h2>
            <div className="gap-5 flex items-center">
              <span className="text-sm text-muted-foreground">
                {response.length} conversation{response.length !== 1 ? "s" : ""}
              </span>
              <Button onClick={handleClear}>Clear All</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {response.map((chat: any, index: number) => (
              <div
                key={chat._id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="animate-fade-in-up"
              >
                <div
                  onClick={() => router.push(`/chat/${chat._id}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-muted bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.015]"
                >
                  {/* Header Image or Icon */}
                  <div className="w-full h-36 bg-muted flex items-center justify-center border-b border-muted">
                    {chat.imageUrl?.[0]?.base64Data ? (
                      <img
                        src={`data:${chat.imageUrl[0].mimeType};base64,${chat.imageUrl[0].base64Data}`}
                        alt="chat-thumbnail"
                        className="w-full h-full object-cover  group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {chat.name || "Untitled Chat"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated:{" "}
                      {chat.updatedAt
                        ? new Date(chat.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground text-center py-10 flex flex-col items-center space-y-4">
          <p>No recent chats to show.</p>
          <p>Start a new conversation to begin chatting!</p>
          <Button
            onClick={() => router.push("/chat/new")} // or your desired route
            className="scale-105 transition"
          >
            + New Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
