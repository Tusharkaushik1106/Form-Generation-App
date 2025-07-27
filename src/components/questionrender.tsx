interface Question {
  label: string;
  type: string;
  options: string[];
}

interface QuestionRendererProps {
  questions: Question[];
}

export default function QuestionRenderer({ questions }: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <div key={i} className="p-2 border rounded">
          <p className="mb-2">{q.label}</p>
          {q.type === 'text' && <input type="text" className="border p-1 w-full" />}
          {q.type === 'radio' &&
            q.options.map((opt: string, idx: number) => (
              <label key={idx}>
                <input type="radio" name={`q-${i}`} /> {opt}
              </label>
            ))}
          {/* Add checkbox or dropdown as needed */}
        </div>
      ))}
    </div>
  );
}
