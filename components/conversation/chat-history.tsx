"use client";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatHistory = () => {
  const router = useRouter();
  const [response, setResponse] = useState([]);
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
  if (!response) {
    return <p>loading</p>;
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Recent Chats</h2>
        <span className="text-sm text-muted-foreground">
          {response.length} conversation{response.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Chat Grid */}
      {response.length > 0 ? (
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
                  <MessageSquare className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-transform" />
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
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No recent chats to show.
        </p>
      )}
    </div>
  );
};

export default ChatHistory;
