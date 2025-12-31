/**
 * Get Unsplash API Response Utility
 * 
 * @param {string} userPrompt - The prompt to send to Unsplash API
 * @returns {Object} Parsed response from Unsplash API
 */

import { unsplash } from '../services/unsplashSDK.js';

// Function to get images from Unsplash based on a query
export async function getUnsplashImages(query, perPage) {
    try {
        const images = await unsplash.search.getPhotos({
            query,
            page: 1,
            perPage,
            orientation: 'landscape'
        })

        if (images.errors) {
            console.error("Unsplash API Error:", images.errors);
            return [];
        }
        return images?.response?.results;
    } catch (error) {
        console.error('Error fetching Images', error);
    }
}