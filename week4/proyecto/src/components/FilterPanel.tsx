import { ProductCategory } from '../types';

interface FilterPanelProps {
  categories: ProductCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  showOnSaleOnly: boolean;
  onShowOnSaleOnlyChange: (value: boolean) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showOnSaleOnly,
  onShowOnSaleOnlyChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Categoría:</label>
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">Todas</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Precio mínimo (COP):</label>
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })}
          min={0}
          step={1000}
        />
      </div>
      <div className="filter-group">
        <label>Precio máximo (COP):</label>
        <input
          type="number"
          value={priceRange.max === Infinity ? '' : priceRange.max}
          onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value ? Number(e.target.value) : Infinity })}
          min={0}
          step={1000}
          placeholder="Sin límite"
        />
      </div>

      <div className="filter-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={showOnSaleOnly}
            onChange={(e) => onShowOnSaleOnlyChange(e.target.checked)}
          />
          Solo en oferta
        </label>
      </div>

      <button onClick={onClearFilters} className="clear-filters-btn">
        Limpiar filtros
      </button>
    </div>
  );
};

export default FilterPanel;