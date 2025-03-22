require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Add the necessary import
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to REALTY. Ask a question!");
});

// Initialize the AI model
const genAI = new GoogleGenerativeAI("AIzaSyAGTGJwD3vQujbUB_H_z1NdCapq4-cc0pk");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to generate AI response
const generateAIResponse = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error(err);
        return "Sorry, I couldn't generate an answer at the moment.";
    }
}

// New endpoint to ask questions
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;  // Capture the question from the user

    if (!userQuestion) {
        return res.status(400).send({ error: "Question is required!" });
    }

    const aiResponse = await generateAIResponse(userQuestion);
    res.send({ response: aiResponse });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});
