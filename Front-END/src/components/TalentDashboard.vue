<template>
  <div class="dashboard-wrapper">
    <header class="header">
      <h2>Painel do Talento</h2>
      <span class="badge">Perfil Premium</span>
    </header>

    <main class="content">
      <section class="stats-grid">
        <div class="stat-card">
          <h3>Candidaturas</h3>
          <p class="stat-value">12</p>
        </div>
        <div class="stat-card">
          <h3>Vagas Salvas</h3>
          <p class="stat-value">5</p>
        </div>
        <div class="stat-card highlight">
          <h3>Visualizações</h3>
          <p class="stat-value">48</p>
        </div>
      </section>

      <section class="section-container">
        <h3>Vagas Recomendadas para Você</h3>
        <div class="job-list">
          <div v-for="i in 3" :key="i" class="job-card">
            <div class="job-info">
              <h4>Desenvolvedor Full Stack</h4>
              <p>Empresa XPTO • Luanda (Remoto)</p>
            </div>
            <button class="btn-apply">Candidatar-se</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Aqui você integrará a chamada para GET /api/vagas futuramente
</script>

<style scoped>
.dashboard-wrapper {
  background-color: #0b0b0b;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 2rem;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.badge {
  background: #131021;
  border: 1px solid #3f3f8c;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #131021;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #1e1e1e;
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4f46e5;
}

.section-container h3 {
  margin-bottom: 1.5rem;
  border-left: 4px solid #4f46e5;
  padding-left: 10px;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card {
  background: #1a1a1a;
  padding: 1.2rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #2a2a2a;
}

.btn-apply {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-apply:hover {
  background: #3f38b1;
}
</style>