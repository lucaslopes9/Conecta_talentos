const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1', // O IP local é mais garantido que 'localhost'
  user: 'root',
  password: '',      // DEIXE VAZIO (aspas simples sem nada dentro)
  database: 'conecta_talent',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('✅ Banco de Dados MySQL (XAMPP) conectado com sucesso!');
    connection.release();
  }
});

module.exports = pool.promise();