import { auth } from "@/app/auth";
import { connectDB } from "@/lib/mdb/mdb-connection";
import Chat from "@/lib/models/chatModel";
import { NextRequest, NextResponse } from "next/server";
//fetch particular chat
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Login required" }, { status: 401 });
  }
  const userId = session.user.id;
  const { chatId } = body;

  if (!chatId) {
    return NextResponse.json({ message: "chat id not found" });
  }
  const existingChat = await Chat.findOne({ _id: chatId, userId });
  if (existingChat) {
    return NextResponse.json({ chat: existingChat || null });
  }
  return NextResponse.json({ message: "esxisting chat not found" });
}

//fetch all chats of user
export async function GET(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      message: "Login first",
    });
  }
  const userId = session.user.id;
  const userChats = await Chat.find({ userId });
  if (!userChats) {
    return NextResponse.json({
      message: "user chats not found",
    });
  }
  return NextResponse.json({
    message: "User chats are",
    chats: userChats,
  });
}
