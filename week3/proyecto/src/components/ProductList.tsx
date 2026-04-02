import { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../utils/api';

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(controller.signal);
        setAllProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Error al cargar los productos. Intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
    return () => controller.abort();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredProducts(allProducts);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredProducts(allProducts);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h2>📦 Productos Disponibles</h2>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={handleSearch}>🔍 Buscar</button>
        <button className="btn btn-secondary" onClick={handleClear}>🗑️ Limpiar</button>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron productos</p>
          <p className="empty-state__hint">Prueba con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Marca: {product.brand}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              {product.onSale && <span className="badge">🔥 Oferta</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;