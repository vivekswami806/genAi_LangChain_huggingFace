import { GoogleGenAI, createUserContent, createPartFromUri, } from "@google/genai";
import * as fs from "node:fs";
import wav from 'wav';
const ai = new GoogleGenAI({});

async function genAILlm(prompt) {
  await forStreming(prompt);
  // await MultiTurnconversations(prompt);
  // await ImageGeneration(prompt);                                // https://ai.google.dev/gemini-api/docs/image-generation
  // await speechGenerationAI();                                      //https://ai.google.dev/gemini-api/docs/speech-generation
  // await pdfUnderstanding(prompt);                                      //https://ai.google.dev/gemini-api/docs/speech-generation

  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: prompt,
  //   config: {
  //     temperature: 0.1,
  //     thinkingConfig: {
  //       thinkingBudget: 1024,
  //       // Turn off thinking:
  //       // thinkingBudget: 0
  //       // Turn on dynamic thinking:
  //       // thinkingBudget: -1
  //     },
  //   },
  // });

  // console.log("SYSTEM genAI:", response.text);
}


async function pdfUnderstanding(prompt){
  const contents = [
    { text: prompt},
    {
        inlineData: {
            mimeType: 'application/pdf',
            data: Buffer.from(fs.readFileSync("C:/Users/Administrator/Desktop/vk/Vivek_kumar_.pdf")).toString("base64")
        }
    }
];

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents
});
console.log(response.text);
}

async function saveWaveFile(
  filename,
  pcmData,
  channels = 1,
  rate = 24000,
  sampleWidth = 2,
) {
  return new Promise((resolve, reject) => {
     const writer = new wav.FileWriter(filename, {
           channels,
           sampleRate: rate,
           bitDepth: sampleWidth * 8,
     });

     writer.on('finish', resolve);
     writer.on('error', reject);

     writer.write(pcmData);
     writer.end();
  });
}

async function speechGenerationAI() {
  const ai = new GoogleGenAI({});

  const response = await ai.models.generateContent({
     model: "gemini-2.5-flash-preview-tts",
     contents: [{ parts: [{ text: 'Say cheerfully: Ek buzurg Japanese mitti ke kalakar apne chhote se workshop mein baithkar naye glazed chai ke bartan ko pyaar se dekh rahe hain. Unke chehre par gehri lakeerein aur ek pyaari si muskaan hai, jo unke saalon ke tajurbe ko dikhati hai. Dhoop ki halki sunehri roshni unke haathon aur mitti ke bartan par gir rahi hai, jisse poora mahaul shaant aur sukoon bhara lag raha hai. Piche mitti ke bartan aur chak dikh rahe hain. Ye manzar unki kala aur samarpan ka prateek hai — ek sadharan zindagi mein chhupi khoobsurti ka ehsaas.!' }] }],
     config: {
           responseModalities: ['AUDIO'],
           speechConfig: {
              voiceConfig: {
                 prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
           },
     },
  });

  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  const audioBuffer = Buffer.from(data, 'base64');

  const fileName = 'out.wav';
  await saveWaveFile(fileName, audioBuffer);
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
    console.log(chunk.text);
  }
}
export default genAILlm;