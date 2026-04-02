import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { Link } from 'react-router-dom';
import { getFavourites, removeFavourite } from '../services/api';

export default function Favourites() {
    const [favs, setFavs] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFavourites()
            .then(res => {
                setFavs(res.data.favourites);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleRemove = async (movieId) => {
        try {
            await removeFavourite(movieId);
            setFavs(favs.filter(f => f.movieId !== movieId));
        } catch (err) {
            alert('Failed to remove!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                            ❤️ My Favourites
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {favs.length} movie{favs.length !== 1 ? 's' : ''} saved
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500" />
                    </div>
                ) : favs.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-4">🎬</p>
                        <h2 className="text-2xl font-bold text-white mb-2">No favourites yet!</h2>
                        <p className="text-gray-400 mb-8">Search movies and save them here</p>
                        <Link to="/" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition">
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {favs.map(movie => (
                            <div key={movie._id} className="relative group">
                                <MovieCard
                                    movie={{
                                        id: movie.movieId,
                                        title: movie.title,
                                        poster: movie.poster
                                    }}
                                    onClick={setSelectedMovieId}
                                />
                                <button
                                    onClick={() => handleRemove(movie.movieId)}
                                    className="absolute top-2 right-2 bg-red-600 text-white 
                                               w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 
                                               transition-all duration-200 text-xs flex items-center 
                                               justify-center hover:bg-red-700 shadow-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedMovieId && (
                <MovieModal
                    movieId={selectedMovieId}
                    onClose={() => setSelectedMovieId(null)}
                />
            )}
        </div>
    );
}