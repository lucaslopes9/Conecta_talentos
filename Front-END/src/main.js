import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes.js' // Importa o arquivo que você acabou de criar

const app = createApp(App)

app.use(router) // Diz ao Vue para usar o sistema de rotas
app.mount('#app')