const mysql = require('mysql2');
require('dotenv').config();

/**
 * CONFIGURAÇÃO DE CONEXÃO:
 * No Railway, ele usará a DATABASE_URL automática.
 * No seu Linux (Local), ele usará os dados do XAMPP.
 */
const pool = mysql.createPool(process.env.DATABASE_URL || process.env.MYSQL_URL || {
  host: process.env.MYSQLHOST || '127.0.0.1',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'conecta_talent',
  port: process.env.MYSQLPORT || 3306,
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