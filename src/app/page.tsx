// Landing page for Google Forms Clone
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <h1 className="text-4xl font-bold text-center">Google Forms Clone</h1>
      <p className="text-lg text-center max-w-xl">Create, share, and analyze forms with a modern, easy-to-use interface. Sign up to get started or log in to manage your forms.</p>
      <div className="flex gap-4">
        <Link href="/auth/login" className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Login</Link>
        <Link href="/auth/signup" className="px-6 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300 transition">Sign Up</Link>
      </div>
    </main>
  );
}
