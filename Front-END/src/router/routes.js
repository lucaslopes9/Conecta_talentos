import { createRouter, createWebHistory } from 'vue-router'

// 1. Importe os seus componentes
import Login from '../components/LoginView.vue' 
import Cadastro from '../components/Register.vue' 
import CompanyDashboard from '../components/CompanyDashboard.vue'
import TalentDashboard from '../components/TalentDashboard.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Cadastro
  },
  {
    path: '/vagas', 
    name: 'vagas',
    component: HelloWorld
  },
  // --- NOVAS ROTAS ADICIONADAS ABAIXO ---
  {
    path: '/dashboard-empresa',
    name: 'CompanyDashboard',
    component: CompanyDashboard
  },
  {
    path: '/dashboard-talento',
    name: 'TalentDashboard',
    component: TalentDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router