import * as ExerciseRepo from '../repositories/exerciseRepository.js'

export const getAllExercises = async (req, res, next) => {
  try {
    const exercises = await ExerciseRepo.getAllExercises()
    res.json(exercises)
  } catch (err) {
    next(err)
  }
}

export const getExerciseById = async (req, res, next) => {
  try {
    const exercise = await ExerciseRepo.getExerciseById(req.params.id)
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' })
    res.json(exercise)
  } catch (err) {
    next(err)
  }
}

export const createExercise = async (req, res, next) => {
  try {
    const newExercise = await ExerciseRepo.createExercise(req.body)
    res.status(201).json(newExercise)
  } catch (err) {
    next(err)
  }
}

export const updateExercise = async (req, res, next) => {
  try {
    const updated = await ExerciseRepo.updateExercise(req.params.id, req.body)
    if (!updated) return res.status(404).json({ message: 'Exercise not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const deleteExercise = async (req, res, next) => {
  try {
    const deleted = await ExerciseRepo.deleteExercise(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Exercise not found' })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}
