import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveData = async (formData) => {
  try {
    setIsLoading(true);
    
    const response = await fetch('http://localhost:3001/save-data', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        phoneNumber: formData.phoneNumber.toString().trim()
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.dbMessage || 'Помилка сервера');
    }

    alert(`Дані збережено! ID: ${data.id}`);
    setIsModalOpen(false);
    return data;
    
  } catch (error) {
    console.error('Помилка збереження:', error);
    alert(error.message || 'Помилка при збереженні даних');
    throw error;
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Залишити дані</button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;