import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsStarFill, BsPlayFill } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';
import { fetchMovieDetails, addFavourite } from '../services/api';

export default function MovieModal({ movieId, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchMovieDetails(movieId)
            .then(res => {
                setDetails(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [movieId]);

    const trailer = details?.videos?.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
    );

     const saveFavourite = async () => {
        if (!user) return alert('Please login to save favourites!');
        if (saved) return;
        setSaving(true);
        try {
            await addFavourite({
                movieId: details.id,
                title: details.title,
                poster: "https://image.tmdb.org/t/p/w500" + details.poster_path
            });
            setSaved(true);
            alert('Added to favourites! ❤️');
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to save!';
            alert(msg);
        }
        setSaving(false);
    };
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500" />
                    </div>
                ) : details ? (
                    <>
                        <div className="relative">
                            <img
                                src={"https://image.tmdb.org/t/p/original" + details.backdrop_path}
                                alt={details.title}
                                className="w-full h-64 object-cover rounded-t-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-t-2xl" />
                            <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-600 transition">
                                <AiOutlineClose size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{details.title}</h2>
                                    <p className="text-gray-400 mt-1">{details.release_date?.split('-')[0]} • {details.runtime} min</p>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                                    <BsStarFill className="text-yellow-400" />
                                    <span className="text-yellow-400 font-bold">{details.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {details.genres?.map(g => (
                                    <span key={g.id} className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm">{g.name}</span>
                                ))}
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6">{details.overview}</p>
                            <div className="mb-6">
                                <h3 className="text-white font-bold mb-2">Top Cast</h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.credits?.cast?.slice(0, 5).map(c => (
                                        <span key={c.id} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{c.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {trailer && (
                                    <a href={"https://youtube.com/watch?v=" + trailer.key} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition">
                                        <BsPlayFill size={20} />
                                        Watch Trailer
                                    </a>
                                )}
                               <button
    onClick={saveFavourite}
    disabled={saving || saved}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition
        ${saved
            ? 'bg-red-600/20 border border-red-500 text-red-400 cursor-default'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
>
    {saved ? '❤️ Saved!' : saving ? '⏳ Saving...' : '🤍 Save Favourite'}
</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-white text-center p-8">Failed to load details</p>
                )}
            </div>
        </div>
    );
}