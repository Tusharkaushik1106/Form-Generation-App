'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from '@/components/themeToffle';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Signup failed");
    } else {
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1500);
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
      <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <input 
          name="name" 
          type="text" 
          placeholder="Name" 
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
          required 
        />
        <button 
          type="submit" 
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>}
      <p className="text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link></p>
    </main>
  );
} 