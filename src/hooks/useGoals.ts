import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Goal } from '../types/main';
import { getToken } from '../utils/token';

const API_URL = 'http://198.211.105.95:8080/goals';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setGoals(response.data);
    } catch (err) {
      setError('Error al cargar metas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(API_URL, goal, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setGoals((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('Error al agregar meta', err);
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? response.data : goal))
      );
    } catch (err) {
      console.error('Error al actualizar meta', err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    loading,
    error,
    fetchGoals,
    addGoal,
    updateGoal,
  };
};
