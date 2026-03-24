<script setup>
// Agora você não precisa mais importar o LoginView aqui, 
// o roteador fará isso por você baseado na URL!
</script>

<template>
  <router-view />
</template>

<style>
/* Coloque aqui suas cores neon para que funcionem em todas as páginas */
:root {
  --conecta-blue-neon: #00f0ff;
  --conecta-blue-dark: #131021;
}

body {
  margin: 0;
  background-color: var(--conecta-blue-dark);
  color: white;
  font-family: 'Inter', sans-serif;
}
</style>