'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <h2 className="text-2xl font-bold">Login</h2>
      <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="px-4 py-2 rounded border" required />
        <input name="password" type="password" placeholder="Password" className="px-4 py-2 rounded border" required />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-sm">Don't have an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
    </main>
  );
} 