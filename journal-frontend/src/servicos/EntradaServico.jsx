import { getAuthHeaders } from './LoginEntrarServico';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_ENDERECO_API}/entradas`;

// Buscar todas as entradas do usuário
export async function buscarEntradas() {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao buscar entradas';
    }
  }
  
  // Buscar entrada específica por ID
  export async function buscarEntradaPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao buscar entrada por ID';
    }
  }
  
  // Criar nova entrada
  export async function criarEntrada({ titulo, texto, emocoes }) {
    try {
      const response = await axios.post(
        API_URL,
        { titulo, texto, emocoes },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao criar nova entrada';
    }
  }
  
  // Atualizar entrada existente
  export async function atualizarEntrada(id, { titulo, texto, emocoes }) {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { titulo, texto, emocoes },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao atualizar entrada';
    }
  }
  
  // Excluir entrada
  export async function excluirEntrada(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao excluir entrada';
    }
  }
