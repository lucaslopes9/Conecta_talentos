<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Estados reativos
const email = ref('')
const senha = ref('')
const tipoUsuario = ref('talento') 
const mostrarSenha = ref(false)    

const router = useRouter()
const carregando = ref(false)
const mensagemErro = ref('')

/**
 * Pega a URL do Backend da variável de ambiente.
 * Se estiver rodando local, usa o localhost.
 */
const API_URL = import.meta.env.VITE_API_URL || 'https://conectatalentos-production.up.railway.app/api'

/**
 * Função principal de autenticação
 */
const realizarLogin = async () => {
  carregando.value = true
  mensagemErro.value = ''

  console.log("🔗 URL sendo acessada:", `${API_URL}/login`);

  try {
    // Chamada dinâmica usando a constante API_URL
    const response = await axios.post(`${API_URL}/login`, {
      email: email.value,
      senha: senha.value
    })

    // Salva os dados do usuário para persistência na sessão
    localStorage.setItem('usuario', JSON.stringify(response.data.user))

    const user = response.data.user

    // REDIRECIONAMENTO DINÂMICO
    if (user.tipo === 'empresa') {
      router.push('/dashboard-empresa')
    } else if (user.tipo === 'talento') {
      router.push('/dashboard-talento')
    } else {
      router.push('/vagas')
    }

  } catch (err) {
    // Captura erros específicos do backend ou erro de rede
    mensagemErro.value = err.response?.data?.error || "Erro ao conectar com o servidor."
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Entrar no <span>CONECTA</span></h2>
      
      <div class="tabs">
        <button 
          type="button"
          :class="{ active: tipoUsuario === 'talento' }" 
          @click="tipoUsuario = 'talento'"
        >Talento</button>
        <button 
          type="button"
          :class="{ active: tipoUsuario === 'empresa' }" 
          @click="tipoUsuario = 'empresa'"
        >Empresa</button>
      </div>

      <form @submit.prevent="realizarLogin">
        <div class="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="seu@email.com" 
            required
          >
        </div>

        <div class="input-group">
          <label>Senha</label>
          <div class="password-wrapper">
            <input 
              :type="mostrarSenha ? 'text' : 'password'" 
              v-model="senha" 
              placeholder="••••••••" 
              required
            >
            <span class="toggle-password" @click="mostrarSenha = !mostrarSenha">
              {{ mostrarSenha ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <button type="submit" class="btn-login" :disabled="carregando">
          {{ carregando ? 'Autenticando...' : 'Acessar Plataforma' }}
        </button>

        <p v-if="mensagemErro" class="error-msg">{{ mensagemErro }}</p>
      </form>
      
      <p class="footer-text">
        Não tem conta? 
        <router-link to="/Register">Cadastre-se aqui</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Variáveis de cores baseadas no seu padrão Dark/Neon */
:root {
  --conecta-blue-neon: #00f0ff;
  --conecta-blue-dark: #0b0b0b;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 15px;
  border: 1px solid rgba(0, 240, 255, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  text-align: center;
}

h2 span {
  color: #00f0ff; /* Cor Neon */
}

.tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.tabs button {
  flex: 1;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.tabs button.active {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
  opacity: 0.8;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #ccc;
}

input {
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  outline: none;
}

input:focus {
  border-color: #00f0ff;
}

.btn-login {
  width: 100%;
  padding: 15px;
  background: #00f0ff;
  color: #0b0b0b;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}

.btn-login:hover {
  background: #00d8e6;
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer-text {
  margin-top: 20px;
  font-size: 0.85rem;
  opacity: 0.8;
}

.footer-text a {
  color: #00f0ff;
  text-decoration: none;
}

.error-msg {
  color: #ff5252;
  margin-top: 15px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>