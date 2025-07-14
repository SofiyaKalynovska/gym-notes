import express from 'express'
import {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByExercise,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  startWorkoutTimer,
} from '../controllers/workoutController.js'

const router = express.Router()

router.get('/', getAllWorkouts)
router.get('/:id', getWorkoutById)
router.get('/exercise/:exerciseId', getWorkoutsByExercise) 
router.post('/', createWorkout)
router.post('/start', startWorkoutTimer)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

export default router
