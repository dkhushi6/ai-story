import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
