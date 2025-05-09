import axios from 'axios';

const API_URL = `${process.env.REACT_APP_ENDERECO_API}/usuario`;

// Configuração básica do Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Função para registrar um usuário
export async function registerUsuario(nome, email, senha) {
  try {
    const response = await api.post('/register', {
      nome,
      email,
      senha
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao registrar usuário';
  }
}

// Função para fazer login
export async function loginUsuario(email, senha) {
  try {
    const response = await api.post('/login', {
      email,
      senha
    });

    console.log('Resposta completa:', response); 
    
    // Armazena o token no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao fazer login';
  }
}

// Função para fazer logout
export function logoutUsuario() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

// Função para obter o usuário logado
export function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

// Função para obter headers de autenticação
export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});