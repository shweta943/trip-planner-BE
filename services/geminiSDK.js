import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });


async function getGeminiResponse(userPrompt) {
    // Define the query for a JSON array response
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: userPrompt,
        })

        // Extract only the JSON part
        const answer = response.text.replace(/```json|```/g, "").trim();
        console.log('answer: ', answer);

        try {
            let array = JSON.parse(answer);
            console.log("Parsed Array:", array);
            return array;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

module.exports = { getGeminiResponse };