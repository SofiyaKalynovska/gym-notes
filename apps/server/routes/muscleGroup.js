import express from 'express';
import {
  getAllMuscleGroups,
  getMuscleGroupBySlug,
  createMuscleGroup,
  updateMuscleGroup,
  deleteMuscleGroup,
} from '../controllers/muscleGroupController.js';

const router = express.Router();

router.get('/', getAllMuscleGroups);
router.get('/:slug', getMuscleGroupBySlug);
router.post('/', createMuscleGroup);
router.put('/:slug', updateMuscleGroup);
router.delete('/:slug', deleteMuscleGroup);

export default router;
