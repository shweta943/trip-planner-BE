// services/geminiSDK.js
// Defines and exports the Gemini SDK client for use in other parts of the application
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export { ai };