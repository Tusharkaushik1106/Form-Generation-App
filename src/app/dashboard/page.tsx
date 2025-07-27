'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import ThemeToggle from '@/components/themeToffle';

const FormBuilder = dynamic(() => import("@/components/FormBuilder"), { ssr: false });

interface Form {
  _id?: string;
  title: string;
  description: string;
  publicId?: string;
  questions: Array<{
    type: string;
    label: string;
    options: string[];
    required: boolean;
    section: string;
  }>;
}

interface Session {
  token?: string;
}

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [formDraft, setFormDraft] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      const session = await getSession() as Session | null;
      const res = await fetch("/api/forms", {
        cache: "no-store",
        credentials: "include",
        headers: session?.token ? { Authorization: `Bearer ${session.token}` } : {}
      });
      const data = res.ok ? await res.json() : { forms: [] };
      setForms(data.forms || []);
      setLoading(false);
    })();
  }, []);
  
  function openBuilder(form: Form | null = null) {
    setShowBuilder(true);
    setEditingForm(form);
    setFormDraft(form ? { ...form } : null);
  }
  
  async function handleSave(formData: Form) {
    if (!formData || !formData.title || formData.questions.some((q) => !q.label.trim())) {
      alert("Please provide a title and labels for all questions.");
      return;
    }
    const session = await getSession() as Session | null;
    if (editingForm) {
      const res = await fetch(`/api/forms/${editingForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {})
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
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {})
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
    const session = await getSession() as Session | null;
    if (!window.confirm("Delete this form?")) return;
    
    try {
      const res = await fetch(`/api/forms/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: session?.token ? { Authorization: `Bearer ${session.token}` } : {}
      });
      
      if (res.ok) {
        setForms(forms => forms.filter(f => f._id !== id));
        console.log("Form deleted successfully");
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData);
        alert(`Failed to delete form: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete form. Please try again.");
    }
  }
  
  if (loading) return (
    <div className="text-center py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <ThemeToggle />
      <div>Loading...</div>
    </div>
  );
  
  return (
    <main className="w-full px-4 sm:px-6 py-6 sm:py-10 bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Forms</h1>
        <div className="flex justify-end mb-6">
          <button
            className="px-4 py-3 sm:py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            onClick={() => openBuilder()}
          >
            + New Form
          </button>
        </div>
        {showBuilder && (
          <div className="mb-8 border border-gray-300 dark:border-gray-600 rounded p-4 sm:p-6 bg-white dark:bg-gray-800">
            <FormBuilder
              key={editingForm?._id || 'new'}
              form={editingForm || undefined}
              onChange={(f) => setFormDraft(f)}
            />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                className="px-4 py-3 sm:py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                onClick={() => handleSave(formDraft!)}
              >
                Save
              </button>
              <button 
                className="px-4 py-3 sm:py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base" 
                onClick={() => { setShowBuilder(false); setEditingForm(null); setFormDraft(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {forms.length === 0 ? (
          <div className="border border-gray-300 dark:border-gray-600 rounded p-6 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <p className="text-center">No forms yet. Start by creating a new form!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {forms.map((form: Form) => (
              <div key={form._id} className="border border-gray-300 dark:border-gray-600 rounded p-4 bg-white dark:bg-gray-800">
                <div className="mb-3">
                  <div className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">{form.title}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{form.description}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <button
                    className="px-3 py-2 sm:py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={async () => {
                      await navigator.clipboard.writeText(`${window.location.origin}/public/${form.publicId || ''}`);
                      setCopiedId(form._id || '');
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                  >
                    {copiedId === form._id ? "Copied!" : "Copy Link"}
                  </button>
                  <a
                    href={`/dashboard/${form._id}/responses`}
                    className="px-3 py-2 sm:py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700 transition-colors duration-200 text-center"
                  >
                    View Responses
                  </a>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 sm:py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200" onClick={() => openBuilder(form)}>Edit</button>
                  <button className="flex-1 px-3 py-2 sm:py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600 transition-colors duration-200" onClick={() => handleDelete(form._id || '')}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 