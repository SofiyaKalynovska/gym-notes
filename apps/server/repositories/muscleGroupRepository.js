import MuscleGroup from '../models/muscleGroup.js';


export const getAllMuscleGroups = () => {
  return MuscleGroup.find().sort({ name: 1 });
};

export const getMuscleGroupBySlug = (slug) => {
  return MuscleGroup.findOne({ slug });
};

export const createMuscleGroup = (data) => {
  return MuscleGroup.create(data);
};

export const updateMuscleGroup = (slug, data) => {
  return MuscleGroup.findOneAndUpdate({ slug }, data, { new: true });
};

export const deleteMuscleGroup = (slug) => {
  return MuscleGroup.findOneAndDelete({ slug });
};
