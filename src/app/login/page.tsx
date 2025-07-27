"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from '@/components/themeToffle';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid login credentials");
    } else {
      window.location.href = "/dashboard"; // redirect on success
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
      <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
      <p className="text-sm text-gray-600 dark:text-gray-400">Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign Up</Link></p>
    </main>
  );
}