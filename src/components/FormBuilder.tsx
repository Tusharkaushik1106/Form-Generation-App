'use client';
import { useState, useEffect } from "react";

const QUESTION_TYPES = [
  { value: "text", label: "Short Answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "dropdown", label: "Dropdown" },
];

interface Question {
  type: string;
  label: string;
  options: string[];
  required: boolean;
  section: string;
}

interface Form {
  _id?: string;
  title: string;
  description: string;
  questions: Question[];
  publicId?: string;
}

function emptyQuestion(): Question {
  return {
    type: "text",
    label: "",
    options: [],
    required: false,
    section: "",
  };
}

export default function FormBuilder({ form, onChange }: { form?: Form; onChange?: (f: Form) => void }) {
  const [title, setTitle] = useState(form?.title || "");
  const [description, setDescription] = useState(form?.description || "");
  const [questions, setQuestions] = useState<Question[]>(form?.questions || [emptyQuestion()]);

  useEffect(() => {
    setTitle(form?.title || "");
    setDescription(form?.description || "");
    setQuestions(form?.questions || [emptyQuestion()]);
  }, [form]);

  function updateQuestion(idx: number, q: Question) {
    const updated = [...questions];
    updated[idx] = q;
    setQuestions(updated);
    if (onChange) {
      onChange({ title, description, questions: updated });
    }
  }

  function addQuestion() {
    setQuestions([...questions, emptyQuestion()]);
  }

  function removeQuestion(idx: number) {
    if (questions.length === 1) return;
    const updated = questions.filter((_opt: Question, i: number) => i !== idx);
    setQuestions(updated);
    if (onChange) {
      onChange({ title, description, questions: updated });
    }
  }

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (onChange) {
      onChange({ title: e.target.value, description, questions });
    }
  }

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
    if (onChange) {
      onChange({ title, description: e.target.value, questions });
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Form Header */}
      <div className="space-y-4">
        <div>
          <input
            className="w-full text-2xl sm:text-3xl font-bold border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Untitled Form"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          <textarea
            className="w-full border-none outline-none bg-transparent text-gray-600 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none text-sm sm:text-base"
            placeholder="Form description"
            rows={2}
            value={description}
            onChange={handleDescription}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4 sm:space-y-6">
        {questions.map((q: Question, idx: number) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
              <div className="flex-1 space-y-3">
                {/* Question Type Selector */}
                <select
                  className="w-full sm:w-48 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 sm:py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  value={q.type}
                  onChange={e => updateQuestion(idx, { ...q, type: e.target.value, options: [""], label: "" })}
                >
                  {QUESTION_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>

                {/* Question Label */}
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 sm:py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Question"
                  value={q.label}
                  onChange={e => updateQuestion(idx, { ...q, label: e.target.value })}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={e => updateQuestion(idx, { ...q, required: e.target.checked })}
                    className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="hidden sm:inline">Required</span>
                  <span className="sm:hidden">Req</span>
                </label>
                <button
                  type="button"
                  className="p-3 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  onClick={() => removeQuestion(idx)}
                  disabled={questions.length === 1}
                  title="Delete question"
                >
                  <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Options for choice questions */}
            {(q.type === "multiple_choice" || q.type === "checkbox" || q.type === "dropdown") && (
              <div className="space-y-3 mt-4 pl-2 sm:pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Options</div>
                {q.options.map((opt: string, oidx: number) => (
                  <div key={oidx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 sm:py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                        placeholder={`Option ${oidx + 1}`}
                        value={opt}
                        onChange={e => {
                          const opts = [...q.options];
                          opts[oidx] = e.target.value;
                          updateQuestion(idx, { ...q, options: opts });
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="p-3 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        const opts = q.options.filter((_opt: string, i: number) => i !== oidx);
                        updateQuestion(idx, { ...q, options: opts });
                      }}
                      disabled={q.options.length === 1}
                      title="Delete option"
                    >
                      <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 sm:py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
                  onClick={() => updateQuestion(idx, { ...q, options: [...q.options, ""] })}
                >
                  <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm sm:text-base">Add Option</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-4 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          onClick={addQuestion}
        >
          <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-lg sm:text-base">Add Question</span>
        </button>
      </div>
    </div>
  );
} 