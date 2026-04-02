import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setError('All fields are required!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await loginUser(form);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
                    className="w-full h-full object-cover opacity-10"
                />
            </div>
            <div className="relative z-10 bg-gray-800/90 backdrop-blur p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-red-500">🎬 CineMatch</h1>
                    <p className="text-gray-400 mt-1">Welcome back!</p>
                </div>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            className="w-full p-4 bg-gray-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            className="w-full p-4 bg-gray-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-4 rounded-xl font-bold transition-all duration-200 text-lg disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login 🎬'}
                    </button>
                </div>
                <p className="text-gray-400 text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-red-400 hover:text-red-300 font-semibold">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}