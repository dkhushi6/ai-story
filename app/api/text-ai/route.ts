import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env.local
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = body;

    if (!input) {
      return NextResponse.json(
        { message: "Please provide input" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: input }],
    });

    return NextResponse.json({ output: response.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response", detail: error.message },
      { status: 500 }
    );
  }
}
