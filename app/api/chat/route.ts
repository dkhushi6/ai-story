import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  const stream = streamText({
    model: openai("gpt-4.1"),
    messages,
  });
  return stream.toDataStreamResponse();
}
