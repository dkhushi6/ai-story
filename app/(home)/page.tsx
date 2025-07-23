"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero";
import { MessageSquare } from "lucide-react";
import { HowItWorks } from "@/components/extra/how-it-works";
import ChatHistory from "@/components/conversation/chat-history";

export default function Dashboard() {
  return (
    <div>
      \{" "}
      <div>
        <Hero />
      </div>
      <div className="pb-10">
        <ChatHistory />
      </div>
      <div>
        <HowItWorks />
      </div>
    </div>
  );
}
