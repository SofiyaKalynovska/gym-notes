'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const resolved = stored === 'dark' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', resolved)
    setTheme(resolved)
    setHasMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  if (!hasMounted) return null

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-4 left-4 z-50 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
      {children}
    </>
  )
}
