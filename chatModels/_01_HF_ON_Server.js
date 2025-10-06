import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config(); // load .env file
// Initialize client
const hf = new HfInference(process.env.HF_API_KEY);
async function hf_On_server() {
  try {
    const result = await hf.textGeneration({
      model: "TinyLlama-1.1B-Chat-v1.0", // you can replace with another text model
      inputs: "Who are you?",
      parameters: {
        max_new_tokens: 50, // prevent long outputs
      },
      options: {
        use_cache: false, // ✅ ensure request goes via API
        wait_for_model: true, // ✅ auto-load if model is sleeping
      },
    });

    console.log("Generated text:", result.generated_text);
    return result.generated_text;
  } catch (error) {
    console.error("Hugging Face API error:", error);
  }
} 

export default hf_On_server;
