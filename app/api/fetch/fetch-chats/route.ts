import { auth } from "@/app/auth";
import { connectDB } from "@/lib/mdb/mdb-connection";
import Chat from "@/lib/models/chatModel";
import { ObjectId } from "bson";
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
  console.log("userid", userId);
  console.log("chatid", chatId);

  if (!chatId || !ObjectId.isValid(chatId)) {
    return NextResponse.json(
      { message: "Invalid or missing chat ID" },
      { status: 400 }
    );
  }
  const existingChat = await Chat.findOne({ _id: chatId, userId });
  if (existingChat) {
    return NextResponse.json({ chat: existingChat || null });
  }
  return NextResponse.json({ message: "existing chat not found" });
}

//fetch all chats and image of user
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

//clear all user chats
export async function DELETE() {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      message: "Login first",
    });
  }
  const userId = session.user.id;
  const result = await Chat.deleteMany({ userId });

  if (result.deletedCount === 0) {
    return NextResponse.json({
      message: "No chats found to delete",
    });
  }
  return NextResponse.json({
    message: "chats deleted successfully",
    deleted: result.deletedCount,
  });
}
