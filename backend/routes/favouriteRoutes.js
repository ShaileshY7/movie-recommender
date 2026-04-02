import express from 'express';
import { getFavourites, addFavourite, removeFavourite } from '../controllers/favouriteController.js';

const router = express.Router();

router.get('/', getFavourites);
router.post('/', addFavourite);
router.delete('/:movieId', removeFavourite);

export default router;