import mongoose from 'mongoose'

const SetSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
}, { _id: false })

const WorkoutExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: [SetSchema],
}, { _id: false })

const WorkoutSessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
  startTime: { type: Date }, 
  duration: { type: String }, 
  exercises: [WorkoutExerciseSchema],
}, { timestamps: true });


export default mongoose.model('WorkoutSession', WorkoutSessionSchema)
