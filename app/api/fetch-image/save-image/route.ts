import { auth } from "@/app/auth";
import { connectDB } from "@/lib/mdb/mdb-connection";
import Chat from "@/lib/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

//To save existing chat or new chat image
export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Login required" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json();
  const { id, imageUrl } = body;
  if (!id || !imageUrl) {
    return NextResponse.json(
      { status: "error", message: "Missing id or imageUrl" },
      { status: 400 }
    );
  }
  if (id && id !== "new") {
    const existingChat = await Chat.findOne({ _id: id, userId });
    if (existingChat) {
      existingChat.imageUrl.push(imageUrl);
      await existingChat.save();
      return NextResponse.json({ chatId: existingChat._id, status: "ok" });
    }
    return NextResponse.json({
      status: "error",
      message: "existing chat not found ",
    });
  }
  return NextResponse.json({
    status: "error",
    message: "Chat ID is required",
  });
}
