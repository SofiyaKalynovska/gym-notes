import Exercise from '../models/exercise.js'

export const getAllExercises = () => {
  return Exercise.find().sort({ createdAt: -1 })
}

export const getExerciseById = (id) => {
  return Exercise.findById(id)
}

export const createExercise = (data) => {
  return Exercise.create(data)
}

export const updateExercise = (id, data) => {
  return Exercise.findByIdAndUpdate(id, data, { new: true })
}

export const deleteExercise = (id) => {
  return Exercise.findByIdAndDelete(id)
}
