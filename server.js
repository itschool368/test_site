const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Підключення до бази даних
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'it_school',
});

// Middleware для розбору JSON
app.use(cors());
app.use(express.json());

// Маршрут для запису номера
app.post('/save-phone', (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });  // Повертаємо JSON з помилкою
  }

  const query = 'INSERT INTO child (idchild) VALUES (?)';
  db.query(query, [phoneNumber], (err, result) => {
    if (err) {
      console.error('Error saving phone number:', err);
      return res.status(500).json({ error: 'Internal Server Error' });  // Повертаємо JSON з помилкою
    }
    // Повертаємо успішну відповідь із результатом
    res.json({ message: 'Phone number successfully saved', id: result.insertId });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});