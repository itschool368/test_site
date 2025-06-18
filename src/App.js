import React, { useState } from 'react'; // Імпортуємо React і useState
import './App.css'; // Стилі для додатку
import Modal from './components/Modal'; // Імпортуємо компонент Modal

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відкриття/закриття модального вікна

  // Функція для збереження номера
  const savePhoneNumber = async (phoneNumber) => {
    if (!phoneNumber.trim()) {  // Перевіряємо, чи ввели номер
      alert('Будь ласка, введіть номер телефону'); // Якщо номер порожній, показуємо попередження
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/save-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
    
      if (!response.ok) throw new Error('Не вдалося зберегти номер');
    
      const data = await response.json();
      alert(data.message || 'Номер успішно збережено!');
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message || 'Щось пішло не так. Спробуйте ще раз.');
    }
    
  };

  return (
    <div className="App">
      {/* Кнопка для відкриття модального вікна */}
      <button onClick={() => setIsModalOpen(true)}>Залишити номер</button>

      {/* Модальне вікно */}
      <Modal
        isOpen={isModalOpen} // Чи відкрито модальне вікно
        onClose={() => setIsModalOpen(false)} // Закриваємо модальне вікно
        onSave={savePhoneNumber} // Функція для збереження номера
      />
    </div>
  );
};

export default App;
