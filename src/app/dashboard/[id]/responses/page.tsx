'use client';
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale);
export default function ResponsesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [responses, setResponses] = useState<any[]>([]);
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/forms/${id}/responses`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : { responses: [] })
      .then(data => setResponses(data.responses || []))
      .catch(() => setError("Failed to load responses"))
      .finally(() => setLoading(false));
    fetch(`/api/forms/${id}`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : { form: null })
      .then(data => setForm(data.form));
  }, [id]);
  function exportCSV() {
    const rows = responses.map(r => {
      const row: any = { submittedAt: r.submittedAt };
      r.answers.forEach((a: any, i: number) => {
        row[form?.questions?.[i]?.label || `Q${i + 1}`] = Array.isArray(a.value) ? a.value.join(", ") : a.value;
      });
      return row;
    });
    const header = Object.keys(rows[0] || {});
    const csv = [header.join(",")].concat(rows.map(r => header.map(h => r[h]).join(","))).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  let chartData = null;
  if (responses.length && responses[0].answers[0]) {
    const allValues = responses.map(r => r.answers[0].value).flat();
    const counts: Record<string, number> = {};
    allValues.forEach((v: string) => {
      counts[v] = (counts[v] || 0) + 1;
    });
    chartData = {
      labels: Object.keys(counts),
      datasets: [{ label: "Responses", data: Object.values(counts), backgroundColor: "#2563eb" }],
    };
  }
  if (loading || !form || !form.questions) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Responses</h1>
      <button className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" onClick={exportCSV}>Export CSV</button>
      {chartData && (
        <div className="mb-8">
          <Bar data={chartData} />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">#</th>
              {form?.questions?.map((q: any, i: number) => (
                <th key={i} className="border px-2 py-1">{q.label}</th>
              ))}
              <th className="border px-2 py-1">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((r, i) => (
              <tr key={r._id}>
                <td className="border px-2 py-1">{i + 1}</td>
                {r.answers.map((a: any, j: number) => (
                  <td key={j} className="border px-2 py-1">{Array.isArray(a.value) ? a.value.join(", ") : a.value}</td>
                ))}
                <td className="border px-2 py-1">{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 