import { GoogleGenerativeAI } from '@google/generative-ai';
async function llmModelDemo(prompt) {
    console.log("llmModelDemo",prompt);
    try {
        let genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        let model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", temperature: 1 });
        let response = await model.generateContent(prompt);
        let result = response.response.text(); //console.log();
        console.log("SYSTEM:", result);

    } catch (error) {
        console.log(error); 
    }
}

export default llmModelDemo;