'use client';
import { useState, useEffect } from "react";
const QUESTION_TYPES = [
  { value: "text", label: "Short Answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "dropdown", label: "Dropdown" },
];
function emptyQuestion() {
  return {
    type: "text",
    label: "",
    options: [],
    required: false,
    section: "",
  };
}
export default function FormBuilder({ form, onChange }: { form?: any; onChange?: (f: any) => void }) {
  const [title, setTitle] = useState(form?.title || "");
  const [description, setDescription] = useState(form?.description || "");
  const [questions, setQuestions] = useState(form?.questions || [emptyQuestion()]);
  useEffect(() => {
    setTitle(form?.title || "");
    setDescription(form?.description || "");
    setQuestions(form?.questions || [emptyQuestion()]);
  }, [form]);
  function updateQuestion(idx: number, q: any) {
    const updated = [...questions];
    updated[idx] = q;
    setQuestions(updated);
    onChange && onChange({ title, description, questions: updated });
  }
  function addQuestion() {
    setQuestions([...questions, emptyQuestion()]);
  }
  function removeQuestion(idx: number) {
    if (questions.length === 1) return;
    const updated = questions.filter((_opt: string, i: number) => i !== idx);
    setQuestions(updated);
    onChange && onChange({ title, description, questions: updated });
  }
  function handleTitle(e: any) {
    setTitle(e.target.value);
    onChange && onChange({ title: e.target.value, description, questions });
  }
  function handleDescription(e: any) {
    setDescription(e.target.value);
    onChange && onChange({ title, description: e.target.value, questions });
  }
  return (
    <div className="space-y-6">
      <div>
        <input
          className="w-full text-2xl font-bold border-b p-2 mb-2 bg-transparent"
          placeholder="Form Title"
          value={title}
          onChange={handleTitle}
        />
        <textarea
          className="w-full border p-2 rounded bg-transparent"
          placeholder="Form Description"
          value={description}
          onChange={handleDescription}
        />
      </div>
      <div className="space-y-8">
        {questions.map((q: any, idx: number) => (
          <div key={idx} className="border rounded p-4 bg-gray-50 dark:bg-gray-800 relative">
            <div className="flex gap-2 mb-2">
              <select
                className="border rounded px-2 py-1"
                value={q.type}
                onChange={e => updateQuestion(idx, { ...q, type: e.target.value, options: [""], label: "" })}
              >
                {QUESTION_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <input
                className="flex-1 border rounded px-2 py-1"
                placeholder="Question label"
                value={q.label}
                onChange={e => updateQuestion(idx, { ...q, label: e.target.value })}
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={e => updateQuestion(idx, { ...q, required: e.target.checked })}
                />
                Required
              </label>
              <button
                type="button"
                className="ml-2 px-2 py-1 rounded bg-red-500 text-white text-xs"
                onClick={() => removeQuestion(idx)}
                disabled={questions.length === 1}
              >
                Delete
              </button>
            </div>
            {(q.type === "multiple_choice" || q.type === "checkbox" || q.type === "dropdown") && (
              <div className="space-y-2 mt-2">
                {q.options.map((opt: string, oidx: number) => (
                  <div key={oidx} className="flex gap-2 items-center">
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      placeholder={`Option ${oidx + 1}`}
                      value={opt}
                      onChange={e => {
                        const opts = [...q.options];
                        opts[oidx] = e.target.value;
                        updateQuestion(idx, { ...q, options: opts });
                      }}
                    />
                    <button
                      type="button"
                      className="px-2 py-1 rounded bg-red-400 text-white text-xs"
                      onClick={() => {
                        const opts = q.options.filter((_opt: string, i: number) => i !== oidx);
                        updateQuestion(idx, { ...q, options: opts });
                      }}
                      disabled={q.options.length === 1}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-blue-500 text-white text-xs"
                  onClick={() => updateQuestion(idx, { ...q, options: [...q.options, ""] })}
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          onClick={addQuestion}
        >
          + Add Question
        </button>
      </div>
    </div>
  );
} 