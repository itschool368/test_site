const express = require('express');
const mysql = require('mysql2/promise'); // Використовуємо проміси
const cors = require('cors');
const app = express();
const PORT = 3001;

// Пул з'єднань для стабільної роботи з БД
const pool = mysql.createPool({
  host: '13.53.200.62',
  user: 'root_nik',
  password: '123qweasd',
  database: 'test_site',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Перевірка підключення до БД
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Підключення до БД успішне!');
  } catch (err) {
    console.error('Помилка підключення до БД:', err);
    process.exit(1);
  }
}
testConnection();

// Маршрут для збереження даних
app.post('/save-data', async (req, res) => {
  let connection;
  try {
    const { name, phoneNumber } = req.body;

    // Валідація даних
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "INVALID_NAME",
        message: "Ім'я має містити щонайменше 2 символи"
      });
    }

    if (!phoneNumber || !/^[\d\s\+()-]+$/.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_PHONE",
        message: "Номер телефону має містити тільки цифри та спецсимволи"
      });
    }

    connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (name, phone_number) VALUES (?, ?)',
      [name.trim(), phoneNumber.trim()]
    );
    
    res.json({
      success: true,
      id: result.insertId,
      name: name.trim(),
      phoneNumber: phoneNumber.trim()
    });

  } catch (err) {
    console.error('Помилка сервера:', err);
    res.status(500).json({
      success: false,
      error: "DB_ERROR",
      message: "Не вдалося зберегти дані",
      dbMessage: err.message
    });
  } finally {
    if (connection) connection.release();
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});