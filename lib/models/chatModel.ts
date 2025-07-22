import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      type: Object,
      required: true,
    },
  ],
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
