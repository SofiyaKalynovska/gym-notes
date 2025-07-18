'use client';

import React from 'react';

interface Props {
  name: string;
  icon: string;
}

export function MuscleGroupBadge({ name, icon }: Props) {
  return (
    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-gray-200 text-dark text-xs">
      <img
        src={`http://localhost:5050/icons/${icon}`}
        alt={name}
        className="w-4 h-4"
      />
      <span className="capitalize">{name}</span>
    </div>
  );
}
