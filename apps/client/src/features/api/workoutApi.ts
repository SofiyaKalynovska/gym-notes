import { apiSlice } from './apiSlice'
import { Exercise, WorkoutSession } from '@/types'

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // EXERCISES

    getExercises: builder.query<Exercise[], void>({
      query: () => '/exercises',
      providesTags: ['Exercise'],
    }),

    createExercise: builder.mutation<Exercise, Partial<Exercise>>({
      query: (exercise) => ({
        url: '/exercises',
        method: 'POST',
        body: exercise,
      }),
      invalidatesTags: ['Exercise'],
    }),

    updateExercise: builder.mutation<Exercise, { id: string; data: Partial<Exercise> }>({
      query: ({ id, data }) => ({
        url: `/exercises/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Exercise'],
    }),

    deleteExercise: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/exercises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Exercise'],
    }),

    // WORKOUTS

    getLastLogs: builder.query<WorkoutSession[], string>({
      query: (exerciseId) => `/workouts/exercise/${exerciseId}`,
      providesTags: ['Workout'],
    }),

    getAllWorkouts: builder.query<WorkoutSession[], void>({
      query: () => '/workouts',
      providesTags: ['Workout'],
    }),

    createWorkout: builder.mutation<WorkoutSession, Partial<WorkoutSession>>({
      query: (workout) => ({
        url: '/workouts',
        method: 'POST',
        body: workout,
      }),
      invalidatesTags: ['Workout'],
    }),
  }),
})

export const {
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
  useGetLastLogsQuery,
  useGetAllWorkoutsQuery,
  useCreateWorkoutMutation,
} = workoutApi
