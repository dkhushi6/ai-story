import { Message } from "ai";
import { ChangeEvent } from "react";

export type MessagePropType = {
  messages: Message[];
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitClick: () => void;
  handleGenerateImage: () => void;
};

export type ReloadType = {
  setConvo: React.Dispatch<React.SetStateAction<Message[]>>;
  setImageUrl: React.Dispatch<
    React.SetStateAction<{ base64Data: string; mimeType: string } | undefined>
  >;
  id: string;
};
