import * as MuscleRepo from '../repositories/muscleGroupRepository.js';

export const getAllMuscleGroups = async (req, res, next) => {
  try {
    const groups = await MuscleRepo.getAllMuscleGroups();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

export const getMuscleGroupBySlug = async (req, res, next) => {
  try {
    const group = await MuscleRepo.getMuscleGroupBySlug(req.params.slug);
    if (!group) return res.status(404).json({ message: 'Not found' });
    res.json(group);
  } catch (err) {
    next(err);
  }
};

export const createMuscleGroup = async (req, res, next) => {
  try {
    const newGroup = await MuscleRepo.createMuscleGroup(req.body);
    res.status(201).json(newGroup);
  } catch (err) {
    next(err);
  }
};

export const updateMuscleGroup = async (req, res, next) => {
  try {
    const updated = await MuscleRepo.updateMuscleGroup(req.params.slug, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteMuscleGroup = async (req, res, next) => {
  try {
    const deleted = await MuscleRepo.deleteMuscleGroup(req.params.slug);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
