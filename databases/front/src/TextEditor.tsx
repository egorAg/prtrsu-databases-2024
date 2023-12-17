import React from 'react';
import './App.css';

interface TextEditorProps {
  text: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, onChange }) => {
  return (
    <div className="text-editor">
      <label className="label">Текст надписи:</label>
      <textarea
        className="text-form" // Добавлен класс для применения стилей
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextEditor;
