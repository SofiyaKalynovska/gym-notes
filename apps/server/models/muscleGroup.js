import mongoose from 'mongoose';

const MuscleGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true }, 
    icon: { type: String, required: true }, 
  },
  { timestamps: true }
);

const MuscleGroup =
  mongoose.models.MuscleGroup || mongoose.model('MuscleGroup', MuscleGroupSchema);

export default MuscleGroup;
