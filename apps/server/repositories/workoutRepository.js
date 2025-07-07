import WorkoutSession from '../models/WorkoutSession.js';

export const getAllWorkouts = () => {
  return WorkoutSession.find()
    .sort({ date: -1 })
    .populate('exercises.exercise');
};

export const getWorkoutById = (id) => {
  return WorkoutSession.findById(id).populate('exercises.exercise');
};

export const getWorkoutsByExercise = (exerciseId) => {
  return WorkoutSession.find({ 'exercises.exercise': exerciseId })
    .sort({ date: -1 })
    .limit(5)
    .populate('exercises.exercise');
};

export const createWorkout = (data) => {
  return WorkoutSession.create(data);
};

export const updateWorkout = (id, data) => {
  return WorkoutSession.findByIdAndUpdate(id, data, { new: true });
};

export const deleteWorkout = (id) => {
  return WorkoutSession.findByIdAndDelete(id);
};
