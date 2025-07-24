import React, { useState } from 'react'; // Додано імпорт useState
import './Modal.css';


const Modal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      phone: phone,
      message: message
    };

    try {
      const res = await fetch('https://ec2-13-53-200-62.eu-north-1.compute.amazonaws.com:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      setResponse(result.message || 'Повідомлення надіслано!');

      setName('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setResponse('❌ Помилка при надсиланні');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label>Ім'я:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Номер телефону:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Коментар:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Відправити</button>
          {response && <p style={{ marginTop: '10px' }}>{response}</p>}
        </form>
      </div>
    </div>
  );
};

export default Modal;