export interface ExpenseDetail {
  id: string;
  amount: number;
  date: string;
  description: string;
}

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: ExpenseDetail[];
  loading: boolean;
}

export const ExpenseDetailModal = ({
  isOpen,
  onClose,
  details,
  loading,
}: ExpenseDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80%',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: 'none',
          background: 'transparent',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>
          ×
        </button>

        <h2 style={{ marginTop: 0 }}>Detalle de gastos</h2>

        {loading ? (
          <p>Cargando detalles...</p>
        ) : details.length === 0 ? (
          <p>No hay gastos en esta categoría.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {details.map((detail) => (
              <li key={detail.id} style={{
                padding: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <p style={{ margin: '0 0 4px 0' }}>
                  <strong>S/ {detail.amount.toFixed(2)}</strong> - {detail.description}
                </p>
                <small style={{ color: '#888' }}>
                  {new Date(detail.date).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
