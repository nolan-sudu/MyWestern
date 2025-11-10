import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Auth routes: /api/auth/register, /api/auth/login
app.use('/api/auth', authRoutes);

// User routes: /api/user/me (protected)
app.use('/api/user', userRoutes);

// Example protected dashboard route
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is your dashboard.` });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
