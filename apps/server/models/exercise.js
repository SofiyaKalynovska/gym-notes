import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  muscleGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MuscleGroup',                 
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Exercise', ExerciseSchema);
