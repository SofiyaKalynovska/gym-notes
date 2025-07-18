'use client';

import { Exercise } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useGetMuscleGroupsQuery,
  useUpdateExerciseMutation,
} from '@/features/api/workoutApi';
import { Button } from '@/components/Button';
import { ModalOverlay } from '@/components/ModalOverlay';
import { MuscleGroupBadge } from '@/components/MuscleGroupBadge';

interface Props {
  exercise: Exercise;
  editing: Exercise | null;
  form: { name: string; muscleGroup: string; description: string };
  setForm: Dispatch<
    SetStateAction<{ name: string; muscleGroup: string; description: string }>
  >;
  onEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  showConfirm: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ExerciseCard({
  exercise,
  editing,
  form,
  setForm,
  onEdit,
  onCancelEdit,
  onDelete,
  showConfirm,
  onConfirmDelete,
  onCancelDelete,
  onInputChange,
}: Props) {
  const isEditing = editing?._id === exercise._id;
  const [updateExercise] = useUpdateExerciseMutation();
  const { data: muscleGroups = [], isLoading: loadingGroups } =
    useGetMuscleGroupsQuery();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setForm({
        name: exercise.name || '',
        muscleGroup: exercise.muscleGroup || '',
        description: exercise.description || '',
      });
    } else {
      setForm({ name: '', muscleGroup: '', description: '' });
    }
  }, [isEditing, exercise, setForm]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateExercise({ id: exercise._id, data: form }).unwrap();
      onCancelEdit();
    } catch {
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };
  console.log('muscleGroups', muscleGroups);
  return (
    <div className='p-4 rounded-xl shadow-md flex flex-col gap-3 border border-gray-200 dark:border-gray-600'>
      {isEditing ? (
        <>
          <input
            name='name'
            value={form.name}
            onChange={onInputChange}
            placeholder='Exercise name'
            className='w-full p-2 rounded-xl bg-input border border-input text-sm focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent'
          />

          {loadingGroups ? (
            <p>Loading muscle groups...</p>
          ) : (
            <div className='grid grid-cols-4 gap-2 mb-3'>
              {muscleGroups.map((group) => {
                const selected = form.muscleGroup === group._id;
                return (
                  <button
                    key={group._id}
                    type='button'
                    onClick={() =>
                      setForm((prev) => ({ ...prev, muscleGroup: group._id }))
                    }
                    className={`flex flex-col items-center p-2 rounded-md border ${
                      selected
                        ? 'border-orange bg-orange/20'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    <img
                      src={`http://localhost:5050/icons/${group.icon}`}
                      alt={group.name}
                      className='w-8 h-8 mb-1'
                    />
                    <span className='text-xs text-white'>{group.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          <input
            name='description'
            value={form.description}
            onChange={onInputChange}
            placeholder='Description'
            className='w-full p-2 rounded-xl bg-input border border-input text-sm focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent'
          />

          <div className='flex justify-end gap-2 pt-1'>
            <Button onClick={handleSave} disabled={saving}>
              💾 Save
            </Button>
            <Button variant='outline' onClick={onCancelEdit}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className='bg-[var(--color-bg-primary)]'>
          <h2 className='text-lg font-bold text-center capitalize'>
            {exercise.name}
          </h2>
          {muscleGroups.length > 0 && (
            <div className='flex justify-center my-2'>
              {(() => {
                const group = muscleGroups.find(
                  (g) => g._id === exercise.muscleGroup
                );
                return group ? (
                  <MuscleGroupBadge name={group.name} icon={group.icon} />
                ) : (
                  <span className='text-xs text-muted'>Unknown group</span>
                );
              })()}
            </div>
          )}

          {exercise.description && (
            <p className='text-sm text-muted'>{exercise.description}</p>
          )}
        </div>
      )}

      {!isEditing && (
        <div className='pt-2 flex justify-end gap-4'>
          <Button onClick={onEdit} variant='outline'>
            ✏️ Edit
          </Button>
          <Button onClick={onDelete} variant='outline'>
            ❌ Delete
          </Button>
        </div>
      )}

      <ModalOverlay open={showConfirm} onClose={onCancelDelete}>
        <h3 className='text-lg font-semibold text-center'>
          Are you sure you want to delete this exercise?
        </h3>
        <div className='flex justify-end gap-3'>
          <Button onClick={onCancelDelete} variant='outline'>
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} variant='solid'>
            Delete
          </Button>
        </div>
      </ModalOverlay>
    </div>
  );
}
