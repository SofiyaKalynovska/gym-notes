import express from 'express'
import {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByExercise,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js'

const router = express.Router()

router.get('/', getAllWorkouts)
router.get('/:id', getWorkoutById)
router.get('/exercise/:exerciseId', getWorkoutsByExercise) 
router.post('/', createWorkout)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

export default router
