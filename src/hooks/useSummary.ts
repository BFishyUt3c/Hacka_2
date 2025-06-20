import { useEffect, useState } from 'react';
import { getExpensesSummary } from '../api/expenses';
import type { CategorySummary } from '../types/main';

export const useSummary = (year: number, month: number) => {
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getExpensesSummary(year, month);
        setSummary(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [year, month]);

  return { summary, loading };
};
