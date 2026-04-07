import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import favouriteRoutes from './routes/favouriteRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', movieRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/favourites', favouriteRoutes);

app.get('/', (req, res) => {
    res.json({ message: '🎬 CineMatch API Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
// Keep Flask awake on free tier
const keepAlive = () => {
    const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5001';
    setInterval(async () => {
        try {
            await axios.get(`${FLASK_URL}/health`);
            console.log('Flask kept alive');
        } catch (err) {
            console.log('Flask ping failed:', err.message);
        }
    }, 10 * 60 * 1000); // every 10 minutes
};

keepAlive();