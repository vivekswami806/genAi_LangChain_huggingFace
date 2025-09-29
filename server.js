import express from 'express';
import dotenv from 'dotenv';
import llmModelDemo from './LLMs/llmModel.js'
import geminilangchain from './LLMs/genimilangchain.js';
import hf_On_server from './chatModels/_01_HF_ON_Server.js';
import hf_On_server2 from './chatModels/_02_HF_ON_Server.js';
import groqLlmModel from './LLMs/grokLlmModel.js';
import chatModelGrok from './LLMs/chatModelGrok.js';

const app = express();
dotenv.config();
app.use(express.json());

app.listen(4041, async () => {
  //  await llmModelDemo();
  //  await geminilangchain();
  //  await hf_On_server(); 
  //  await hf_On_server2(); 
   await groqLlmModel(); 
  //  await chatModelGrok(); 
  console.log("Server is running on 4041");
}); 