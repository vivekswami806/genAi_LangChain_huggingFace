import { GoogleGenerativeAI } from '@google/generative-ai';
async function llmModelDemo() {
    try {
        let genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    let model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" , temperature: 1});
    let response = await model.generateContent("how to update git code base command");
    let result =  response.response.text(); //console.log();
    console.log("---r", result);
        
    } catch (error) { 
        console.log(error);
    }
}

export default llmModelDemo;