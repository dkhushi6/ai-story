import { ReloadType } from "@/app/features/message-type";
import axios from "axios";

export const handleReload = async ({
  setConvo,
  id,
  setImageUrl,
  setCount,
}: ReloadType) => {
  try {
    const res = await axios.post("/api/fetch/fetch-chats", {
      chatId: id,
    });
    console.log("image url from db:", res.data.chat?.imageUrl);
    console.log("Fetched:", res.data.chat?.message);
    setConvo(res.data.chat?.message || []);
    setImageUrl(res.data.chat?.imageUrl[0] || []);
    setCount(res.data.chat?.count || 0);
  } catch (err) {
    console.log("error fetching data", err);
  }
};
