import { getAuthHeaders } from './LoginEntrarServico';
import axios from 'axios';

//const API_URL = `${process.env.REACT_APP_ENDERECO_API}/emocao`;

const API_URL = 'https://trabalho1-pw1-journal.onrender.com/emocao'
export async function buscarEmocoes() {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar emoções';
  }
}

export async function buscarEmocaoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar emoção';
  }
}

export async function buscarMapaDeEmocoes() {
  try {
    const lista = await buscarEmocoes();
    const mapa = {};
    lista.forEach((emocao) => {
      mapa[emocao.id] = emocao.descricao;
    });
    return mapa;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao montar mapa de emoções';
  }
}
