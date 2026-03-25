const mysql = require('mysql2');
require('dotenv').config();

/**
 * CONFIGURAÇÃO DE CONEXÃO:
 * No Railway, ele usará a DATABASE_URL automática.
 * No seu Linux (Local), ele usará os dados do XAMPP.
 */
const pool = mysql.createPool(process.env.DATABASE_URL || {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'conecta_talent',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão ao iniciar o servidor
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    console.log('💡 Dica: Verifique se o XAMPP está ligado ou se a DATABASE_URL no Railway está correta.');
  } else {
    const localOuNuvem = process.env.DATABASE_URL ? "RAILWAY" : "XAMPP (Local)";
    console.log(`✅ Banco de Dados conectado com sucesso via [${localOuNuvem}]!`);
    connection.release();
  }
});

module.exports = pool.promise();