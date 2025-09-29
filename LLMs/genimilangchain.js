import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

async function geminilangchain() {
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            temperature: 0,
            maxOutputTokens: 5
          });
          
          let  result = await model.invoke("what is a india");
          console.log("---r", result.content);
    } catch (error) {
        
    }
}
export default geminilangchain