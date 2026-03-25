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
 * ou usa o fallback do Railway com o prefixo /api
 */
const API_URL = import.meta.env.VITE_API_URL || 'https://conectatalentos-production.up.railway.app/api';

const handleCadastro = async () => {
  loading.value = true;
  mensagem.value = '';

  try {
    // Agora usa a API_URL dinâmica para bater em /api/cadastro
    const response = await axios.post(`${API_URL}/cadastro`, form);
    
    mensagem.value = "✅ " + response.data.message;
    statusClasse.value = 'success';
    
    // Limpa o formulário após sucesso
    Object.assign(form, { nome: '', email: '', senha: '', tipo: 'talento' });
  } catch (err) {
    // Captura o erro vindo do seu Back-end (ex: e-mail duplicado)
    mensagem.value = "❌ " + (err.response?.data?.error || "Erro ao cadastrar");
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

/* Wrapper para posicionar o olhinho dentro do input */
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 45px; /* Espaço para o ícone não sobrepor o texto */
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-20%); /* Ajuste fino para centralizar o emoji */
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

button:disabled { background: #555; }
.success { color: #42b983; margin-top: 10px; font-weight: bold; }
.error { color: #ff5252; margin-top: 10px; font-weight: bold; }
</style>