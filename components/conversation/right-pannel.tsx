"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Copy, Download } from "lucide-react";
import { RightPannelProp } from "@/app/features/message-type";
import Image from "next/image";

const RightPannel = ({
  messages,
  imageUrl,
  setImageLoading,
  imageLoading,
}: RightPannelProp) => {
  useEffect(() => {
    console.log("Received imageUrl in RightPannel:");
  }, [imageUrl?.base64Data]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  //image src
  useEffect(() => {
    if (imageUrl?.base64Data && imageUrl?.mimeType) {
      const byteString = atob(imageUrl.base64Data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: imageUrl.mimeType });
      const objectUrl = URL.createObjectURL(blob);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageUrl]);

  const lastAssistantMessage = [...messages]
    .slice()
    .reverse()
    .find((msg) => msg.role === "assistant");

  let title = "";
  let body = "";

  if (lastAssistantMessage?.parts && lastAssistantMessage.parts.length > 0) {
    const allTextParts = lastAssistantMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n");
    const [firstLine, ...restLines] = allTextParts.split("\n");
    title = firstLine.trim();
    body = restLines.join("\n").trim();
  }

  const fullContent = title + "\n" + body;

  return (
    <div className="flex flex-col items-center h-full w-full mx-auto px-6 py-4">
      {/* Story Image */}
      <div className="relative group w-full h-100 mb-4 rounded-2xl overflow-hidden border border-border bg-[rgb(57,48,40)] dark:bg-[#ffe0c2] flex items-center justify-center">
        {imageUrl?.base64Data && imageUrl?.mimeType && imageSrc ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
              </div>
            )}
            <Image
              src={imageSrc}
              alt="generated"
              width={800}
              height={400}
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: imageLoading ? 0 : 1 }}
              onLoad={() => setImageLoading(false)}
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
        {lastAssistantMessage && (
          <div
            key={lastAssistantMessage.id}
            className="w-full overflow-hidden shadow-lg"
          >
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
                {body || lastAssistantMessage.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPannel;
