import React from 'react';
import { useFetch } from '../../hooks';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { Product, mockProducts } from '../../types';

const fetchOnSale = async (signal: AbortSignal): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockProducts.filter(p => p.onSale);
};

const OnSaleWidget: React.FC = () => {
  const { data, loading, error } = useFetch(fetchOnSale, []);

  if (loading) return <Card title="🔥 Productos en oferta"><Spinner /></Card>;
  if (error) return <Card title="🔥 Productos en oferta">Error cargando datos</Card>;

  return (
    <Card title="🔥 Productos en oferta">
      {data && data.length === 0 ? (
        <p>No hay productos en oferta actualmente.</p>
      ) : (
        <ul>
          {data?.map(p => (
            <li key={p.id}>
              <strong>{p.name}</strong> - {p.brand} - ${p.price.toLocaleString('es-CO')} COP
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default OnSaleWidget;