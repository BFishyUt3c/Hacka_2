import axios from 'axios';
import { getToken } from '../utils/token';

const API_BASE_URL = 'http://198.211.105.95:8080';

interface Goal {
  id: string;
  month: number;
  year: number;
  targetAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface ErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

const handleApiError = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error desconocido',
      errors: error.response?.data?.errors
    };
  }
  return {
    status: 500,
    message: 'Error inesperado en el servidor'
  };
};

export const getGoals = async (year?: number, month?: number): Promise<ApiResponse<Goal[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/goals`, {
      ...getAuthHeaders(),
      params: { year, month }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getGoalById = async (id: string): Promise<ApiResponse<Goal>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/goals/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createGoal = async (
  year: number,
  month: number,
  targetAmount: number
): Promise<ApiResponse<Goal>> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/goals`,
      { year, month, targetAmount },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateGoal = async (
  id: string,
  updates: Partial<Pick<Goal, 'targetAmount' | 'currentAmount'>>
): Promise<ApiResponse<Goal>> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/goals/${id}`,
      updates,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteGoal = async (id: string): Promise<ApiResponse<{ deleted: boolean }>> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/goals/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Función utilitaria para el dashboard
export const getCurrentMonthGoal = async (): Promise<Goal | null> => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  
  try {
    const response = await getGoals(year, month);
    return response.data[0] || null;
  } catch {
    return null;
  }
};