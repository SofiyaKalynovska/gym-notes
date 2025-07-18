'use client';

import { useGetAllWorkoutsQuery } from '@/features/api/workoutApi';
import { WorkoutSession } from '@/types';
import HistoryWorkoutCard from '@/components/HistoryWorkoutCard';

export default function HistoryPage() {
  const { data: workouts = [], isLoading } = useGetAllWorkoutsQuery();

  const completedWorkouts = workouts
    .filter((session: WorkoutSession) => session.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className='max-w-3xl mx-auto p-4 space-y-6'>
      <h1 className='text-2xl font-bold'>🕓 Workout History</h1>

      {isLoading && <p>Loading...</p>}

      {completedWorkouts.map((session) => (
        <HistoryWorkoutCard key={session._id} session={session} />
      ))}

      {!isLoading && completedWorkouts.length === 0 && (
        <p className='text-gray-500 dark:text-gray-400'>
          No completed workouts yet.
        </p>
      )}
    </div>
  );
}
