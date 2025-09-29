import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";
import { examples } from "../llmPrompt.js";
import {
    ChatPromptTemplate,
    FewShotChatMessagePromptTemplate, FewShotPromptTemplate
} from "@langchain/core/prompts";


async function groqLlmModel() {
    const model = new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: 0
    });
    const messages = [

        // this is defind both System message and human message 
        /* new SystemMessage("Translate the following from English into Hinglish"),
         new HumanMessage("hi! who are you"), */
        // also write like that directly 
        { role: "system", content: "You are a translator from English to Hinglish" },
        { role: "user", content: "i know you" },
    ];
    // or you directly Write Like that 
    /* await model.invoke("Hello");
     await model.invoke([{ role: "user", content: "Hello" }]);
    await model.invoke([new HumanMessage("hi!")]); */


    //     Streaming
    /*  Because chat models are Runnables, they expose a standard interface that includes async and streaming modes of invocation.This allows us to stream individual tokens from a chat model:
     const stream = await model.stream(messages);
     console.log(stream);
     const chunks = [];
     for await (const chunk of stream) {
         chunks.push(chunk);
         console.log(`${chunk.content}|`);
      }  */

    /*Right now we are passing a list of messages directly into the language model. Where does this list of messages come from? Usually, it is constructed from a combination of user input and application logic. This application logic usually takes the raw user input and transforms it into a list of messages ready to pass to the language model. Common transformations include adding a system message or formatting a template with the user input.

Prompt templates are a concept in LangChain designed to assist with this transformation. They take in raw user input and return data (a prompt) that is ready to pass into a language model. */



    /* const systemTemplate = "Translate the following from English into {language}";
     const promptTemplate = ChatPromptTemplate.fromMessages([
         ["system", systemTemplate],
         ["user", "{text}"],
     ]);
     const promtTempResult = await promptTemplate.invoke({language:'japaneese', text:"I AM INMORTAL"});  
     let result = await model.invoke(promtTempResult);
     console.log("---grok|", result.content); */

    /* we’ll learn how to create a simple prompt template that provides the model with example inputs and outputs when generating. Providing the LLM with a few such examples is called few-shotting, and is a simple yet powerful way to guide generation and in some cases drastically improve model performance.

A few-shot prompt template can be constructed from either a set of examples, or from an Example Selector class responsible for choosing a subset of examples from the defined set. */

const examples = [
    { input: "2+2", output: "4" },
    { input: "2+3", output: "5" },
  ];

   // This is a prompt template used to format each individual example.
const examplePrompt = ChatPromptTemplate.fromMessages([
    ["human", "{input}"],
    ["ai", "{output}"],
  ]);
    // const prompt = new FewShotPromptTemplate({
    //     examples,
    //     examplePrompt,
    //     suffix: "Question: {input}",
    //     inputVariables: [],
    // });

    const fewShotPrompt = new FewShotChatMessagePromptTemplate({
        examplePrompt,
        examples,
        inputVariables: [], // no input variables
      });
      
      const result = await fewShotPrompt.invoke({});
    //   console.log(result.toChatMessages());

      const finalPrompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a wondrous wizard of math."],
        fewShotPrompt,
        ["human", "{input}"],
      ]);

      const chain = finalPrompt.pipe(model);

     let result2 = await chain.invoke({ input: "what is math?" });
     console.log("---result2", result2.content);

}
export default groqLlmModel;