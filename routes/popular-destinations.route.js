import express from 'express';
import { getPopularDestinations } from '../controllers/popular-destinations.controller.js';
const router = express.Router();

router.get('/popular-destinations', getPopularDestinations);

export default router;