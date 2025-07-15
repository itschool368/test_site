import React, { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Зворотній зв'язок</h1>
        <button onClick={openModal}>Зв'язатися з нами</button>
      </header>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
