const { GoogleGenerativeAI } = require("@google/generative-ai");
require ('dotenv').config();

const genAI = new GoogleGenerativeAI("AIzaSyAGTGJwD3vQujbUB_H_z1NdCapq4-cc0pk");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "how could you assist us?";

const generate = async() => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }catch(err){
        console.log(err);
    }
}
generate ();

