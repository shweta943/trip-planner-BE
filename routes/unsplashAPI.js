import express from 'express';
import { getUnsplashImages } from '../utils/getUnsplashResponse.utils.js';

const router = express.Router();

router.get('/unsplash', async (req, res) => {
    const { query, perPage } = req.query;
    
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
        const images = await getUnsplashImages(query, perPage || 10);
        res.json({ data: images });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch images from Unsplash' });
    }
});

export default router;


