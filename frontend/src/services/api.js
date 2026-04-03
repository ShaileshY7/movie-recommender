import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const TMDB_KEY = 'b1de9280d0338d99f08ef9c8fdbcac16';
const TMDB_BASE = 'https://api.themoviedb.org/3';

// Helper to get auth header
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllMovies = () =>
    axios.get(`${BASE_URL}/movies`);

export const fetchRecommendations = (movie) =>
    axios.get(`${BASE_URL}/api/recommend?movie=${encodeURIComponent(movie)}`);

export const fetchTrending = () =>
    axios.get(`${TMDB_BASE}/trending/movie/week?api_key=${TMDB_KEY}`);

export const fetchMovieDetails = (movieId) =>
    axios.get(`${TMDB_BASE}/movie/${movieId}?api_key=${TMDB_KEY}&append_to_response=credits,videos`);

// Auth
export const registerUser = (data) =>
    axios.post(`${BASE_URL}/auth/register`, data);

export const loginUser = (data) =>
    axios.post(`${BASE_URL}/auth/login`, data);

// Favourites - now saved to MongoDB!
export const getFavourites = () =>
    axios.get(`${BASE_URL}/favourites`, { headers: authHeader() });

export const addFavourite = (data) =>
    axios.post(`${BASE_URL}/favourites`, data, { headers: authHeader() });

export const removeFavourite = (movieId) =>
    axios.delete(`${BASE_URL}/favourites/${movieId}`, { headers: authHeader() });