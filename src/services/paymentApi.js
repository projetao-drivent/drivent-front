import api from './api';

export async function pay(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};
export async function getTicket(token) {
  const response = await api.get('tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export async function getPayment(ticketId, token) {
  const response = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export async function getEnrollments(token) {
  const response = await api.get('enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
