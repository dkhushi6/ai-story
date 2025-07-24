import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: [
    {
      type: Object,
      required: true,
    },
  ],
  imageUrl: [
    {
      base64Data: String,
      mimeType: String,
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
