import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Number, required: true },
    title: { type: String, required: true },
    poster: { type: String },
}, { timestamps: true });

export default mongoose.model('Favourite', favouriteSchema);