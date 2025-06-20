import type { CategorySummary } from '../types/main';
interface SummaryCardProps {
  category: CategorySummary;
  onClick: () => void;
}

export const SummaryCard = ({ category, onClick }: SummaryCardProps) => {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '16px',
        margin: '8px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h3 style={{ marginTop: 0 }}>{category.name}</h3>
      <p>Total: S/ {category.total.toFixed(2)}</p>
      <div style={{ 
        height: '10px', 
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        margin: '10px 0'
      }}>
        <div 
          style={{ 
            width: `${category.percentage}%`, 
            height: '100%',
            backgroundColor: '#4caf50',
            borderRadius: '5px'
          }} 
        />
      </div>
      <p>{category.percentage}% del total</p>
    </div>
  );
};