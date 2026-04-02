import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5001';
const TMDB_KEY = process.env.TMDB_API_KEY;

// Fetch poster from TMDB
async function fetchPoster(movieId) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}`;
        const res = await axios.get(url);
        const poster = res.data.poster_path;
        return poster
            ? `https://image.tmdb.org/t/p/w500${poster}`
            : 'https://via.placeholder.com/300x450?text=No+Poster';
    } catch {
        return 'https://via.placeholder.com/300x450?text=No+Poster';
    }
}

// Get recommendations
export const getRecommendations = async (req, res) => {
    const { movie } = req.query;
    if (!movie) {
        return res.status(400).json({ error: 'Movie name is required' });
    }
    try {
        const flaskRes = await axios.get(
            `${FLASK_URL}/recommend?movie=${encodeURIComponent(movie)}`
        );
        const recommendations = flaskRes.data.recommendations;

        const withPosters = await Promise.all(
            recommendations.map(async (m) => ({
                id: m.id,
                title: m.title,
                poster: await fetchPoster(m.id)
            }))
        );
        res.json({ success: true, recommendations: withPosters });
    } catch (err) {
        res.status(500).json({ error: 'Movie not found or Flask API is down' });
    }
};

// Get all movies list
export const getAllMovies = async (req, res) => {
    try {
        const flaskRes = await axios.get(`${FLASK_URL}/movies`);
        res.json({ success: true, movies: flaskRes.data.movies });
    } catch (err) {
        res.status(500).json({ error: 'Cannot fetch movies' });
    }
};