"use client";

import Hero from "@/components/hero";
import { HowItWorks } from "@/components/extra/how-it-works";
import ChatHistory from "@/components/conversation/chat-history";
import { Footer } from "@/components/footer";
import { Features } from "@/components/extra/features";

export default function Dashboard() {
  return (
    <div>
      {" "}
      <div>
        <Hero />
      </div>
      <div className="pb-15">
        <ChatHistory />
      </div>
      <div className="h-screen">
        <Features />
      </div>
      <div className="mt-10">
        <HowItWorks />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
