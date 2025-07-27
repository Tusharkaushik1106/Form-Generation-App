'use client';
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from '@/components/themeToffle';

export default function PublicFormPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = use(params);
  const [form, setForm] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/public/${publicId}`)
      .then(res => res.ok ? res.json() : { form: null })
      .then(data => {
        setForm(data.form);
        setAnswers(data.form ? data.form.questions.map(() => "") : []);
        setLoading(false);
      });
  }, [publicId]);
  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch(`/api/public/${publicId}/response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: form.questions.map((q: any, i: number) => ({ questionId: q._id, value: answers[i] })) }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Submission failed");
    } else {
      setSuccess("Response submitted! Thank you.");
      setTimeout(() => router.push("/"), 2000);
    }
  }
  if (loading) return (
    <div className="text-center py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <ThemeToggle />
      <div>Loading...</div>
    </div>
  );
  if (!form) return (
    <div className="text-center py-10 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 transition-colors duration-200">
      <ThemeToggle />
      <div>Form not found.</div>
    </div>
  );
  return (
    <main className="max-w-xl mx-auto py-10 bg-white dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{form.title}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">{form.description}</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {form.questions.map((q: any, idx: number) => (
          <div key={q._id} className="space-y-1">
            <label className="font-semibold text-gray-900 dark:text-white">
              {q.label} {q.required && <span className="text-red-500">*</span>}
            </label>
            {q.type === "text" && (
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                value={answers[idx]}
                onChange={e => setAnswers(a => { const c = [...a]; c[idx] = e.target.value; return c; })}
                required={q.required}
              />
            )}
            {q.type === "paragraph" && (
              <textarea
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                value={answers[idx]}
                onChange={e => setAnswers(a => { const c = [...a]; c[idx] = e.target.value; return c; })}
                required={q.required}
              />
            )}
            {(q.type === "multiple_choice" || q.type === "dropdown") && (
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                value={answers[idx]}
                onChange={e => setAnswers(a => { const c = [...a]; c[idx] = e.target.value; return c; })}
                required={q.required}
              >
                <option value="">Select...</option>
                {q.options.map((opt: string, oidx: number) => (
                  <option key={oidx} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            {q.type === "checkbox" && (
              <div className="flex flex-col gap-1">
                {q.options.map((opt: string, oidx: number) => (
                  <label key={oidx} className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <input
                      type="checkbox"
                      checked={Array.isArray(answers[idx]) && answers[idx].includes(opt)}
                      onChange={e => setAnswers(a => {
                        const c = [...a];
                        if (!Array.isArray(c[idx])) c[idx] = [];
                        if (e.target.checked) c[idx] = [...c[idx], opt];
                        else c[idx] = c[idx].filter((v: string) => v !== opt);
                        return c;
                      })}
                      className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>}
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">Submit</button>
      </form>
    </main>
  );
} 