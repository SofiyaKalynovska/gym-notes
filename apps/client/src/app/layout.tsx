import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { ThemeProvider } from './themeProvider';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Gym Notes',
  description: 'Track exercises and workouts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <Navigation />
            <main className='lg:ml-64 mt-16 p-4 max-h-screen'>{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
