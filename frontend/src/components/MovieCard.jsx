export default function MovieCard({ movie, onClick }) {
    return (
        <div
            onClick={() => onClick(movie.id)}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg
                       hover:scale-105 hover:shadow-red-900/30 hover:shadow-xl
                       transition-all duration-300 cursor-pointer group"
        >
            <div className="relative">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                    }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30
                                transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-4xl opacity-0 
                                     group-hover:opacity-100 transition-all">
                        🔍
                    </span>
                </div>
            </div>
            <div className="p-3">
                <h3 className="text-white font-semibold text-center text-sm">
                    {movie.title}
                </h3>
            </div>
        </div>
    );
}