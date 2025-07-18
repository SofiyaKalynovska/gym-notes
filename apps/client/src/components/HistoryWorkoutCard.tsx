'use client';

import { WorkoutSession } from '@/types';

interface HistoryWorkoutCardProps {
  session: WorkoutSession;
}

export default function HistoryWorkoutCard({
  session,
}: HistoryWorkoutCardProps) {
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return new Intl.DateTimeFormat('default', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className='rounded-xl border border-orange p-4 shadow-md bg-[var(--color-bg-secondary)] text-white'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-sm font-semibold text-gray-300'>
          {formatDate(session.date)}
        </h2>
        {session.duration && (
          <p className='text-xs text-gray-400'>
            ⏱ Duration: {session.duration}
          </p>
        )}
      </div>

      {session.exercises.map((ex, idx) => (
        <div key={idx} className='mb-2'>
          <p className='font-medium text-orange-400 mb-1 capitalize'>
            {typeof ex.exercise === 'string' ? ex.exercise : ex.exercise.name}
          </p>
          <div className='flex flex-wrap gap-2 text-sm text-gray-300 pl-1'>
            {ex.sets.map((s, i) => (
              <span key={i} className='bg-white/10 px-2 py-1 rounded-md'>
                {s.weight} kg
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
