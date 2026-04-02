import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Navbar */}
            <nav className="px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🎬</span>
                    <span className="text-2xl font-black text-red-500">CineMatch</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login"
                        className="text-gray-300 hover:text-white px-5 py-2 
                                   rounded-lg font-medium transition">
                        Login
                    </Link>
                    <Link to="/register"
                        className="bg-red-600 hover:bg-red-700 text-white 
                                   px-6 py-2 rounded-lg font-semibold transition">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
                        className="w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
                </div>

                <div className="relative z-10 text-center py-28 px-8 max-w-4xl mx-auto">
                    <div className="inline-block bg-red-600/20 border border-red-500/30 
                                    text-red-400 px-4 py-2 rounded-full text-sm 
                                    font-medium mb-6">
                        ✨ Powered by Machine Learning
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                        Discover Your Next
                        <span className="text-red-500"> Favourite</span>
                        <br />Movie
                    </h1>
                    <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                        Get personalized movie recommendations based on what you love. 
                        Powered by AI and real-time data.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/register"
                            className="bg-red-600 hover:bg-red-700 active:scale-95 
                                       text-white px-10 py-4 rounded-xl font-bold 
                                       text-lg transition-all duration-200">
                            Get Started Free 🚀
                        </Link>
                        <Link to="/login"
                            className="bg-gray-700 hover:bg-gray-600 text-white 
                                       px-10 py-4 rounded-xl font-bold text-lg 
                                       transition-all duration-200">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-8 py-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                    Everything You Need
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🤖',
                            title: 'AI Recommendations',
                            desc: 'Our ML model analyzes thousands of movies to find perfect matches for you'
                        },
                        {
                            icon: '🔥',
                            title: 'Trending Movies',
                            desc: 'Stay updated with what\'s trending this week from real-time data'
                        },
                        {
                            icon: '❤️',
                            title: 'Save Favourites',
                            desc: 'Build your personal watchlist and never forget a great movie'
                        },
                        {
                            icon: '🎬',
                            title: 'Watch Trailers',
                            desc: 'Watch YouTube trailers directly from the app before deciding'
                        },
                        {
                            icon: '⭐',
                            title: 'Ratings & Reviews',
                            desc: 'See ratings, cast, genres and full plot for every movie'
                        },
                        {
                            icon: '🔍',
                            title: 'Smart Search',
                            desc: 'Search from 5000+ movies with instant intelligent suggestions'
                        }
                    ].map((f, i) => (
                        <div key={i}
                            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 
                                       hover:border-red-500/50 transition-all duration-300 
                                       hover:shadow-lg hover:shadow-red-900/20">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-600 text-sm">
                <p>🎬 CineMatch — Built with React, Node.js & Machine Learning</p>
            </footer>
        </div>
    );
}