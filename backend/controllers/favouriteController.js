import Favourite from '../models/Favourite.js';
import jwt from 'jsonwebtoken';

// Helper to get user from token
function getUserFromToken(req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'cinematch_secret');
    } catch {
        return null;
    }
}

// Get all favourites for user
export const getFavourites = async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Not logged in' });
    try {
        const favs = await Favourite.find({ userId: user.id });
        res.json({ success: true, favourites: favs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add favourite
export const addFavourite = async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Not logged in' });
    const { movieId, title, poster } = req.body;
    try {
        const existing = await Favourite.findOne({ userId: user.id, movieId });
        if (existing) return res.status(400).json({ error: 'Already in favourites!' });
        const fav = await Favourite.create({ userId: user.id, movieId, title, poster });
        res.json({ success: true, favourite: fav });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove favourite
export const removeFavourite = async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Not logged in' });
    try {
        await Favourite.findOneAndDelete({ userId: user.id, movieId: req.params.movieId });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};