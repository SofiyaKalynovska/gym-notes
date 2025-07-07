'use client'

import { useState } from 'react'
import { useGetExercisesQuery, useCreateWorkoutMutation } from '@/features/api/workoutApi'
import WorkoutCard from '@/components/WorkoutCard'
import { Exercise } from '@/types'

export default function TodayPage() {
  const { data: exercises = [] } = useGetExercisesQuery()
  const [selected, setSelected] = useState<string[]>([])
  const [setsByExercise, setSetsByExercise] = useState<Record<string, { reps: number; weight: number }[]>>({})
  const [createWorkout] = useCreateWorkoutMutation()

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  const handleFinish = async () => {
    await createWorkout({
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      exercises: selected.map((id) => ({
        exercise: id,
        sets: setsByExercise[id] || [],
      })),
    })
    alert('Workout saved!')
    setSelected([])
    setSetsByExercise({})
  }

  return (
    <div className="min-h-screen px-4 pb-32 pt-6 max-w-md mx-auto bg-black text-white">
      <h1 className="text-2xl font-extrabold text-center">Today’s Workout</h1>

      <div className="flex flex-wrap justify-center gap-2 py-4">
        {exercises.map((e: Exercise) => (
          <button
            key={e._id}
            onClick={() => toggleSelect(e._id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected.includes(e._id)
                ? 'bg-orange-500 text-white'
                : 'bg-[#1A1A1A] text-gray-300 border border-gray-700'
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {selected.map((id) => (
          <WorkoutCard
            key={id}
            exercise={exercises.find((e) => e._id === id)!}
            value={setsByExercise[id] || []}
            onChange={(updated) => setSetsByExercise((prev) => ({ ...prev, [id]: updated }))}
          />
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 px-4">
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-orange-600"
          >
            ✅ Finish Workout
          </button>
        </div>
      )}
    </div>
  )
}
