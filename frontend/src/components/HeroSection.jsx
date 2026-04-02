import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
    const { isDark } = useTheme();
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
                    alt="hero"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
            </div>
            <div className="relative z-10 text-center py-12 md:py-20 lg:py-24 px-4 md:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 leading-tight">
                    Find Your Next
                    <span className="text-red-500"> Favourite</span>
                    <br />Movie
                </h2>
                <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-2">
                    Powered by Machine Learning ✨
                </p>
                <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-10">
                    Enter a movie you love and discover similar ones instantly!
                </p>
            </div>
        </div>
    );
}