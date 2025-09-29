// import { InferenceClient } from '@huggingface/inference';
// console.log("--- InferenceClient", InferenceClient);
// const client = new InferenceClient(process.env.HF_API_KEY);
async function hf_On_server2() {

// Chat completion API
// const out = await client.chatCompletion({
//   model: "meta-llama/Llama-3.1-8B-Instruct",
//   messages: [{ role: "user", content: "Hello, nice to meet you!" }],
//   max_tokens: 512
// });
console.log(out.choices[0].message);
}
export default hf_On_server2;