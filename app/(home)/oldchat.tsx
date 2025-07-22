"use client";
import { useSearchParams } from "next/navigation";
import { ResizableChat } from "@/components/extra/resizeable-bar";
export default function Home() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  return (
    <div className="h-screen">
      <ResizableChat initialPrompt={initialPrompt} />
    </div>
  );
}
