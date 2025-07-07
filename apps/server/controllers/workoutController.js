import * as WorkoutRepo from '../repositories/workoutRepository.js'

export const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await WorkoutRepo.getAllWorkouts()
    res.json(workouts)
  } catch (err) {
    next(err)
  }
}

export const getWorkoutById = async (req, res, next) => {
  try {
    const workout = await WorkoutRepo.getWorkoutById(req.params.id)
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    res.json(workout)
  } catch (err) {
    next(err)
  }
}

export const getWorkoutsByExercise = async (req, res, next) => {
  try {
    const logs = await WorkoutRepo.getWorkoutsByExercise(req.params.exerciseId)
    res.json(logs)
  } catch (err) {
    next(err)
  }
}

export const createWorkout = async (req, res, next) => {
  try {
    const newWorkout = await WorkoutRepo.createWorkout(req.body)
    res.status(201).json(newWorkout)
  } catch (err) {
    next(err)
  }
}

export const updateWorkout = async (req, res, next) => {
  try {
    const updated = await WorkoutRepo.updateWorkout(req.params.id, req.body)
    if (!updated) return res.status(404).json({ message: 'Workout not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const deleteWorkout = async (req, res, next) => {
  try {
    const deleted = await WorkoutRepo.deleteWorkout(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Workout not found' })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}
