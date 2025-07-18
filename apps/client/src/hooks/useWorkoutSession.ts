'use client';

import { useState, useEffect, useRef } from 'react';
import {
  useLazyGetAllWorkoutsQuery,
  useUpdateWorkoutMutation,
  useCreateWorkoutMutation,
} from '@/features/api/workoutApi';
import { WorkoutSession } from '@/types';

type Set = { reps: number; weight: number };
type ExerciseUpdate = { exercise: string; sets: Set[] };

const DEFAULT_SETS: Set[] = Array(4).fill({ reps: 0, weight: 0 });

export function useWorkoutSession() {
  const [loadWorkouts] = useLazyGetAllWorkoutsQuery();
  const [updateWorkout] = useUpdateWorkoutMutation();
  const [createWorkout] = useCreateWorkoutMutation();

  const [workout, setWorkout] = useState<WorkoutSession | null>(null);
  const [editing, setEditing] = useState(true);
  const [elapsed, setElapsed] = useState('');
  const [setsByExercise, setSetsByExercise] = useState<Record<string, Set[]>>(
    {}
  );
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    (async () => {
      try {
        const workouts = await loadWorkouts().unwrap();

        const existing = workouts.find((w) => w.status === 'active');

        if (existing) {
          const ids: string[] = [];
          const setsMap: Record<string, Set[]> = {};

          existing.exercises.forEach((ex) => {
            const id =
              typeof ex.exercise === 'string' ? ex.exercise : ex.exercise._id;
            ids.push(id);
            setsMap[id] = ex.sets?.length ? ex.sets : [...DEFAULT_SETS];
          });

          setWorkout(existing);
          setPendingIds(ids);
          setSetsByExercise(setsMap);
          setEditing(!existing.startTime);
        }

        initializedRef.current = true;
      } catch (err) {
        console.error('Failed to load workouts:', err);
      }
    })();
  }, [loadWorkouts]);

  useEffect(() => {
    if (!workout?.startTime) {
      setElapsed('');
      return;
    }

    const updateElapsed = () => {
      const diff = Date.now() - new Date(workout.startTime!).getTime();
      setElapsed(
        `${Math.floor(diff / 60000)}m ${Math.floor((diff % 60000) / 1000)}s`
      );
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [workout?.startTime]);

  return {
    workout,
    editing,
    elapsed,
    setsByExercise,
    setSetsByExercise,
    pendingIds,
    setPendingIds,
    setEditing,

    async startWorkout() {
      if (!pendingIds.length) return;

      const now = new Date();

      const exercisesToSave = pendingIds.map((id) => ({
        exercise: id,
        sets: setsByExercise[id] ?? [...DEFAULT_SETS],
      }));

      const createdWorkout = await createWorkout({
        status: 'active',
        startTime: now,
        date: now.toISOString(),
        exercises: exercisesToSave,
      }).unwrap();

      setWorkout(createdWorkout);
      setEditing(false);
    },

    async resumeWorkout() {
      if (!workout?.startTime || !pendingIds.length) return;

      const updatedExercises = pendingIds.map((id) => {
        const existing = workout.exercises.find(
          (e) =>
            (typeof e.exercise === 'string' ? e.exercise : e.exercise._id) ===
            id
        );
        return {
          exercise: id,
          sets: existing?.sets.length ? existing.sets : [...DEFAULT_SETS],
        };
      });

      await updateWorkout({
        id: workout._id,
        data: { exercises: updatedExercises },
      });

      setWorkout({ ...workout, exercises: updatedExercises });
      setEditing(false);
    },

    async finishWorkout() {
      if (!workout?.startTime) return;

      const diff = Date.now() - new Date(workout.startTime).getTime();
      const duration = `${Math.floor(diff / 60000)}m ${Math.floor(
        (diff % 60000) / 1000
      )}s`;

      const exercisesToSave = Object.entries(setsByExercise).map(
        ([id, sets]) => ({
          exercise: id,
          sets,
        })
      );

      await updateWorkout({
        id: workout._id,
        data: {
          status: 'completed',
          duration,
          exercises: exercisesToSave,
        },
      });

      setWorkout(null);
      setPendingIds([]);
      setSetsByExercise({});
      setEditing(true);
      setElapsed('');
      initializedRef.current = false;
    },
  };
}
