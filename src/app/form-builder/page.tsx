'use client';
import FormBuilder from '@/components/FormBuilder';
import ThemeToggle from '@/components/themeToffle';

export default function FormBuilderPage() {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <ThemeToggle />
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Form Builder</h1>
      <FormBuilder />
    </div>
  );
}
