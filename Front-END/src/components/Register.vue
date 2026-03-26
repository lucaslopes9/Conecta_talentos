<template>
  <div class="cadastro-container">
    <h2>Criar sua conta no Conecta Talent</h2>
    
    <form @submit.prevent="handleCadastro">
      <div class="field">
        <label>{{ form.tipo === 'empresa' ? 'Nome da Empresa:' : 'Nome Completo:' }}</label>
        <input 
          v-model="form.nome" 
          type="text" 
          :placeholder="form.tipo === 'empresa' ? 'Ex: Tech Solutions LTDA' : 'Ex: Lucas Lopes'" 
          required 
        />
      </div>

      <div class="field">
        <label>E-mail:</label>
        <input v-model="form.email" type="email" placeholder="seu@email.com" required />
      </div>

      <div class="field">
        <label>Senha:</label>
        <div class="password-wrapper">
          <input 
            v-model="form.senha" 
            :type="mostrarSenha ? 'text' : 'password'" 
            placeholder="No mínimo 6 caracteres" 
            required 
          />
          <span class="toggle-password" @click="mostrarSenha = !mostrarSenha">
            {{ mostrarSenha ? '🙈' : '👁️' }}
          </span>
        </div>
      </div>

      <div class="field">
        <label>Eu sou:</label>
        <select v-model="form.tipo">
          <option value="talento">Talento (Busco Vagas)</option>
          <option value="empresa">Empresa (Quero Contratar)</option>
        </select>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Criar Conta' }}
      </button>

      <p v-if="mensagem" :class="statusClasse">{{ mensagem }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  tipo: 'talento' 
});

const mostrarSenha = ref(false); 
const loading = ref(false);
const mensagem = ref('');
const statusClasse = ref('');

/**
 * Pega a URL da variável de ambiente (Vercel) 
 * O prefixo /api é adicionado na chamada do axios para bater com o index.js
 */
const API_URL = import.meta.env.VITE_API_URL || 'https://conectatalentos-production.up.railway.app';

const handleCadastro = async () => {
  loading.value = true;
  mensagem.value = '';

  try {
    // Chamada corrigida: Adicionado /api/cadastro para coincidir com o backend
    // Enviando o objeto 'form' completo
    const response = await axios.post(`${API_URL}/cadastro`, form);
    
    mensagem.value = "✅ " + response.data.message;
    statusClasse.value = 'success';
    
    // Limpa o formulário após sucesso
    Object.assign(form, { nome: '', email: '', senha: '', tipo: 'talento' });
  } catch (err) {
    // Captura o erro vindo do seu Back-end (ex: e-mail duplicado ou erro de servidor)
    mensagem.value = "❌ " + (err.response?.data?.error || "Erro ao conectar com o servidor.");
    statusClasse.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.cadastro-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #131021; 
  color: white;
  border-radius: 15px; 
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.field { margin-bottom: 15px; display: flex; flex-direction: column; }

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
}

label { font-size: 0.9rem; margin-bottom: 5px; }

input, select { 
  padding: 12px; 
  margin-top: 5px; 
  border-radius: 5px; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

button { 
  width: 100%; 
  padding: 15px; 
  background: #00f0ff; 
  color: #131021; 
  border: none; 
  font-weight: bold;
  border-radius: 5px; 
  cursor: pointer; 
  margin-top: 10px;
}

button:hover {
  background: #00d8e6;
}

button:disabled { 
  background: #555; 
  cursor: not-allowed;
}

.success { color: #42b983; margin-top: 10px; font-weight: bold; }
.error { color: #ff5252; margin-top: 10px; font-weight: bold; }
</style>