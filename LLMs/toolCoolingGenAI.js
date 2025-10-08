import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
async function toolcoolingGenAI(prompt) {

    
    const groundingTool = {
      googleSearch: {},
    };
    
    const config = {
      tools: [groundingTool],
    };
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config,
    });
    
    console.log(response.text);
}
export default toolcoolingGenAI;