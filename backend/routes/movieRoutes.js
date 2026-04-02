import express from 'express';
import { getRecommendations, getAllMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/recommend', getRecommendations);
router.get('/movies', getAllMovies);

export default router;