import { Message } from "ai";
import axios from "axios";
import { toast } from "sonner";
import { GenerateImageTypeProps } from "./message-type";

export const handleGenerateImage = async ({
  msg,
  count,
  setImageLoading,
  setImageUrl,
  chatId,
}: GenerateImageTypeProps) => {
  console.log("GEneratedimg count:", count);
  if (count > 1) {
    toast.success("story image can only be generated once in a chat");
    return;
  }
  try {
    if (msg.role !== "assistant") {
      console.log(
        "Cannot generate image... Last message is not from assistant but from user."
      );
      return;
    }

    console.log("Generating image for message content:", msg.content);

    const res = await axios.post("/api/image", {
      prompt: msg.content,
    });

    if (res.data.imageUrl) {
      setImageLoading(true);
      setImageUrl(res.data.imageUrl);
    } else {
      console.warn("No image URL returned from /api/image.");
    }

    if (!chatId) {
      console.warn("Chat ID not found. Skipping image save.");
      return;
    }

    console.log("Saving image URL:", res.data.imageUrl);

    const response = await axios.post("/api/fetch-image/save-image", {
      id: chatId,
      imageUrl: res.data.imageUrl,
    });

    if (response.data.status === "ok") {
      setImageUrl(res.data.imageUrl);
      console.log("Image saved successfully.");
    } else {
      console.error("Failed to save image. Server responded:", response.data);
    }
  } catch (error) {
    console.error("Error generating or saving image:", error);
  }
};
