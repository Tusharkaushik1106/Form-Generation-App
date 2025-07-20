'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
const FormBuilder = dynamic(() => import("@/components/FormBuilder"), { ssr: false });
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";
export default function DashboardPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);
  const [formDraft, setFormDraft] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      const res = await fetch("/api/forms", {
        cache: "no-store",
        credentials: "include",
        headers: (session as any)?.token ? { Authorization: `Bearer ${(session as any).token}` } : {}
      });
      const data = res.ok ? await res.json() : { forms: [] };
      setForms(data.forms || []);
      setLoading(false);
    })();
  }, []);
  function openBuilder(form: any = null) {
    setShowBuilder(true);
    setEditingForm(form);
    setFormDraft(form ? { ...form } : null);
  }
  async function handleSave(formData: any) {
    if (!formData || !formData.title || formData.questions.some((q: any) => !q.label.trim())) {
      alert("Please provide a title and labels for all questions.");
      return;
    }
    const session = await getSession();
    if (editingForm) {
      const res = await fetch(`/api/forms/${editingForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(session as any)?.token ? { Authorization: `Bearer ${(session as any).token}` } : {}
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      if (res.ok) {
        const updated = await res.json();
        setForms(forms => forms.map(f => f._id === updated.form._id ? updated.form : f));
      }
    } else {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session as any)?.token ? { Authorization: `Bearer ${(session as any).token}` } : {}
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      if (res.ok) {
        const created = await res.json();
        setForms(forms => [created.form, ...forms]);
      }
    }
    setShowBuilder(false);
    setEditingForm(null);
    setFormDraft(null);
  }
  async function handleDelete(id: string) {
    const session = await getSession();
    if (!window.confirm("Delete this form?")) return;
    const res = await fetch(`/api/forms/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: (session as any)?.token ? { Authorization: `Bearer ${(session as any).token}` } : {}
    });
    if (res.ok) {
      setForms(forms => forms.filter(f => f._id !== id));
    }
  }
  if (loading) return <div className="text-center py-10">Loading...</div>;
  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Your Forms</h1>
      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => openBuilder()}
        >
          + New Form
        </button>
      </div>
      {showBuilder && (
        <div className="mb-8 border rounded p-6 bg-white dark:bg-gray-900">
          <FormBuilder
            key={editingForm?._id || 'new'}
            form={editingForm}
            onChange={setFormDraft}
          />
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => handleSave(formDraft)}
          >
            Save
          </button>
          <button className="mt-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700" onClick={() => { setShowBuilder(false); setEditingForm(null); setFormDraft(null); }}>
            Cancel
          </button>
        </div>
      )}
      {forms.length === 0 ? (
        <div className="border rounded p-6 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <p className="text-center">No forms yet. Start by creating a new form!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {forms.map((form: any) => (
            <li key={form._id} className="border rounded p-4 bg-white dark:bg-gray-900 flex justify-between items-center">
              <div>
                <div className="font-semibold">{form.title}</div>
                <div className="text-sm text-gray-500">{form.description}</div>
                <div className="mt-2 flex gap-2 items-center">
                  <button
                    className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs"
                    onClick={async () => {
                      await navigator.clipboard.writeText(`${window.location.origin}/public/${form.publicId}`);
                      setCopiedId(form._id);
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                  >
                    {copiedId === form._id ? "Copied!" : "Copy Link"}
                  </button>
                  <a
                    href={`/dashboard/${form._id}/responses`}
                    className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                  >
                    View Responses
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs" onClick={() => openBuilder(form)}>Edit</button>
                <button className="px-2 py-1 rounded bg-red-500 text-white text-xs" onClick={() => handleDelete(form._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
} 