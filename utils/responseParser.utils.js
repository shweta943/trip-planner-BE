/**
 * Parse Gemini API response and extract JSON data
 * 
 * @param {Object} response - Raw response from Gemini API
 * @returns {Object} Parsed JSON data or null if parsing fails
 */

export function parseGeminiResponse(response) {
    try {
        // Extract only the JSON part from markdown formatting
        const metadata = response.candidates[0].metadata;

        const answer = response.text.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(answer);
        return {
            data: parsedData,
            metadata: metadata
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}