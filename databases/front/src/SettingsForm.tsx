import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import './App.css';

interface SettingsFormProps {
  onSave: (data: SettingsFormData) => void;
  userOptions: string[];
}

export
interface SettingsFormData {
  username: string;
  fontName: string;
  fontSize: number;
  fontColor: string;
  fontStyle: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSave, userOptions }) => {
  const { register, handleSubmit } = useForm<SettingsFormData>();
  const [color, setColor] = useState('#000000');

  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    onSave({ ...data, fontColor: color });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
      <div className="input-container">
        <label className="label">Выберите пользователя:</label>
        <select {...register('username', { required: true })}>
          {userOptions.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <label className="label">Название шрифта:</label>
        <input {...register('fontName', { required: true })} />
      </div>

      <div className="input-container">
        <label className="label">Размер шрифта:</label>
        <input type="number" {...register('fontSize', { required: true, min: 0 })} />
      </div>

      <div className="input-container">
        <label className="label">Цвет шрифта:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <div className="input-container">
        <label className="label">Начертание:</label>
        <select {...register('fontStyle', { required: true })}>
          <option value="normal">Обычный</option>
          <option value="italic">Курсив</option>
          <option value="bold">Полужирный</option>
        </select>
      </div>

      <button type="submit">Сохранить</button>
    </form>
  );
};

export default SettingsForm;
