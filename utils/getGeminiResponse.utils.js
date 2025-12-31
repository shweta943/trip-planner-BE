/**
 * Get Gemini API Response Utility
 * 
 * @param {string} userPrompt - The prompt to send to Gemini API
 * @returns {Object} Parsed response from Gemini API
 */
import { ai } from '../services/geminiSDK.js';
import { parseGeminiResponse } from './responseParser.utils.js';

const TEMPERATURE = 0.2;
const MAX_OUTPUT_TOKENS = 1000;

// Function to get response from Gemini API
export async function getGeminiResponse(userPrompt) {
    // Define the query for a JSON array response
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: userPrompt,
            generationConfig: {
                maxOutputTokens: MAX_OUTPUT_TOKENS,
                temperature: TEMPERATURE,
            }
        })
        const parsedResponse = parseGeminiResponse(response);
        return parsedResponse;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
    }
}