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

  // --- LOG DE DEPURAÇÃO ---
  console.log("🚀 Tentando conectar na API em:", `${API_URL}/login`);

  try {
    // Chamada dinâmica usando a constante API_URL
    const response = await axios.post(`${API_URL}/login`, {
      email: email.value,
      senha: senha.value
    })

    console.log("✅ Resposta do servidor:", response.data);

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
    console.error("❌ Erro na requisição:", err);
    mensagemErro.value = err.response?.data?.error || "Erro ao conectar com o servidor."
  } finally {
    carregando.value = false
  }
}
</script>