import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function RecommendationGrid({ movies, loading, onMovieClick }) {
    if (loading) {
        return (
            <div className="mt-8 md:mt-12">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                    Finding recommendations...
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                    {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    if (!movies.length) return null;

    return (
        <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                ✨ Recommended For You
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={onMovieClick}
                    />
                ))}
            </div>
        </div>
    );
}