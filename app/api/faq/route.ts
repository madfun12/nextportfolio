import {
  categoryInfo,
  shopInfo,
} from "@/app/projects/openaifaq/data/sampleData";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant to a flower shop named "${shopInfo.name} who is trying to come up with ideas for frequently asked questions that will be placed on their shop's ${categoryInfo.name} category page. Respond with only a JSON object and no markup that contains a question and answer attribute. The florist will provide you with their list of FAQs that they already have in a JSON object. Go through what they have already and try to come up with new ideas.`,
        },
        {
          role: "user",
          content: `Try to come up with one question and answer a user on my website might have. These are the items that we have so far: ${JSON.stringify(
            body
          )}.`,
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
