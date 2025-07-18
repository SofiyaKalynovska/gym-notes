'use client'

import { useState } from 'react'
import { useGetExercisesQuery, useGetLastLogsQuery } from '@/features/api/workoutApi'
import { Exercise, WorkoutSession } from '@/types'

export default function StatsPage() {
  const { data: exercises = [] } = useGetExercisesQuery()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: logs = [] } = useGetLastLogsQuery(selectedId!, {
    skip: !selectedId,
  })

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Workout Stats</h1>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {exercises.map((e: Exercise) => (
          <button
            key={e._id}
            onClick={() => setSelectedId(e._id)}
            className={`rounded-xl px-3 py-2 text-sm border 
              ${selectedId === e._id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
          >
            {e.name}
          </button>
        ))}
      </div>

      {selectedId && logs.length > 0 && (
        <div className="space-y-4">
          {logs.map((log: WorkoutSession) => {
            const sets = log.exercises.find(ex => typeof ex.exercise === 'string' ? ex.exercise === selectedId : ex.exercise._id === selectedId)?.sets || []

            const volume = sets.reduce((sum, s) => sum + s.reps * s.weight, 0)

            return (
              <div key={log._id} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border">
                <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                  {log.date} — {sets.length} sets, total volume: <strong>{volume} kg</strong>
                </h2>

                <div className="flex flex-col gap-1 mt-2">
                  {sets.map((s, i) => (
                    <div key={i} className="text-sm">
                      Set {i + 1}: {s.reps} reps × {s.weight} kg = {s.reps * s.weight} kg
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedId && logs.length === 0 && (
        <p className="text-gray-500">No logs yet for this exercise.</p>
      )}
    </div>
  )
}
