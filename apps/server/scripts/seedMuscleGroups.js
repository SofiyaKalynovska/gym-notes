import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MuscleGroup from '../models/muscleGroup.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const groups = [
  { name: 'Arms', slug: 'arms', icon: 'arms.svg' },
  { name: 'Chest', slug: 'chest', icon: 'chest.svg' },
  { name: 'Back', slug: 'back', icon: 'back.svg' },
  { name: 'Legs', slug: 'legs', icon: 'legs.svg' },
  { name: 'Glutes', slug: 'glutes', icon: 'glutes.svg' },
  { name: 'Core', slug: 'core', icon: 'core.svg' },
];

await MuscleGroup.deleteMany();
await MuscleGroup.insertMany(groups);
console.log('✅ Muscle groups seeded');
process.exit();
