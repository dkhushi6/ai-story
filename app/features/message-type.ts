import { Message } from "ai";
import { ChangeEvent } from "react";

export type MessagePropType = {
  messages: Message[];
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitClick: () => void;
  count: number;
};
export type ClickPropType = {
  chatId: string;
  input: string;
  handleSubmit: () => void | Promise<void>;
};
export type ReloadType = {
  setConvo: React.Dispatch<React.SetStateAction<Message[]>>;
  setImageUrl: React.Dispatch<
    React.SetStateAction<{ base64Data: string; mimeType: string } | undefined>
  >;
  id: string;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export type GenerateImageTypeProps = {
  msg: Message;
  count: number;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  chatId: string;
  setImageUrl: React.Dispatch<
    React.SetStateAction<{ base64Data: string; mimeType: string } | undefined>
  >;
};

export type RightPannelProp = {
  messages: Message[];
  imageLoading: boolean;
  imageUrl?: { base64Data: string; mimeType: string };
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export type Chat = {
  _id: string;
  name?: string;
  updatedAt?: string;
  imageUrl?: {
    base64Data: string;
    mimeType: string;
  }[];
};
