import express from 'express';
import dotenv from 'dotenv';
import llmModelDemo from './LLMs/llmModel.js';
import geminilangchain from './LLMs/genimilangchain.js';
import hf_On_server from './chatModels/_01_HF_ON_Server.js';
import hf_On_server2 from './chatModels/_02_HF_ON_Server.js';
import groqLlmModel from './LLMs/grokLlmModel.js';
import chatModelGrok from './LLMs/chatModelGrok.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import genAILlm from './LLMs/genAi.js';
import toolcoolingGenAI from './LLMs/toolCoolingGenAI.js';

dotenv.config();

const app = express();
app.use(express.json());

app.listen(4041, async () => {
  console.log("Server is running on port 4041");
  const rl = readline.createInterface({ input, output });

  while (true) {
    const prompt = await rl.question('YOU: ');
    // You can call one or more LLM functions here with the prompt
    //  await genAILlm(prompt);             // working
    await toolcoolingGenAI(prompt);
    // await llmModelDemo(prompt);         // working
    // await geminilangchain(prompt);            // working
    // await hf_On_server();               // Not working - Payment
    // await hf_On_server2();              // Deprecated
    // await groqLlmModel();               // working
    // await chatModelGrok(prompt);              // working
    if (prompt.toLowerCase() === 'exit' || prompt.toLowerCase() === 'quit') {
      console.log('SYSTEM: Goodbye!');
      break;
    }
  }

});
