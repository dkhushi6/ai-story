import { ReloadType } from "@/app/features/message-type";
import axios from "axios";

export const handleReload = async ({ setConvo, id }: ReloadType) => {
  try {
    const res = await axios.post("/api/fetch/fetch-chats", {
      chatId: id,
    });
    console.log("Fetched:", res.data.chat?.message);
    setConvo(res.data.chat?.message || []);
  } catch (err) {
    console.log("error fetching data", err);
  }
};
