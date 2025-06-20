import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getExpensesSummary, getExpensesDetail } from '../api/expenses';
import { SummaryCard } from '../components/SummaryCard';  
import { ExpenseDetailModal } from '../components/ExpenseDetailModal'; 

interface CategorySummary {
  id: string;
  name: string;
  total: number;
  percentage: number;
}

interface ExpenseDetail {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetail[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [currentDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const data = await getExpensesSummary(currentDate.year, currentDate.month);
        setSummary(data);
      } catch (error) {
        console.error('Error loading summary:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadSummary();
  }, [user, currentDate.year, currentDate.month]);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedCategory) return;

      try {
        setDetailLoading(true);
        const data = await getExpensesDetail(
          currentDate.year,
          currentDate.month,
          selectedCategory
        );
        setExpenseDetails(data);
      } catch (error) {
        console.error('Error loading details:', error);
      } finally {
        setDetailLoading(false);
      }
    };

    loadDetails();
  }, [selectedCategory, currentDate.year, currentDate.month]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="dashboard">
      <h1>Resumen de Gastos - {user?.email}</h1>
      
      {loading ? (
        <div>Cargando resumen...</div>
      ) : (
        <div className="summary-grid">
          {summary.map((category) => (
            <SummaryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      )}

      <ExpenseDetailModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        details={expenseDetails}
        loading={detailLoading}
      />
    </div>
  );
};