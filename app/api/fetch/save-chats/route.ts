import { auth } from "@/app/auth";
import { connectDB } from "@/lib/mdb/mdb-connection";
import Chat from "@/lib/models/chatModel";
import { existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

//To edit existing chat or new chat
export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Login required" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json();
  const { id, message } = body;
  if (id && id !== "new") {
    const existingChat = await Chat.findOne({ _id: id, userId });
    if (existingChat) {
      existingChat.message.push(message);
      await existingChat.save();
      return NextResponse.json({ chatId: existingChat._id });
    }
    const chat = await Chat.create({
      _id: id,
      message,
      userId,
      name:
        message?.role === "user"
          ? message.content.slice(0, 60)
          : "Untitled Chat",
    });
    return NextResponse.json({ status: "ok", chatId: chat._id });
  }
  return NextResponse.json({
    status: "error",
    message: "Chat ID is required",
  });
}
