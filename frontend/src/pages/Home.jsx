import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAllMovies, fetchRecommendations, fetchTrending } from '../services/api';
import SearchBar from '../components/SearchBar';
import RecommendationGrid from '../components/RecommendationGrid';
import HeroSection from '../components/HeroSection';
import MovieModal from '../components/MovieModal';
import MovieCard from '../components/MovieCard';

const FLASK_URL = 'https://movie-recommender-ml-8gn7.onrender.com';
const BACKEND_URL = 'https://movie-recommender-backend-a2lv.onrender.com';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [waking, setWaking] = useState(false);
    const [recentSearches, setRecentSearches] = useState(
        JSON.parse(localStorage.getItem('recentSearches') || '[]')
    );
    const [searchedMovie, setSearchedMovie] = useState('');

    useEffect(() => {
        fetchAllMovies()
            .then(res => setMovies(res.data.movies))
            .catch(err => console.error('Movies fetch error:', err));

        fetchTrending()
            .then(res => setTrending(res.data.results.slice(0, 10)))
            .catch(err => console.error('Trending fetch error:', err));
    }, []);

    const wakeUpServices = async () => {
        setWaking(true);
        setError('⏳ Waking up services, please wait 30-60 seconds...');
        try {
            await axios.get(`${FLASK_URL}/health`, { timeout: 60000 });
            await axios.get(`${BACKEND_URL}/api/movies`, { timeout: 60000 });
            setError('✅ Services are ready! Try searching now.');
        } catch {
            setError('Still starting up... Please try searching in 30 seconds.');
        }
        setWaking(false);
    };

    const handleSearch = async () => {
        if (!search.trim()) return;
        setLoading(true);
        setError('');
        setRecommendations([]);
        setSearchedMovie(search);

        const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        try {
            const res = await fetchRecommendations(search);
            setRecommendations(res.data.recommendations);
        } catch {
            setError('waking');
        }
        setLoading(false);
    };

    const clearRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <div className="min-h-screen bg-gray-900 pb-16">

            {/* Hero */}
            <HeroSection />

            {/* Search */}
            <div className="px-4 md:px-8 -mt-6 relative z-10">
                <SearchBar
                    movies={movies}
                    search={search}
                    setSearch={setSearch}
                    onSearch={handleSearch}
                />

                {/* Error / Wake Up */}
                {error && (
                    <div className="text-center mt-4">
                        {error === 'waking' ? (
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-red-400 font-medium">
                                    ⚠️ Service is starting up! Please wait and try again.
                                </p>
                                <button
                                    onClick={wakeUpServices}
                                    disabled={waking}
                                    className="bg-red-600 hover:bg-red-700 active:scale-95
                                               text-white px-6 py-2 rounded-lg text-sm
                                               font-bold transition-all disabled:opacity-50
                                               flex items-center gap-2"
                                >
                                    {waking ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30
                                                            border-t-white rounded-full animate-spin" />
                                            Waking up...
                                        </>
                                    ) : (
                                        '🔄 Wake Up Services'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <p className={`font-medium ${
                                error.includes('✅')
                                    ? 'text-green-400'
                                    : 'text-yellow-400'
                            }`}>
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && recommendations.length === 0 && !loading && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-400 text-sm font-medium">
                            🕐 Recent Searches
                        </h3>
                        <button
                            onClick={clearRecent}
                            className="text-gray-500 hover:text-red-400 text-xs transition"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setSearch(s)}
                                className="bg-gray-800 hover:bg-red-600/20 border border-gray-700
                                           hover:border-red-500/50 text-gray-300 hover:text-white
                                           px-4 py-2 rounded-full text-sm transition-all duration-200
                                           flex items-center gap-2"
                            >
                                🔍 {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendations */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
                {searchedMovie && recommendations.length > 0 && (
                    <p className="text-gray-400 text-sm mb-4">
                        Showing recommendations for{' '}
                        <span className="text-red-400 font-semibold">"{searchedMovie}"</span>
                    </p>
                )}
                <RecommendationGrid
                    movies={recommendations}
                    loading={loading}
                    onMovieClick={setSelectedMovieId}
                />
            </div>

            {/* Trending Section - Netflix style horizontal scroll */}
            {trending.length > 0 && (
                <div className="mt-12 md:mt-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4
                                    flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl font-bold text-white
                                       flex items-center gap-2">
                            🔥 Trending This Week
                        </h2>
                        <span className="text-gray-500 text-sm">Scroll →</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        overflowX: 'auto',
                        padding: '0 32px 16px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {trending.map(movie => (
                            <div key={movie.id} style={{ flexShrink: 0, width: '160px' }}>
                                <MovieCard
                                    movie={{
                                        id: movie.id,
                                        title: movie.title,
                                        poster: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
                                        rating: movie.vote_average?.toFixed(1),
                                        year: movie.release_date?.split('-')[0]
                                    }}
                                    onClick={setSelectedMovieId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Movie Modal */}
            {selectedMovieId && (
                <MovieModal
                    movieId={selectedMovieId}
                    onClose={() => setSelectedMovieId(null)}
                />
            )}
        </div>
    );
}