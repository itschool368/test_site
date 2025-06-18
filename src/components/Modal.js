// src/components/Modal.js
import React, { useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onSave }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;  // Якщо вікно не відкрите, нічого не рендеримо
const handleSave = async () => {
  if (!phoneNumber.trim()) {
    alert('Введіть номер телефону');
    return;
  }

  try {
    await onSave(phoneNumber); // Чекаємо завершення onSave
    setPhoneNumber(''); // Очищаємо поле
    onClose(); // Закриваємо модалку
  } catch (error) {
    console.error("Помилка при збереженні номеру", error);
    // Помилка вже виведена в alert у App.js, тому тут можна нічого не робити
    // Або додатково обробити її тут
  }
};
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Залиште свій номер</h2>
        <input
          type="text"
          placeholder="Ваш номер телефону"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="modal-input"
        />
        <button className="save-button" onClick={handleSave}>Зберегти</button>
      </div>
    </div>
  );
}

export default Modal;
