"use client";

import { useChat } from "@ai-sdk/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ResizableChat } from "@/components/extra/resizeable-bar";
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");
  const formRef = useRef<HTMLFormElement>(null); // reference to the form

  // useEffect(() => {

  //   if (initialPrompt) {
  //     setInput(initialPrompt);
  //     handleSubmit();
  //   }
  // }, [initialPrompt]);

  return (
    // <div className="flex flex-col w-full   py-24 mx-auto  stretch">
    //   <div className="flex-1 overflow-y-auto px-4 py-6">
    //     {messages.map((message) => (
    //       <div
    //         key={message.id}
    //         className={`flex w-full ${
    //           message.role === "user" ? "justify-start" : "justify-end"
    //         }`}
    //       >
    //         <div
    //           className={`whitespace-pre-wrap p-3 my-1 rounded-lg max-w-sm ${
    //             message.role === "user"
    //               ? "bg-muted text-right rounded-full"
    //               : ""
    //           }`}
    //         >
    //           {message.parts.map((part, i) =>
    //             part.type === "text" ? (
    //               <div key={`${message.id}-${i}`}>{part.text}</div>
    //             ) : null
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <form ref={formRef} onSubmit={handleSubmit}>
    //     <input
    //       className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-3xl p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl "
    //       value={input}
    //       placeholder="Say something..."
    //       onChange={handleInputChange}
    //     />
    //   </form>
    // </div>
    <div className="h-screen">
      <ResizableChat />
    </div>
  );
}
