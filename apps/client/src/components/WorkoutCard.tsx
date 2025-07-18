import { DigitInputGroup } from '@/components/ui/DigitInputGroup';
import { Exercise, WorkoutSet } from '@/types';

type WorkoutCardProps = {
  exercise: Exercise;
  value: WorkoutSet[];
  onChange: (updatedSets: WorkoutSet[]) => void;
  isEditing?: boolean;
};

export default function WorkoutCard({
  exercise,
  value,
  onChange,
  isEditing,
}: WorkoutCardProps) {
  return (
    <div className='border rounded-xl p-4'>
      <h3 className='text-xl font-semibold mb-2 text-center capitalize'>
        {exercise.name}
      </h3>
      <p className='text-base mb-4 '>{exercise.description}</p>

      <DigitInputGroup
        value={value}
        onChange={onChange}
        isEditing={isEditing}
      />
    </div>
  );
}
