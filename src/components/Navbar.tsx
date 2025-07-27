'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <Link href="/" className="font-bold text-xl text-blue-600">Form Builder</Link>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle dark mode"
          className="rounded px-3 py-1 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {session ? (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-200">{session.user?.name || session.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Logout</button>
          </>
        ) : (
          <Link href="/auth/login" className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Login</Link>
        )}
      </div>
    </nav>
  );
} 