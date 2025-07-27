import './globals.css';
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Form Builder',
  description: 'Create, share, and analyze forms with our modern form builder application',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-200`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

