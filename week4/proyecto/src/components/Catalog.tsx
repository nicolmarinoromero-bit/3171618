import { useState, useMemo, useEffect } from 'react';
import { SortField, SortOrder, ProductCategory } from '../types';
import { mockProducts } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SortSelector from './SortSelector';
import LoadingSpinner from './LoadingSpinner';

const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Simular carga inicial (sin error)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Función para simular error (cumple requisito de manejo de error)
  const simulateError = () => {
    setError('Error de conexión simulado. No se pudieron cargar los productos.');
  };

  const clearError = () => {
    setError(null);
  };

  // Eliminar producto (actualiza el estado local)
  const handleDeleteProduct = (id: number) => {
    const productName = products.find(p => p.id === id)?.name;
    if (window.confirm(`¿Eliminar "${productName}" del catálogo?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Obtener categorías únicas de los productos actuales (no de mock original, para que se actualice si se eliminan)
  const categories: ProductCategory[] = useMemo(() => {
    const cats = products.map(p => p.category);
    return Array.from(new Set(cats));
  }, [products]);

  // Aplicar filtros y búsqueda
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.brand.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    if (showOnSaleOnly) {
      result = result.filter(p => p.onSale === true);
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, priceRange, showOnSaleOnly]);

  // Ordenar
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      let compare = 0;
      if (sortField === 'name') compare = a.name.localeCompare(b.name);
      else if (sortField === 'price') compare = a.price - b.price;
      else if (sortField === 'stock') compare = a.stock - b.stock;
      return sortOrder === 'asc' ? compare : -compare;
    });
    return sorted;
  }, [filteredProducts, sortField, sortOrder]);

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: Infinity });
    setShowOnSaleOnly(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="error-container">
      <div className="error-message">{error}</div>
      <button onClick={clearError} className="btn-retry">Reintentar</button>
    </div>
  );

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1> Catálogo de Cosméticos</h1>
        <p>Encuentra los mejores productos de belleza</p>
        <div className="error-simulator">
          <button onClick={simulateError} className="btn-simulate-error">
            Simular error (prueba manejo de errores)
          </button>
        </div>
      </header>

      <div className="controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
        <SortSelector
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          showOnSaleOnly={showOnSaleOnly}
          onShowOnSaleOnlyChange={setShowOnSaleOnly}
          onClearFilters={clearAllFilters}
        />
      </div>

      <div className="results-info">
        <p>Mostrando {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''}</p>
      </div>

      <ItemList products={sortedProducts} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default Catalog;