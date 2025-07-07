'use client'

import { useGetAllWorkoutsQuery } from '@/features/api/workoutApi'
import { WorkoutSession } from '@/types'

export default function HistoryPage() {
  const { data: workouts = [], isLoading } = useGetAllWorkoutsQuery()

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🕓 Workout History</h1>

      {isLoading && <p>Loading...</p>}

      {workouts.map((session: WorkoutSession) => (
        <div key={session._id} className="border rounded-md p-4 bg-gray-100 dark:bg-gray-900">
          <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
            {session.date} — {session.status}
          </h2>

          {session.exercises.map((ex, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{typeof ex.exercise === 'string' ? ex.exercise : ex.exercise.name}</p>
              <ul className="text-sm pl-4 list-disc">
                {ex.sets.map((s, i) => (
                  <li key={i}>{s.reps} x {s.weight} kg</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
