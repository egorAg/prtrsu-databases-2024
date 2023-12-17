import React, { useState, useEffect } from 'react';
import SettingsForm from './SettingsForm';
import TextEditor from './TextEditor';
import FormattedText from './FormattedText';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userOptions, setUserOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/redis-connector/redis/get-users');
        setUserOptions(response.data);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (user: string) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <SettingsForm onSave={(data) => console.log('Saved:', data)} userOptions={userOptions} />
      <TextEditor text="Some initial text" onChange={(value) => console.log('Text changed:', value)} />
      <FormattedText
        username={selectedUser}
        settings={{ fontName: 'Arial', fontSize: 16, fontColor: '#000000', fontStyle: 'normal' }}
        text="Some formatted text"
      />
    </div>
  );
};

export default App;
