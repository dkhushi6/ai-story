"use client";
import { Message } from "ai";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Copy, Download } from "lucide-react";
import { RightPannelProp } from "@/app/features/message-type";

const RightPannel = ({
  messages,
  imageUrl,
  setImageLoading,
  imageLoading,
}: RightPannelProp) => {
  useEffect(() => {
    console.log("Received imageUrl in RightPannel:");
  }, [imageUrl?.base64Data]);

  return (
    <div className="flex flex-col items-center h-full w-full mx-auto px-6 py-4">
      {/* Story Image */}
      <div className="relative group w-full h-100 mb-4 rounded-2xl overflow-hidden border border-border bg-[rgb(57,48,40)] dark:bg-[#ffe0c2] flex items-center justify-center">
        {imageUrl?.base64Data && imageUrl?.mimeType ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
              </div>
            )}
            <img
              src={`data:${imageUrl.mimeType};base64,${imageUrl.base64Data}`}
              alt="generated"
              className="w-full h-full object-cover transition-opacity duration-300"
              onLoad={() => setImageLoading(false)}
              style={{ opacity: imageLoading ? 0 : 1 }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const link = document.createElement("a");
                link.href = `data:${imageUrl.mimeType};base64,${imageUrl.base64Data}`;
                const extension = imageUrl.mimeType.split("/")[1].split(";")[0]; // cleaner
                link.download = `story-image.${extension}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <Download className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <div className="text-5xl font-bold text-white dark:text-black">
            📖
          </div>
        )}
      </div>
      <div className="flex-1 w-full overflow-y-auto space-y-6">
        {messages
          .filter((msg) => msg.role === "assistant")
          .map((message) => {
            let title = "";
            let body = "";

            if (message.parts && message.parts.length > 0) {
              const allTextParts = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("\n");

              const [firstLine, ...rest] = allTextParts.split("\n");
              title = firstLine;
              body = rest.join("\n");
            }
            const fullContent = title + "\n" + body;

            return (
              <div
                key={message.id}
                className="w-full   overflow-hidden shadow-lg "
              >
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {title || "Untitled"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(fullContent)}
                      className="text-muted-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {body || message.content}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightPannel;
