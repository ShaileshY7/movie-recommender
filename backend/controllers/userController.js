import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already registered!' });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Save user
        const user = await User.create({ name, email, password: hashed });

        // Generate token
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'cinematch_secret',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email not found!' });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Wrong password!' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'cinematch_secret',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};