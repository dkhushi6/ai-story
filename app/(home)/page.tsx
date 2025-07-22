"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [response, setResponse] = useState([]);
  useEffect(() => {
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
    <div>
      <div>
        <Button
          onClick={() => {
            router.push("/chat/new");
          }}
        >
          New chat
        </Button>
      </div>
      {response.length > 0 ? (
        <div>
          {response.map((chat: any) => (
            <div key={chat._id}>
              <div>CHAT-ID: {chat.Id}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>NO RECENT CHATS</p>
      )}
    </div>
  );
}
