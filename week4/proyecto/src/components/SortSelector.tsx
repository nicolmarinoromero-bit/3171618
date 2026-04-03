import { SortField, SortOrder } from '../types';

interface SortSelectorProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortField, sortOrder, onSortChange }) => {
  return (
    <div className="sort-selector">
      <label>Ordenar por:</label>
      <select
        value={sortField}
        onChange={(e) => onSortChange(e.target.value as SortField, sortOrder)}
      >
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
        <option value="stock">Stock</option>
      </select>
      <button
        onClick={() => onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc')}
        className="order-btn"
      >
        {sortOrder === 'asc' ? '⬆ Ascendente' : '⬇ Descendente'}
      </button>
    </div>
  );
};

export default SortSelector;