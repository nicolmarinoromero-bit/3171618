import React from 'react';
import { useFetch } from '../../hooks';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { Product, mockProducts } from '../../types';

const fetchLowStock = async (signal: AbortSignal): Promise<Product[]> => {
  // Simular API
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProducts.filter(p => p.stock < 10);
};

const LowStockWidget: React.FC = () => {
  const { data, loading, error } = useFetch(fetchLowStock, []);

  if (loading) return <Card title="⚠️ Productos bajo stock"><Spinner /></Card>;
  if (error) return <Card title="⚠️ Productos bajo stock">Error cargando datos</Card>;

  return (
    <Card title="⚠️ Productos bajo stock">
      {data && data.length === 0 ? (
        <p>No hay productos con stock bajo.</p>
      ) : (
        <ul>
          {data?.map(p => (
            <li key={p.id}>
              <strong>{p.name}</strong> - Stock: {p.stock}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default LowStockWidget;