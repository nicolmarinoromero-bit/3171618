import { useState, useEffect } from 'react';
import { fetchStats } from '../utils/api';

const StatsCard: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [productsOnSale, setProductsOnSale] = useState<number>(0);
  const [totalInventoryValue, setTotalInventoryValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTotal = async () => {
      try {
        const data = await fetchStats(controller.signal);
        setTotalProducts(data.totalProducts);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Error al cargar total de productos');
      }
    };
    fetchTotal();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchOnSale = async () => {
      try {
        const data = await fetchStats(controller.signal);
        setProductsOnSale(data.productsOnSale);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Error al cargar productos en oferta');
      }
    };
    fetchOnSale();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchValue = async () => {
      try {
        const data = await fetchStats(controller.signal);
        setTotalInventoryValue(data.totalInventoryValue);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Error al cargar valor del inventario');
      } finally {
        setLoading(false);
      }
    };
    fetchValue();
    return () => controller.abort();
  }, []);

  if (loading && totalProducts === 0) return <div className="loading">Cargando estadísticas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="stats-card">
      <h2>📊 Estadísticas</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{totalProducts}</span>
          <span className="stat-label">Total Productos</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{productsOnSale}</span>
          <span className="stat-label">En Oferta</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">${totalInventoryValue.toFixed(2)}</span>
          <span className="stat-label">Valor Inventario</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;