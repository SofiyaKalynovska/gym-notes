import mongoose from 'mongoose'

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true })

export default mongoose.model('Exercise', ExerciseSchema)
