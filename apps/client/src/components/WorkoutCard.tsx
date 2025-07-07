// ✅ Modern, simplified WorkoutCard matching gym app look
'use client'

import { useState } from 'react'
import { useGetLastLogsQuery } from '@/features/api/workoutApi'
import { Exercise } from '@/types'

interface Props {
  exercise: Exercise
  value: { reps: number; weight: number }[]
  onChange: (updated: { reps: number; weight: number }[]) => void
}

export default function WorkoutCard({ exercise, value, onChange }: Props) {
  const { data: lastLogs = [] } = useGetLastLogsQuery(exercise._id)
  const [showMore, setShowMore] = useState(false)

  const latestSets = lastLogs[0]?.exercises.find(e => {
    return typeof e.exercise === 'string'
      ? e.exercise === exercise._id
      : e.exercise._id === exercise._id
  })?.sets || []

  const handleSetChange = (i: number, field: 'reps' | 'weight', val: number) => {
    const updated = [...value]
    updated[i] = { ...updated[i], [field]: val }
    onChange(updated)
  }

  const addSet = () => {
    onChange([...value, { reps: 0, weight: 0 }])
  }

  return (
    <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-5 shadow-md space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[var(--text-color)]">{exercise.name}</h2>
        <button
          onClick={() => setShowMore((v) => !v)}
          className="text-xs text-orange-400 font-medium hover:underline"
        >
          {showMore ? 'Hide history' : 'Show more'}
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Last session: {latestSets.length === 0 ? '—' : latestSets.map((s, i) => (
          <span key={i}>{s.reps}x{s.weight}kg{ i < latestSets.length - 1 ? ', ' : ''}</span>
        ))}
      </div>

      {showMore && (
        <div className="text-xs space-y-1 text-gray-500">
          {lastLogs.map((log) => {
            const found = log.exercises.find(e => {
              return typeof e.exercise === 'string'
                ? e.exercise === exercise._id
                : e.exercise._id === exercise._id
            })
            if (!found) return null

            return (
              <div key={log._id}>
                <span className="text-orange-400 font-medium">{log.date}:</span>{' '}
                {found.sets.map((s, i) => `${s.reps}x${s.weight}kg`).join(', ')}
              </div>
            )
          })}
        </div>
      )}

      <div className="space-y-3">
        {value.map((set, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="number"
              className="flex-1 rounded-lg px-4 py-2 bg-[var(--gray-100)] text-[var(--text-color)] border border-[var(--card-border)] text-sm placeholder:text-gray-400"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => handleSetChange(i, 'reps', Number(e.target.value))}
            />
            <input
              type="number"
              className="flex-1 rounded-lg px-4 py-2 bg-[var(--gray-100)] text-[var(--text-color)] border border-[var(--card-border)] text-sm placeholder:text-gray-400"
              placeholder="Weight (kg)"
              value={set.weight}
              onChange={(e) => handleSetChange(i, 'weight', Number(e.target.value))}
            />
          </div>
        ))}

        <button
          onClick={addSet}
          className="w-full text-sm text-orange-500 font-medium text-center hover:underline"
        >
          + Add Set
        </button>
      </div>
    </div>
  )
}