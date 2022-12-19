import api from './api';
import useToken from '../hooks/useToken';

export async function getStatusPayment() {
  const token = await useToken();
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

