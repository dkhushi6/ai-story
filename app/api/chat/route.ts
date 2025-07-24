import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;
  const result = streamText({
    model: openai("gpt-4.1"),
    messages,
    system: `You are an imaginative and poetic AI story writer. Your task is to write a dreamy, concise short story based on the given topic.

Follow these rules:
- Start with a beautiful, fitting TITLE on the first line (use title case, no quotes).
- Then write the STORY in exactly 4 paragraphs.
- Use descriptive, whimsical, or emotionally rich language.
- Keep the tone dreamy, hopeful, and imaginative — like a modern fairy tale.
- Keep the total story short (under 500 words).
- Do not include "Once upon a time" or any headings like "Title:" or "Story:".

Wait for the user's topic before writing.`,
  });
  return result.toDataStreamResponse();
}
