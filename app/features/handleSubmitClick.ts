import { generateId } from "ai";
import axios from "axios";
import { ClickPropType } from "./message-type";

// saving chats
export const handleSubmitClick = async ({
  chatId,
  input,
  handleSubmit,
}: ClickPropType) => {
  localStorage.setItem("prompt", "");

  console.log(chatId);
  if (!chatId) {
    console.log("chatid is not set");
  }
  const userMsgFormate = {
    id: generateId(),
    role: "user",
    content: input,
  };
  try {
    await axios.post("/api/fetch/save-chats", {
      message: userMsgFormate,
      id: chatId,
    });

    handleSubmit();

    if (typeof window !== "undefined" && chatId) {
      window.history.replaceState({}, "", `/chat/${chatId}`);
    }
  } catch (err) {
    console.log("error fetching data", err);
  }
};
