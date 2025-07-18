export interface Exercise {
  _id: string
  name: string
  muscleGroup?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface WorkoutSet {
  reps: number
  weight: number
}

export interface WorkoutExercise {
  exercise: Exercise | string  
  sets: WorkoutSet[]
}

export interface WorkoutSession {
  _id: string
  date: string
  status: 'draft' |'active' | 'completed'
  startTime: Date | null
  duration?: string
  exercises: WorkoutExercise[]
  createdAt?: string
  updatedAt?: string
}
