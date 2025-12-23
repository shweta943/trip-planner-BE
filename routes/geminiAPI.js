import { getGeminiResponse } from '../services/geminiSDK.js';

router.post('/gemini', async (req, res) => {
  try {
    const response = await getGeminiResponse(req.body.promptMessage, { parseJson: true });
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error: 'Gemini API call failed' });
  }
});
