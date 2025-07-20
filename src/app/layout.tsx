import '../globals.css';
import Navbar from '@/components/Navbar';
import ClientProviders from '@/components/ClientProviders';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen transition-colors">
        <ClientProviders>
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
