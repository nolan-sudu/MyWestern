import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is your dashboard.` });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
