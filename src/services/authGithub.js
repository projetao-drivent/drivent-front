import api from './api';

export async function signInWithGitHub(email, password, token) {
  const response = await api.post('/auth/sign-in/github', { email, password, token });
  console.log(response.data);
  return response.data;
}
