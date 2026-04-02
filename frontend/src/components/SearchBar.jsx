import { useState, useRef, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';

// Popular movies to show as default suggestions
const POPULAR_MOVIES = [
    'Avatar', 'Batman', 'Inception', 'Interstellar', 'The Avengers',
    'Iron Man', 'Spider-Man 3', 'The Dark Knight', 'Titanic', 'Jurassic Park'
];

export default function SearchBar({ movies, search, setSearch, onSearch }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (search.trim().length > 0) {
            const results = movies
                .filter(m => m.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 8);
            setFiltered(results);
        } else {
            setFiltered([]);
        }
    }, [search, movies]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (movie) => {
        setSearch(movie);
        setShowDropdown(false);
        // Auto search when selected
        setTimeout(() => onSearch(), 100);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowDropdown(false);
            onSearch();
        }
    };

    // Popular movies filtered from actual model movies
    const popularSuggestions = POPULAR_MOVIES.filter(p =>
        movies.includes(p)
    ).slice(0, 8);

    return (
        <div className="w-full max-w-2xl mx-auto" ref={dropdownRef}>
            {/* Search Input */}
            <div className="relative flex gap-3">
                <div className="relative flex-1">
                    <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                                         text-gray-400 text-lg" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search a movie... e.g. Avatar, Batman"
                        className="w-full pl-12 pr-10 py-4 bg-gray-800 text-white 
                                   border-2 border-gray-600 rounded-xl outline-none 
                                   focus:border-red-500 placeholder-gray-500 
                                   transition-all duration-200 text-base"
                    />
                    {search && (
                        <button
                            onClick={() => { setSearch(''); setShowDropdown(true); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 
                                       text-gray-400 hover:text-white transition text-lg"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button
                    onClick={() => { setShowDropdown(false); onSearch(); }}
                    className="bg-red-600 hover:bg-red-700 active:scale-95 
                               text-white px-8 py-4 rounded-xl font-bold 
                               transition-all duration-200 flex items-center gap-2"
                >
                    <BsSearch />
                    Search
                </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div className="absolute z-50 w-full max-w-2xl mt-2 bg-gray-800 
                                border border-gray-600 rounded-xl shadow-2xl overflow-hidden">

                    {/* When user is typing - show filtered results */}
                    {search.trim().length > 0 ? (
                        <>
                            <div className="px-4 py-2 bg-gray-700/50 border-b border-gray-600">
                                <p className="text-gray-400 text-xs">
                                    {filtered.length} results for "{search}"
                                </p>
                            </div>

                            {filtered.length > 0 ? (
                                <>
                                    {filtered.map((movie, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleSelect(movie)}
                                            className="flex items-center gap-3 px-4 py-3 
                                                       hover:bg-red-600/20 cursor-pointer 
                                                       transition-all duration-150 group
                                                       border-b border-gray-700/50 last:border-0"
                                        >
                                            <div className="w-8 h-8 bg-red-600/20 rounded-lg 
                                                            flex items-center justify-center 
                                                            group-hover:bg-red-600/40 transition text-sm">
                                                🎬
                                            </div>
                                            <span className="text-gray-200 group-hover:text-white 
                                                             transition flex-1 text-sm">
                                                {highlightMatch(movie, search)}
                                            </span>
                                            <span className="text-gray-600 group-hover:text-red-400 
                                                             transition text-sm">→</span>
                                        </div>
                                    ))}
                                    <div className="px-4 py-2 bg-gray-700/30 border-t border-gray-600">
                                        <p className="text-gray-500 text-xs text-center">
                                            Press Enter or click Search
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-3xl mb-2">🔍</p>
                                    <p className="text-gray-400 text-sm">No movies found for "{search}"</p>
                                </div>
                            )}
                        </>
                    ) : (
                        /* When input is empty - show popular suggestions */
                        <>
                            <div className="px-4 py-3 bg-gray-700/50 border-b border-gray-600 
                                            flex items-center justify-between">
                                <p className="text-gray-300 text-sm font-semibold">
                                    🔥 Popular Movies to Try
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Click to search
                                </p>
                            </div>

                            {popularSuggestions.map((movie, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(movie)}
                                    className="flex items-center gap-3 px-4 py-3 
                                               hover:bg-red-600/20 cursor-pointer 
                                               transition-all duration-150 group
                                               border-b border-gray-700/50 last:border-0"
                                >
                                    {/* Rank number */}
                                    <div className="w-8 h-8 bg-gray-700 rounded-lg 
                                                    flex items-center justify-center 
                                                    group-hover:bg-red-600/40 transition 
                                                    text-gray-400 group-hover:text-white
                                                    text-xs font-bold">
                                        {i + 1}
                                    </div>

                                    <span className="text-gray-200 group-hover:text-white 
                                                     transition flex-1 text-sm font-medium">
                                        {movie}
                                    </span>

                                    <span className="text-xs text-gray-500 
                                                     group-hover:text-red-400 transition">
                                        Try this →
                                    </span>
                                </div>
                            ))}

                            <div className="px-4 py-2 bg-gray-700/30 border-t border-gray-600">
                                <p className="text-gray-500 text-xs text-center">
                                    Type to search from 5000+ movies
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
        <>
            {text.slice(0, index)}
            <span className="text-red-400 font-semibold">
                {text.slice(index, index + query.length)}
            </span>
            {text.slice(index + query.length)}
        </>
    );
}