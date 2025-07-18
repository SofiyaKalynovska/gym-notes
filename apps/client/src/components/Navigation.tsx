'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ModalOverlay } from '@/components/ModalOverlay';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/today', label: 'Today' },
  { href: '/history', label: 'History' },
  { href: '/exercises', label: 'Exercises' },
  { href: '/stats', label: 'Stats' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className='fixed top-4 right-4 z-50 flex gap-4 items-center'>
        <h3>GymNotes</h3>
        <button
          className='lg:hidden p-2 rounded-full bg-gray-200 dark:bg-sec-dark dark:hover:bg-white/20'
          onClick={() => setOpen(!open)}
          aria-label='Toggle Menu'
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className='hidden lg:block fixed top-0 left-0 h-full w-64 p-4 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)] z-30'>
        <ul className='space-y-4 mt-16'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-xl text-sm font-medium transition ${
                  pathname === item.href
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ModalOverlay open={open} onClose={() => setOpen(false)}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-6 py-4 rounded-xl w-full text-center ${
              pathname === item.href
                ? 'bg-[var(--color-accent)] text-white'
                : 'border'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </ModalOverlay>
    </>
  );
}
