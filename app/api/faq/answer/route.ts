import {
  categoryInfo,
  shopInfo,
} from "@/app/projects/openaifaq/data/sampleData";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant to a flower shop named "${shopInfo.name} who is trying to come up with ideas for frequently asked questions that will be placed on their shop's ${categoryInfo.name} category page. Respond with only a JSON object and no markup that contains and answer attribute. The florist will provide a question that they want you to come up with an answer for.`,
        },
        {
          role: "user",
          content: `Try to come up with an answer for this question: ${body.question}.`,
        },
      ],
    });
    if (completion.choices[0].message.content) {
      const response = JSON.parse(completion.choices[0].message.content);
      return NextResponse.json(response, { status: 200 });
    } else {
      return new NextResponse(
        "Error getting correctly formatted response from Open AI",
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Sending Email", { status: 400 });
  }
}
