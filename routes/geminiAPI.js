import express from 'express';
import { getGeminiResponse } from '../services/geminiSDK.js';
import { generateExamplePrompt } from '../prompts.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await getGeminiResponse(generateExamplePrompt(), { parseJson: true });
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error: 'Gemini API call failed' });
  }
});
export default router;
