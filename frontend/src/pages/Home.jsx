import { useState, useEffect } from 'react';
import { fetchAllMovies, fetchRecommendations, fetchTrending } from '../services/api';
import SearchBar from '../components/SearchBar';
import RecommendationGrid from '../components/RecommendationGrid';
import HeroSection from '../components/HeroSection';
import MovieModal from '../components/MovieModal';
import MovieCard from '../components/MovieCard';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        fetchAllMovies()
            .then(res => setMovies(res.data.movies))
            .catch(err => console.error(err));

        fetchTrending()
            .then(res => setTrending(res.data.results.slice(0, 10)))
            .catch(err => console.error(err));
    }, []);

    const handleSearch = async () => {
        if (!search.trim()) return;
        setLoading(true);
        setError('');
        setRecommendations([]);
        try {
            const res = await fetchRecommendations(search);
            setRecommendations(res.data.recommendations);
        } catch {
            setError('❌ Movie not found! Please try another name.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 pb-16">
            {/* Hero */}
            <HeroSection />

            {/* Search */}
            <div className="px-8 -mt-6 relative z-10">
                <SearchBar
                    movies={movies}
                    search={search}
                    setSearch={setSearch}
                    onSearch={handleSearch}
                />
                {error && (
                    <p className="text-red-400 mt-4 text-center">{error}</p>
                )}
            </div>

            {/* Recommendations */}
            <div className="max-w-7xl mx-auto px-8 mt-4">
                <RecommendationGrid
                    movies={recommendations}
                    loading={loading}
                    onMovieClick={setSelectedMovieId}
                />
            </div>

            {/* Trending Section */}
            {trending.length > 0 && (
                <div className="max-w-7xl mx-auto px-8 mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        🔥 Trending This Week
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {trending.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={{
                                    id: movie.id,
                                    title: movie.title,
                                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                }}
                                onClick={setSelectedMovieId}
                            />
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