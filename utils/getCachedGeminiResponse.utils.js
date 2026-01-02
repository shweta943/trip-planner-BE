/**
 * Optional function used to get cached Gemini API response
 * If the response is not cached, it fetches from Gemini API and caches it
 */
import { getGeminiResponse } from './getGeminiResponse.utils.js';
import { cache } from '../services/cacheData.js';

export const getCachedGeminiResponse = async (cacheKey, prompt, ttl) => {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
        return cachedResponse;
    }
    const response = await getGeminiResponse(prompt);

    if (response) {
        if (ttl)
            cache.set(cacheKey, response, ttl);
    } else {
        cache.set(cacheKey, response); // Cache for default 7 days if no ttl is provided
    }
}
return response;