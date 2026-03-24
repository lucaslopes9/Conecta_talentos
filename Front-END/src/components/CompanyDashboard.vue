


<template>
  <div class="dashboard-wrapper">
    <header class="header">
      <div>
        <h2>Painel Corporativo</h2>
        <p class="subtitle">Gerencie suas vagas e encontre talentos em Angola.</p>
      </div>
      <button class="btn-primary" @click="abrirModal">+ Publicar Nova Vaga</button>
    </header>

    <main class="content">
      <section class="stats-grid">
        <div class="stat-card">
          <h3>Vagas Ativas</h3>
          <p class="stat-value">{{ vagas.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Total de Candidatos</h3>
          <p class="stat-value">0</p>
        </div>
        <div class="stat-card">
          <h3>Aguardando Triagem</h3>
          <p class="stat-value">0</p>
        </div>
      </section>

      <section class="section-container">
        <h3>Suas Vagas Publicadas</h3>
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Salário</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vaga in vagas" :key="vaga.id">
                <td>{{ vaga.titulo }}</td>
                <td class="capitalize">{{ vaga.tipo }}</td>
                <td>{{ vaga.salario ? formatarMoeda(vaga.salario) : 'A combinar' }}</td>
                <td><span class="status-active">Ativa</span></td>
                <td><button class="btn-text">Ver Candidatos</button></td>
              </tr>
              <tr v-if="vagas.length === 0">
                <td colspan="5" class="empty-state">Nenhuma vaga publicada. Comece agora!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <div v-if="exibindoModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-card">
        <h3>Nova Oportunidade</h3>
        <form @submit.prevent="cadastrarVaga">
          <div class="form-group">
            <label>Título da Vaga</label>
            <input v-model="formVaga.titulo" placeholder="Ex: Desenvolvedor Frontend" required>
          </div>
          
          <div class="form-group">
            <label>Descrição</label>
            <textarea v-model="formVaga.descricao" rows="3" placeholder="O que o talento fará?" required></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="formVaga.tipo">
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>
            <div class="form-group">
              <label>Salário (Opcional)</label>
              <input v-model="formVaga.salario" type="number" step="0.01" placeholder="Ex: 250000">
            </div>
          </div>

          <div class="form-group">
            <label>Habilidades (separadas por vírgula)</label>
            <input v-model="formVaga.habilidades_requeridas" placeholder="Ex: React, Node.js, SQL">
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="fecharModal">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="enviando">
              {{ enviando ? 'Publicando...' : 'Publicar Vaga' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Estados
const vagas = ref([])
const exibindoModal = ref(false)
const enviando = ref(false)

const formVaga = ref({
  titulo: '',
  descricao: '',
  tipo: 'presencial',
  salario: '',
  habilidades_requeridas: ''
})

// Formatação para Kwanza (AOA) - Pode mudar para 'pt-BR' e 'BRL' se preferir
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA'
  }).format(valor)
}

// Busca as vagas filtradas pela empresa logada
const buscarVagas = async () => {
  try {
    const userStr = localStorage.getItem('usuario')
    if (!userStr) {
      console.error("Usuário não logado")
      return
    }
    
    const user = JSON.parse(userStr)
    console.log("Iniciando busca para empresa ID:", user.id)

    // Chamada para a rota específica de empresa que criamos no Node
    const response = await axios.get(`http://localhost:3000/api/vagas/empresa/${user.id}`)
    vagas.value = response.data
  } catch (error) {
    console.error("Erro ao carregar vagas:", error.response?.data || error.message)
  }
}

const abrirModal = () => {
  exibindoModal.value = true
}

const fecharModal = () => {
  exibindoModal.value = false
  // Reset do formulário para o estado inicial
  formVaga.value = { 
    titulo: '', 
    descricao: '', 
    tipo: 'presencial', 
    salario: '', 
    habilidades_requeridas: '' 
  }
}

const cadastrarVaga = async () => {
  enviando.value = true
  try {
    const userStr = localStorage.getItem('usuario')
    const user = JSON.parse(userStr)
    
    // Envia os dados e o ID da empresa logada
    await axios.post('http://localhost:3000/api/vagas', {
      ...formVaga.value,
      empresa_id: user.id
    })

    alert("🚀 Vaga publicada com sucesso!")
    fecharModal()
    await buscarVagas() // Recarrega a lista automaticamente
  } catch (error) {
    console.error("Erro na publicação:", error)
    alert("Erro ao publicar vaga. Verifique a conexão com o servidor.")
  } finally {
    enviando.value = false
  }
}

onMounted(() => {
  buscarVagas()
})
</script>

<style scoped>
/* Mantive seus estilos originais e adicionei apenas pequenos ajustes de usabilidade */
.dashboard-wrapper {
  background-color: #0b0b0b;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.subtitle {
  color: #888;
  font-size: 0.9rem;
}

.btn-primary {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #3e38c7;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #131021;
  padding: 2rem;
  border-radius: 12px;
  border-top: 4px solid #4f46e5;
}

.stat-value {
  font-size: 2.8rem;
  font-weight: 800;
  margin-top: 10px;
}

.table-container {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th, .custom-table td {
  padding: 1rem;
  border-bottom: 1px solid #2a2a2a;
}

.custom-table th {
  background: #252525;
  color: #aaa;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.capitalize {
  text-transform: capitalize;
}

.status-active {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.btn-text {
  background: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-card {
  background: #131021;
  padding: 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #4f46e5;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

label {
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: #aaa;
}

input, textarea, select {
  background: #0b0b0b;
  border: 1px solid #2a2a2a;
  color: white;
  padding: 10px;
  border-radius: 6px;
  outline: none;
}

input:focus {
  border-color: #4f46e5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.btn-cancel {
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
}
</style>