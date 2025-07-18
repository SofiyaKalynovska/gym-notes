'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export function Button({ variant = 'solid', className, ...props }: Props) {
  const base = 'px-4 py-2 rounded-full text-base  shadow transition w-full';

  const variants = {
    solid:
      'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
    outline:
      'border border-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent-hover)] hover:text-white',
  };

  return (
    <button {...props} className={clsx(base, variants[variant], className)} />
  );
}
