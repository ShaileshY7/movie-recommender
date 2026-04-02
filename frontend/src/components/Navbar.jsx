import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSun, BsMoon, BsList, BsX } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 border-b border-gray-700 px-4 md:px-8 py-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🎬</span>
                    <span className="text-xl md:text-2xl font-black text-red-500">CineMatch</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-300 hover:text-red-400 font-medium transition">
                        Home
                    </Link>
                    <Link to="/favourites" className="flex items-center gap-2 text-gray-300 hover:text-red-400 font-medium transition">
                        ❤️ Favourites
                    </Link>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={toggleTheme}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition">
                        {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
                    </button>
                    <div className="w-px h-6 bg-gray-600" />
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-gray-300 text-sm">Hi, {user.name}!</span>
                            </div>
                            <button onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Right */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleTheme}
                        className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white">
                        {isDark ? <BsSun size={14} /> : <BsMoon size={14} />}
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)}
                        className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white">
                        {menuOpen ? <BsX size={20} /> : <BsList size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-3">
                    {user && (
                        <div className="flex items-center gap-2 px-2 pb-3 border-b border-gray-700">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-300 text-sm">Hi, {user.name}!</span>
                        </div>
                    )}
                    <Link to="/" onClick={() => setMenuOpen(false)}
                        className="block text-gray-300 hover:text-white py-2 px-2 rounded-lg hover:bg-gray-800 transition">
                        🏠 Home
                    </Link>
                    <Link to="/favourites" onClick={() => setMenuOpen(false)}
                        className="block text-gray-300 hover:text-white py-2 px-2 rounded-lg hover:bg-gray-800 transition">
                        ❤️ Favourites
                    </Link>
                    {user ? (
                        <button onClick={logout}
                            className="w-full text-left text-red-400 py-2 px-2 rounded-lg hover:bg-gray-800 transition">
                            🚪 Logout
                        </button>
                    ) : (
                        <div className="flex gap-2 pt-2">
                            <Link to="/login" onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center bg-gray-700 text-white py-2 rounded-lg text-sm transition">
                                Login
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center bg-red-600 text-white py-2 rounded-lg text-sm transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}