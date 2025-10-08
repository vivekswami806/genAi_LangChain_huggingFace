import { GoogleGenAI, createUserContent, createPartFromUri, } from "@google/genai";
import * as fs from "node:fs";
const ai = new GoogleGenAI({});

async function genAILlm(prompt) {
  // await forStreming(prompt);
  // await MultiTurnconversations(prompt);
  await ImageGeneration(prompt);
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: prompt,
  //   config: {
  //     temperature: 0.1,
  //   },
  // });

  // console.log("SYSTEM genAI:", response.text);
}
async function ImageGeneration() {
  const prompt = "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}
async function MultiTurnconversations(prompt) {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const response1 = await chat.sendMessage({
    message: "I have 2 dogs in my house.",
  });
  console.log("Chat response 1:", response1.text);

  const response2 = await chat.sendMessage({
    message: "How many paws are in my house?",
  });
  console.log("Chat response 2:", response2.text);
}


async function forStreming(prompt) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  for await (const chunk of response) {
    console.log("chunk", chunk.text);
  }
}
export default genAILlm;