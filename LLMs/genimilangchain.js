import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate , ChatPromptTemplate, MessagesPlaceholder} from "@langchain/core/prompts";

async function geminilangchain(prompt) {
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            temperature: 0,
            maxOutputTokens: 1024
        });
        // String PromptTemplates
       /* const promptTemplate = PromptTemplate.fromTemplate(
            "Tell me about {topic}"
        ); */

        // chat Prompt Templates 
        const promptTemplate = ChatPromptTemplate.fromMessages([
            ["system", "You are a helpful assistant"],
            ["user", "Tell me about {topic}"],
          ]); 

        //   MessagesPlaceholder
        //   const promptTemplate = ChatPromptTemplate.fromMessages([
        //     ["system", "You are a helpful assistant"],
        //     new MessagesPlaceholder("topic"),
        //   ]);

        let finalPrompt = await promptTemplate.invoke({ topic: prompt });
        console.log("--- finalPrompt|", finalPrompt);
        let result = await model.invoke(prompt);
        console.log("System:", result?.content);
    } catch (error) {
        console.log(error);
    }
}
export default geminilangchain