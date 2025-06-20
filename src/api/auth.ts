import axios from 'axios';
import type { ApiResponse } from '../types/main';

const AUTH_BASE = 'http://198.211.105.95:8080/authentication';

export const register = async (email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${AUTH_BASE}/register`, {
      email,
      passwd: password,
    });
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('El correo ya está registrado.');
    }
    throw new Error('Error al registrarse. Intenta nuevamente.');
  }
};

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<{ token: string; email: string }>> => {
  try {
    const response = await axios.post(`${AUTH_BASE}/login`, {
      email,
      passwd: password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error('Credenciales incorrectas o error en el servidor.');
  }
};
