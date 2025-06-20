import { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal } from '../api/goals';
import type { Goal } from '../types/main';
interface SavingsGoalsProps {
  onGoalUpdated?: (goal: Goal) => void;
}

export const SavingsGoals = ({ onGoalUpdated }: SavingsGoalsProps) => {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [targetAmount, setTargetAmount] = useState('');
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getGoals(currentYear, currentMonth);
        
        if (response.data && response.data.length > 0) {
          setGoal(response.data[0]);
          setTargetAmount(response.data[0].targetAmount.toString());
        }
      } catch (err) {
        setError('Error al cargar las metas');
        console.error('Error fetching goals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [currentYear, currentMonth]);

  const handleSaveGoal = async () => {
    if (!targetAmount) return;
    
    try {
      setLoading(true);
      setError(null);
      const amount = parseFloat(targetAmount);
      
      let updatedGoal: Goal;
      
      if (goal) {
        const response = await updateGoal(goal.id, { targetAmount: amount });
        updatedGoal = response.data;
      } else {
        const response = await createGoal(currentYear, currentMonth, amount);
        updatedGoal = response.data;
      }
      
      setGoal(updatedGoal);
      if (onGoalUpdated) onGoalUpdated(updatedGoal);
    } catch (err) {
      setError('Error al guardar la meta');
      console.error('Error saving goal:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !goal) {
    return <div>Cargando metas...</div>;
  }

  return (
    <div className="savings-goals">
      <h2>Meta de Ahorro Mensual</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="goal-input-container">
        <label htmlFor="targetAmount">Meta (S/):</label>
        <input
          id="targetAmount"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          disabled={loading}
          min="0"
          step="0.01"
        />
        
        <button 
          onClick={handleSaveGoal} 
          disabled={loading || !targetAmount}
        >
          {loading ? 'Guardando...' : 'Guardar Meta'}
        </button>
      </div>
      
      {goal && (
        <div className="goal-progress">
          <h3>Progreso:</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ 
                width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` 
              }}
            ></div>
          </div>
          <p>
            S/ {goal.currentAmount.toFixed(2)} de S/ {goal.targetAmount.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};