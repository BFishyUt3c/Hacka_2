import axios from 'axios';
import { getToken } from '../utils/token';

const API_BASE_URL = 'http://198.211.105.95:8080';

const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const getExpensesSummary = async (year: number, month: number) => {
  const response = await axios.get(`${API_BASE_URL}/expenses_summary`, {
    ...getAuthHeader(),
    params: { year, month }
  });
  return response.data;
};

export const getExpensesDetail = async (year: number, month: number, categoryId: string) => {
  const response = await axios.get(`${API_BASE_URL}/expenses/detail`, {
    ...getAuthHeader(),
    params: { year, month, categoryId }
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/expenses_category`, getAuthHeader());
  return response.data;
};