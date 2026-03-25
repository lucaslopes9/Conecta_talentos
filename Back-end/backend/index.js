const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); 

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: '*', // Permite qualquer site (Vercel, Localhost, etc)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- ROTAS DA API ---

app.get('/', (req, res) => {
  res.send('🚀 API Conecta Talent rodando com sucesso!');
});

// 1. Listar todas as vagas
app.get('/api/vagas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vagas ORDER BY data_criacao DESC');
    res.json(rows);
  } catch (err) {
    console.error('❌ Erro ao buscar vagas:', err);
    res.status(500).json({ error: 'Erro ao buscar vagas', details: err.message });
  }
});

// 2. Criar uma nova vaga
app.post('/api/vagas', async (req, res) => {
  const { empresa_id, titulo, descricao, salario, tipo, habilidades_requeridas } = req.body;
  
  try {
    const sql = `INSERT INTO vagas 
      (empresa_id, titulo, descricao, salario, tipo, habilidades_requeridas) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(sql, [
      empresa_id, 
      titulo, 
      descricao || null, 
      salario || null, 
      tipo || 'Presencial', 
      habilidades_requeridas || null
    ]);
    
    res.status(201).json({ message: 'Vaga criada com sucesso!', id: result.insertId });
  } catch (err) {
    // Aqui o erro 500 será detalhado no terminal para você ver o motivo real
    console.error('❌ Erro ao criar vaga no Banco:', err.sqlMessage || err.message);
    res.status(500).json({ error: 'Erro ao criar vaga', details: err.message });
  }
});

// 3. Cadastro de Usuário (CORRIGIDO PARA TABELA EMPRESAS)
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  
  try {
    // PASSO 1: Salva na tabela 'users'
    const sqlUser = 'INSERT INTO users (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)';
    const [resultUser] = await db.query(sqlUser, [nome, email, senha, tipo]);
    const novoUserId = resultUser.insertId;

    // PASSO 2: Sincroniza com a tabela 'empresas' se o tipo for correto
    if (tipo === 'empresa') {
      // Ajustado com os nomes do seu print: id, user_id, nome_empresa
      const sqlEmpresa = 'INSERT INTO empresas (id, user_id, nome_empresa) VALUES (?, ?, ?)';
      await db.query(sqlEmpresa, [novoUserId, novoUserId, nome]);
      console.log(`🏢 Empresa '${nome}' sincronizada na tabela empresas.`);
    }
    
    res.status(201).json({ 
      message: 'Usuário registrado com sucesso!', 
      id: novoUserId 
    });
  } catch (err) {
    console.error('❌ Erro no cadastro:', err.sqlMessage || err.message);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado!' });
    }
    res.status(500).json({ error: 'Erro ao registrar usuário', details: err.message });
  }
});

// 4. Rota de Login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos!' });
    }

    const usuario = rows[0];

    if (senha !== usuario.senha_hash) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos!' });
    }

    res.json({
      message: 'Login realizado com sucesso!',
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });

  } catch (err) {
    console.error('❌ Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});