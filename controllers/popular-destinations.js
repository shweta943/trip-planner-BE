/**
 * Controller for handling popular destinations logic.
 */
import { destinationPrompt } from '../prompts.js';
import { getCachedGeminiResponse } from '../utils/getCachedGeminiResponse.utils.js';

export const getPopularDestinations = async (req, res) => {
    const cacheKey = 'popular-destinations';
    const prompt = destinationPrompt;

    try {
        const response = await getCachedGeminiResponse(cacheKey, prompt);

        if (!response) {
            return res.status(500).json({ error: 'Failed to fetch popular destinations.' });
        }
        return res.status(200).json({ destinations: response });
    } catch (error) {
        console.error('Error fetching popular destinations:', error);
        return res.status(500).json({ error: 'An error occurred while fetching popular destinations.' });
    }
}