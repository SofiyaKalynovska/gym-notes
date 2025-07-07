import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import exerciseRoutes from './routes/exercises.js';
import workoutRoutes from './routes/workouts.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ API is alive');
});
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);

// Error handling middleware
app.use(errorHandler);

// Mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
