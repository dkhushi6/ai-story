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
    prompt: `Generate a dreamlike landscape image in a 16:9 aspect ratio that visually represents the main theme and emotional tone of the following story: ${prompt}. The image should capture the essence and key elements of the narrative in a surreal and artistic style.`,
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
