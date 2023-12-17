import React, { useEffect, useState } from 'react';
import './App.css';

interface SettingsFormProps {
  users: string[];
  selectedUser: string | null;
  userSettings: Record<string, any> | null;
  onSelectUser: (user: string) => void; 
  onSave: (data: Record<string, any>) => void;
}

export interface SettingsFormData {
  username: string;
  fontName: string;
  fontSize: number;
  fontColor: string;
  fontStyle: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSave, onSelectUser, users, userSettings, selectedUser }) => {
  const [settings, setSetting] = useState<Record<string, any>>({
    fontFamily: 'Helvetica',
    fontSize: '',
    fontColor: '',
    fontStyle: 'normal',
  });

  useEffect(() => {
    if (userSettings) {
      setSetting(userSettings);
    }
  }, [userSettings]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(settings);
  };

  const handleChange = (event: any) => {
    setSetting((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="input-container">
        <label className="label">Выберите пользователя:</label>
        <select value={selectedUser || ''} onChange={(e) => onSelectUser(e.target.value)}>
          <option value="" disabled={!!selectedUser}>-- Выберите пользователя --</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <label className="label">Название шрифта:</label>
        <select name="fontFamily" value={settings.fontFamily} onChange={handleChange}>
          <option value="Helvetica">Helvetica</option>
          <option value="New York">New York</option>
          <option value="Source Code Pro">Source Code Pro</option>
        </select>
      </div>

      <div className="input-container">
        <label className="label">Размер шрифта:</label>
        <input name='fontSize' type='number' value={settings.fontSize} onChange={handleChange} />
      </div>

      <div className="input-container">
        <label className="label">Цвет шрифта:</label>
        <input type="color" name="fontColor" value={settings.fontColor} onChange={handleChange} />
      </div>

      <div className="input-container">
        <label className="label">Начертание:</label>
        <select name="fontStyle" value={settings.fontStyle} onChange={handleChange}>
          <option value="normal">Обычный</option>
          <option value="italic">Курсив</option>
          <option value="bold">Полужирный</option>
        </select>
      </div>

      <button type="submit" disabled={!selectedUser}>Сохранить</button>
    </form>
  );
};

export default SettingsForm;
