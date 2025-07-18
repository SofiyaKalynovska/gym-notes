'use client';

import { useWorkoutSession } from '@/hooks/useWorkoutSession';
import { useGetExercisesQuery } from '@/features/api/workoutApi';
import { Button } from '@/components/Button';
import WorkoutCard from '@/components/WorkoutCard';

export default function TodayPage() {
  const {
    workout,
    editing,
    elapsed,
    setsByExercise,
    setSetsByExercise,
    pendingIds,
    setPendingIds,
    setEditing,
    startWorkout,
    resumeWorkout,
    finishWorkout,
  } = useWorkoutSession();

  const { data: exercises = [] } = useGetExercisesQuery();

  const started = Boolean(workout?.startTime);

  const selectedIds = editing
    ? pendingIds
    : workout?.exercises.map((e) =>
        typeof e.exercise === 'string' ? e.exercise : e.exercise._id
      ) ?? [];

  const toggleExercise = (id: string) => {
    if (started && !editing) return;

    setPendingIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      if (!exists) {
        setSetsByExercise((old) => ({
          ...old,
          [id]: old[id] ?? Array(4).fill({ reps: 0, weight: 0 }),
        }));
      }
      return next;
    });
  };

  return (
    <div className='mx-auto text-white pb-24'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-center'>Today's Workout</h1>

        {started && elapsed && !editing && (
          <p className='text-center text-sm text-gray-400'>⏱ Time: {elapsed}</p>
        )}
      </div>
      {(!started || editing) && (
        <div className='flex flex-wrap justify-center gap-2 py-4 mb-4'>
          {exercises.map((ex) => (
            <Button
              key={ex._id}
              onClick={() => toggleExercise(ex._id)}
              className={`!w-auto px-4 py-2 rounded-full text-sm font-medium ${
                selectedIds.includes(ex._id)
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border-primary)]'
              }`}
            >
              {ex.name}
            </Button>
          ))}
        </div>
      )}

      <div className='space-y-6'>
        {selectedIds.map((id) => {
          const ex = exercises.find((e) => e._id === id);
          if (!ex) return null;

          const sets =
            setsByExercise[id] ?? Array(4).fill({ reps: 0, weight: 0 });

          return (
            <WorkoutCard
              key={id}
              exercise={ex}
              value={sets}
              isEditing={editing}
              onChange={(newSets) =>
                setSetsByExercise((prev) => ({ ...prev, [id]: newSets }))
              }
            />
          );
        })}
      </div>

      {selectedIds.length > 0 && (
        <div className='fixed bottom-4 inset-x-0 px-4'>
          {!started && (
            <Button
              onClick={startWorkout}
              className='py-2 text-lg rounded-xl shadow-md'
            >
              🚀 Start Workout
            </Button>
          )}
          {started && editing && (
            <Button
              onClick={resumeWorkout}
              className='py-2 text-lg rounded-xl shadow-md'
            >
              ▶️ Continue Workout
            </Button>
          )}
          {started && !editing && (
            <div className='flex gap-2'>
              <Button
                onClick={() => setEditing(true)}
                variant='outline'
                className='py-2 text-lg rounded-xl shadow-md bg-gray-600'
              >
                Back
              </Button>
              <Button
                onClick={finishWorkout}
                className='py-2 text-lg rounded-xl shadow-md'
              >
                ✅ Finish Workout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
