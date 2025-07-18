import React, { useState, useEffect } from 'react';

interface Set {
  reps: number;
  weight: number;
}

interface DigitInputGroupProps {
  value: Set[];
  onChange: (updated: Set[]) => void;
  isEditing?: boolean;
}

export function DigitInputGroup({
  value,
  onChange,
  isEditing,
}: DigitInputGroupProps) {
  const [localSets, setLocalSets] = useState(
    value.map((set) => ({
      reps: set.reps.toString(),
      weight: set.weight.toString(),
    }))
  );

  useEffect(() => {
    const isDifferent =
      value.length !== localSets.length ||
      value.some(
        (set, i) =>
          set.reps.toString() !== localSets[i]?.reps ||
          set.weight.toString() !== localSets[i]?.weight
      );

    if (isDifferent) {
      setLocalSets(
        value.map((set) => ({
          reps: set.reps.toString(),
          weight: set.weight.toString(),
        }))
      );
    }
  }, [value]);

  const handleChange = (
    index: number,
    field: keyof Set,
    inputValue: string
  ) => {
    if (/^\d*$/.test(inputValue)) {
      const updatedLocal = [...localSets];
      updatedLocal[index] = { ...updatedLocal[index], [field]: inputValue };
      setLocalSets(updatedLocal);
    }
  };

  const handleBlur = (index: number, field: keyof Set) => {
    const strValue = localSets[index][field];
    const parsed = strValue === '' ? 0 : parseInt(strValue, 10);
    const finalValue = parsed < 0 ? 0 : parsed;

    const updatedLocal = [...localSets];
    updatedLocal[index][field] = finalValue.toString();
    setLocalSets(updatedLocal);

    const updated = value.map((set, i) => {
      if (i !== index) return set;
      return { ...set, [field]: finalValue };
    });

    onChange(updated);
  };

  const addSet = () => {
    onChange([...value, { reps: 0, weight: 0 }]);
  };

  const removeSet = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className={`grid  ${
          isEditing
            ? 'grid-cols-2 mb-4 gap-x-6 gap-y-2'
            : 'grid-cols-4 gap-1 text-center'
        }`}
      >
        {localSets.map((set, i) => (
          <div
            key={i}
            className={`flex items-center justify-center ${
              isEditing
                ? 'gap-4'
                : 'py-2 px-2 border border-orange rounded-xl text-sm'
            }`}
          >
            {isEditing ? (
              <>
                <input
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  value={set.reps}
                  onChange={(e) => handleChange(i, 'reps', e.target.value)}
                  onBlur={() => handleBlur(i, 'reps')}
                  placeholder='reps'
                  readOnly={!isEditing}
                  tabIndex={isEditing ? 0 : -1}
                  className='max-w-10 p-2 rounded-xl border text-white bg-transparent text-center focus:outline-none focus:border-orange placeholder:text-[9px]'
                />

                <input
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  value={set.weight}
                  onChange={(e) => handleChange(i, 'weight', e.target.value)}
                  onBlur={() => handleBlur(i, 'weight')}
                  placeholder='kg'
                  readOnly={!isEditing}
                  tabIndex={isEditing ? 0 : -1}
                  className='max-w-10 p-2 rounded-xl border text-white bg-transparent text-center focus:outline-none focus:border-orange placeholder:text-[9px]'
                />

                {localSets.length > 1 && (
                  <button
                    onClick={() => removeSet(i)}
                    className='text-red-400 text-xs hover:underline'
                  >
                    Remove
                  </button>
                )}
              </>
            ) : (
              <span className='text-white text-sm text-center'>{`${set.reps} x ${set.weight}kg`}</span>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <button
          onClick={addSet}
          className='w-full text-sm text-orange-500 font-medium text-center hover:underline'
        >
          + Add Set
        </button>
      )}
    </div>
  );
}
