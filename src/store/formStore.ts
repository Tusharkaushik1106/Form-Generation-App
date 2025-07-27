import { create } from 'zustand';

interface Question {
  type: string;
  label: string;
  options?: string[];
}

interface FormStore {
  questions: Question[];
  addQuestion: () => void;
  updateQuestion: (index: number, question: Question) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  questions: [],
  addQuestion: () => set((state) => ({
    questions: [...state.questions, { type: 'text', label: '' }],
  })),
  updateQuestion: (index, question) =>
    set((state) => {
      const updated = [...state.questions];
      updated[index] = question;
      return { questions: updated };
    }),
}));
