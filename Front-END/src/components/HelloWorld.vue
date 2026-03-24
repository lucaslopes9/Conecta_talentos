<script setup>
import { ref } from 'vue'

// Requisito 7: Foco em facilitar a procura de emprego e candidatura [cite: 17]
const mostrarVagas = ref(false)
const vagas = ref([
  { id: 1, cargo: 'Desenvolvedor Full Stack', empresa: 'Tech Connect' },
  { id: 2, cargo: 'SDR / Inside Sales', empresa: 'Agência Digital' },
  { id: 3, cargo: 'Analista de Sistemas', empresa: 'Inovação IA' }
])

const buscarVagas = () => {
  mostrarVagas.value = true
}
</script>

<template>
  <header class="header-main">
    <div class="logo">
      CONECTA<span>TALENT</span>
    </div>
  </header>

  <section id="center" class="tech-container">
    <div class="hero-content">
      <h1>Conectamos você ao seu futuro profissional</h1>
      <p class="description">
        A união entre pessoas e oportunidades através da tecnologia.
      </p>
    </div>

    <div class="actions">
      <button class="btn-primary" @click="buscarVagas">
        Procurar Oportunidades
      </button>
      
      <button class="btn-secondary">
        Ver Inteligência Artificial
      </button>
    </div>

    <div v-if="mostrarVagas" class="vagas-list">
      <div v-for="vaga in vagas" :key="vaga.id" class="job-card">
        <div class="vaga-info">
          <h3>{{ vaga.cargo }}</h3>
          <p>{{ vaga.empresa }}</p>
        </div>
        <button class="btn-primary">Candidatar-se</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ESTRUTURA DO HEADER E LOGOTIPO */
.header-main {
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  background-color: var(--conecta-blue-dark); /* Requisito 4: Fundo escuro [cite: 11] */
}

.logo {
  /* Requisito 3: Tipografia moderna e forte para títulos [cite: 8, 9] */
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--conecta-white); /* Requisito 2: Branco para clareza [cite: 7] */
  text-transform: uppercase;
}

.logo span {
  /* Requisito 2: Azul Neon para Inovação e IA [cite: 5, 6] */
  color: var(--conecta-blue-neon);
}

/* CONTAINER PRINCIPAL (ESTILO TECNOLÓGICO) */
.tech-container {
  /* Requisito 5: Efeitos de luz suave e design moderno  */
  background: radial-gradient(circle at top, rgba(0, 240, 255, 0.05), transparent 70%);
  padding: 2rem;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  /* Requisito 3: Tipografia simples e legível para texto [cite: 9] */
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 3rem;
}

/* LISTAGEM DE VAGAS */
.vagas-list {
  display: grid;
  gap: 16px;
  width: 100%;
  animation: fadeIn 0.5s ease;
}

.job-card {
  /* Requisito 5: Design limpo e moderno  */
  background: rgba(255, 255, 255, 0.03);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.2); /* Requisito 2: Azul Neon sutil [cite: 6] */
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, border-color 0.2s;
}

.job-card:hover {
  border-color: var(--conecta-blue-neon);
  transform: translateY(-2px);
}

.vaga-info {
  text-align: left;
}

.vaga-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.3rem;
  color: var(--conecta-white);
}

.vaga-info p {
  margin: 0;
  color: var(--conecta-blue-neon);
  font-weight: 500;
}

/* ANIMAÇÃO */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    padding: 0 20px;
  }
  
  .job-card {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .vaga-info {
    text-align: center;
  }
}
</style>