import axios from 'axios';

const API_URL = 'https://api.dev.plataforma2.altoqi.com.br';

export async function createTestUser(email: string, password: string, fullname: string) {
  const response = await axios.post(`${API_URL}/profiles/create-user-test`, {
    email,
    password,
    fullname,
  });
  return response.data;
}

export async function deleteTestUser(email: string) {
  // Endpoint real não informado, simula exclusão para não quebrar o fluxo
  try {
    await axios.delete(`${API_URL}/profiles/delete-user-test`, { data: { email } });
  } catch (e) {
    console.warn('Endpoint de exclusão não implementado, simulação.');
  }
}

export async function deleteTestUserById(id: string) {
  try {
    await axios.delete(`${API_URL}/profiles/delete-user-test/${id}`);
  } catch (e) {
    console.warn('Erro ao excluir usuário de teste:', e);
  }
} 