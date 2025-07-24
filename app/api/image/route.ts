import { generateText, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt } = body;
  if (!prompt) {
    return NextResponse.json({ error: "Prompt required" }, { status: 400 });
  }

  const result = await generateText({
    model: google("gemini-2.0-flash-exp"),
    providerOptions: {
      google: { responseModalities: ["TEXT", "IMAGE"] },
    },
    prompt: `Generate an image of a based on the above prompt story:${prompt}`,
  });

  for (const file of result.files) {
    if (file.mimeType.startsWith("image/")) {
      return NextResponse.json({
        imageUrl: {
          base64Data: file.base64,
          mimeType: file.mimeType,
        },
      });
    }
  }
}
