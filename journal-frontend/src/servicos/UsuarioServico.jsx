import axios from 'axios';
import { getAuthHeaders } from './LoginEntrarServico';

const API_URL = `${process.env.REACT_APP_ENDERECO_API}/usuario`;

export async function atualizarUsuario(id, nome, email) {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { nome, email },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao atualizar usuário';
  }
}

export async function atualizarSenha(id, novaSenha) {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/senha`,
      { novaSenha },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao atualizar senha';
  }
}

export async function excluirUsuario(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao excluir usuário';
  }
}
