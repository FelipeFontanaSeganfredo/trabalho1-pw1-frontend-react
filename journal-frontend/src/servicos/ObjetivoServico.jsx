import { getAuthHeaders } from './LoginEntrarServico';
import axios from 'axios';

//const API_URL = `${process.env.REACT_APP_ENDERECO_API}/objetivos`;

const API_URL = 'https://trabalho1-pw1-journal.onrender.com/objetivos'

// Buscar todos os objetivos do usuário logado
export async function buscarObjetivos() {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar objetivos';
  }
}

// Buscar objetivo por ID
export async function buscarObjetivoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar objetivo por ID';
  }
}

// Criar novo objetivo
export async function criarObjetivo(descricao) {
  console.log(descricao)
  try {
    const response = await axios.post(
      API_URL,
      { descricao },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao criar novo objetivo';
  }
}

// Atualizar objetivo
export async function atualizarObjetivo(id, descricao, concluido) {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { descricao, concluido },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao atualizar objetivo';
  }
}
  
// Excluir objetivo
export async function excluirObjetivo(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao excluir objetivo';
  }
}
