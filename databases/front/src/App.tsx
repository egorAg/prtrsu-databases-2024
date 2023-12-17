import React, { useState, useEffect } from 'react';
import SettingsForm from './SettingsForm';
import TextEditor from './TextEditor';
import FormattedText from './FormattedText';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [userSettings, setUserSettings] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/redis-connector/redis/get-users');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (usename: string) => {
    axios.post('http://localhost:3000/redis-connector/redis/get-text-data', { usename }).then((res) => {
      setUserSettings(res.data);
      setSelectedUser(usename);
    })
  }

  const handleSave = (newSettings: any) => {
    console.log('newSettings', newSettings);
    axios.post('http://localhost:3000/redis-connector/redis/set-text-data', newSettings).then(() => {
      setUserSettings(newSettings);
    })
  }

  return (
    <div className="container">
      <SettingsForm onSave={handleSave} users={users} onSelectUser={handleSelectUser} userSettings={userSettings} selectedUser={selectedUser} />
      <TextEditor text={text} onChange={setText} />
      <FormattedText
        username={selectedUser}
        settings={{ fontName: 'Arial', fontSize: 16, fontColor: '#000000', fontStyle: 'normal' }}
        text={text}
      />
    </div>
  );
};

export default App;
