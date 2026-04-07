import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5001';
const TMDB_KEY = process.env.TMDB_API_KEY;

async function fetchPoster(movieId) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}`;
        const res = await axios.get(url, { timeout: 10000 });
        const poster = res.data.poster_path;
        if (poster) return `https://image.tmdb.org/t/p/w500${poster}`;
        return 'https://via.placeholder.com/300x450?text=No+Poster';
    } catch (err) {
        return 'https://via.placeholder.com/300x450?text=No+Poster';
    }
}

// Retry function for Flask calls
async function callFlaskWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await axios.get(url, { timeout: 60000 });
            return res;
        } catch (err) {
            console.log(`Flask attempt ${i + 1} failed:`, err.message);
            if (i < retries - 1) {
                console.log('Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
    throw new Error('Flask API unavailable after retries');
}

export const getRecommendations = async (req, res) => {
    const { movie } = req.query;
    if (!movie) {
        return res.status(400).json({ error: 'Movie name is required' });
    }
    try {
        console.log('Fetching recommendations for:', movie);
        const flaskRes = await callFlaskWithRetry(
            `${FLASK_URL}/recommend?movie=${encodeURIComponent(movie)}`
        );
        const recommendations = flaskRes.data.recommendations;
        console.log('Got recommendations:', recommendations.length);

        const withPosters = await Promise.all(
            recommendations.map(async (m) => ({
                id: m.id,
                title: m.title,
                poster: await fetchPoster(m.id)
            }))
        );
        res.json({ success: true, recommendations: withPosters });
    } catch (err) {
        console.log('Final error:', err.message);
        res.status(500).json({ 
            error: 'Service is waking up, please try again in 30 seconds!' 
        });
    }
};

export const getAllMovies = async (req, res) => {
    try {
        const flaskRes = await callFlaskWithRetry(`${FLASK_URL}/movies`);
        res.json({ success: true, movies: flaskRes.data.movies });
    } catch (err) {
        console.log('Movies error:', err.message);
        res.status(500).json({ error: 'Cannot fetch movies' });
    }
};