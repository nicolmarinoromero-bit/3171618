interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = "No se encontraron productos" }) => {
  return (
    <div className="empty-state">
      <p>🛍️ {message}</p>
      <p className="hint">Intenta con otros filtros o términos de búsqueda</p>
    </div>
  );
};

export default EmptyState;