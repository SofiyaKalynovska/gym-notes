'use client';
import { useState } from 'react';
import {
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useDeleteExerciseMutation,
  useGetMuscleGroupsQuery,
} from '@/features/api/workoutApi';
import { Exercise } from '@/types';
import { ExerciseCard } from '@/components/ExerciseCard';
import { ModalOverlay } from '@/components/ModalOverlay';
import { Button } from '@/components/Button';

export default function ExercisesPage() {
  const { data: groups = [], isLoading: groupsLoading } =
    useGetMuscleGroupsQuery();
  const { data: exercises = [] } = useGetExercisesQuery();
  const [createExercise] = useCreateExerciseMutation();
  const [deleteExercise] = useDeleteExerciseMutation();

  const [editing, setEditing] = useState<Exercise | null>(null);
  const [form, setForm] = useState({
    name: '',
    muscleGroup: '',
    description: '',
  });
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      await createExercise(form).unwrap();
      setForm({ name: '', muscleGroup: '', description: '' });
      setShowModal(false);
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className='max-w-md mx-auto space-y-6 min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]'>
      <div>
        <h1 className='text-2xl font-bold text-center mb-4'>Exercises</h1>

        {/* Muscle group icon selector */}
        {!groupsLoading && (
          <div className='flex flex-wrap gap-2 mb-6 justify-center'>
            {groups.map((g) => (
              <button
                key={g._id}
                type='button'
                onClick={() => {
                  setSelectedGroup(g.slug);
                  setForm((prev) => ({ ...prev, muscleGroup: g.slug }));
                }}
                className={`flex flex-col items-center p-2 border rounded-xl ${
                  selectedGroup === g.slug
                    ? 'border-orange bg-[var(--color-bg-secondary)]'
                    : 'border-[var(--color-border-primary)] hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                <img
                  src={`http://localhost:5050/icons/${g.icon}`}
                  alt={g.name}
                  className='w-8 h-8 mb-1'
                />
                <span className='text-xs'>{g.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className='flex justify-center'>
          <Button onClick={() => setShowModal(true)}>+ Create Exercise</Button>
        </div>
      </div>

      <div className='space-y-4'>
        {exercises.map((ex) => (
          <ExerciseCard
            key={ex._id}
            exercise={ex}
            editing={editing}
            form={form}
            setForm={setForm}
            onEdit={() => setEditing(ex)}
            onCancelEdit={() => setEditing(null)}
            showConfirm={showConfirm === ex._id}
            onDelete={() => setShowConfirm(ex._id)}
            onConfirmDelete={async () => {
              await deleteExercise(ex._id);
              setShowConfirm(null);
            }}
            onCancelDelete={() => setShowConfirm(null)}
            onInputChange={handleChange}
          />
        ))}
      </div>

      <ModalOverlay open={showModal} onClose={() => setShowModal(false)}>
        <h2 className='text-2xl font-bold mb-4'>Create New Exercise</h2>
        <input
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Exercise name'
          className='w-full p-3 mb-3 border rounded-xl bg-[var(--color-bg-tertiary)] text-sm'
        />
        <p className='mb-2'>
          Muscle Group: {form.muscleGroup || 'None selected'}
        </p>
        <input
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Description (optional)'
          className='w-full p-3 mb-4 border rounded-xl bg-[var(--color-bg-tertiary)] text-sm'
        />
        <Button onClick={handleSubmit}>Create Exercise</Button>
      </ModalOverlay>
    </div>
  );
}
