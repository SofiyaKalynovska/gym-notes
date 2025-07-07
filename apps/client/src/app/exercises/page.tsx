'use client';

import { useState } from 'react';
import {
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} from '@/features/api/workoutApi';
import { Exercise } from '@/types';

export default function ExercisesPage() {
  const { data: exercises = [] } = useGetExercisesQuery();
  const [createExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const [deleteExercise] = useDeleteExerciseMutation();

  const [editing, setEditing] = useState<Exercise | null>(null);
  const [form, setForm] = useState({
    name: '',
    muscleGroup: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateExercise({ id: editing._id, data: form }).unwrap();
      } else {
        await createExercise(form).unwrap();
      }
      setForm({ name: '', muscleGroup: '', description: '' });
      setEditing(null);
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const handleEdit = (ex: Exercise) => {
    setEditing(ex);
    setForm({
      name: ex.name,
      muscleGroup: ex.muscleGroup,
      description: ex.description || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this exercise?')) {
      await deleteExercise(id);
    }
  };

  return (
    <div className='px-4 py-6 max-w-md mx-auto space-y-6 min-h-screen bg-white dark:bg-black'>
      <h1 className='text-3xl font-bold text-center text-gray-900 dark:text-white'>
        Manage Exercises
      </h1>
      <div className='p-4 bg-white text-black dark:bg-black dark:text-white'>
        Theme test
      </div>
      <div className='space-y-4'>
        <input
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Exercise name'
          className='w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm'
        />
        <input
          name='muscleGroup'
          value={form.muscleGroup}
          onChange={handleChange}
          placeholder='Muscle group'
          className='w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm'
        />
        <input
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Description (optional)'
          className='w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm'
        />
        <button
          onClick={handleSubmit}
          className='w-full bg-pink-600 text-white py-3 rounded-full text-base font-semibold tracking-wide shadow hover:bg-pink-700 transition'
        >
          {editing ? 'Update Exercise' : 'Create Exercise'}
        </button>
      </div>

      <div className='space-y-4'>
        {exercises.map((ex) => (
          <div
            key={ex._id}
            className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col gap-1 shadow-sm'
          >
            <div className='text-lg font-semibold text-gray-800 dark:text-white'>
              {ex.name}{' '}
              <span className='text-sm font-normal text-gray-500'>
                ({ex.muscleGroup})
              </span>
            </div>
            {ex.description && (
              <p className='text-sm text-gray-500 dark:text-gray-300'>
                {ex.description}
              </p>
            )}
            <div className='flex gap-4 pt-2'>
              <button
                onClick={() => handleEdit(ex)}
                className='text-sm text-blue-600 font-medium hover:underline'
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(ex._id)}
                className='text-sm text-red-600 font-medium hover:underline'
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
