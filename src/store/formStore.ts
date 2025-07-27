import { createContext, useContext, useState, ReactNode } from 'react';

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

const FormStoreContext = createContext<FormStore | undefined>(undefined);

export const FormStoreProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions(prev => [...prev, { type: 'text', label: '' }]);
  };

  const updateQuestion = (index: number, question: Question) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = question;
      return updated;
    });
  };

  return (
    <FormStoreContext.Provider value={{ questions, addQuestion, updateQuestion }}>
      {children}
    </FormStoreContext.Provider>
  );
};

export const useFormStore = () => {
  const context = useContext(FormStoreContext);
  if (context === undefined) {
    throw new Error('useFormStore must be used within a FormStoreProvider');
  }
  return context;
};
