// NotesEditor.tsx
import React from 'react';

interface NotesEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-700">
        Notes
      </label>
      <textarea
        id="notes"
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your thoughts here..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NotesEditor;
