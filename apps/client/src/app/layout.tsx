import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ThemeProvider } from './themeProvider'

export const metadata: Metadata = {
  title: 'Gym Notes',
  description: 'Track exercises and workouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

