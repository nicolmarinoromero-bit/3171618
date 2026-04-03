import React, { useState, useEffect } from 'react';
import { useFetch, useToggle } from '../../hooks';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import { DailySale, mockDailySales } from '../../types';

const fetchSales = async (signal: AbortSignal): Promise<DailySale[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [...mockDailySales];
};

const DailySalesWidget: React.FC = () => {
  const { data, loading, error, refetch } = useFetch(fetchSales, []);
  const [autoRefresh, toggleAutoRefresh] = useToggle(false);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => refetch(), 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  const totalSales = data?.reduce((sum, s) => sum + s.total, 0) || 0;

  return (
    <Card title="💰 Ventas del día">
      {loading && <Spinner />}
      {error && <p>Error: {error}</p>}
      {data && (
        <>
          <p className="sales-total">Total: ${totalSales.toLocaleString('es-CO')} COP</p>
          <ul>
            {data.map(sale => (
              <li key={sale.id}>
                Producto ID: {sale.productId} - Cant: {sale.quantity} - ${sale.total.toLocaleString('es-CO')}
              </li>
            ))}
          </ul>
          <div className="widget-actions">
            <Button onClick={refetch} variant="secondary">🔄 Actualizar</Button>
            <Button onClick={toggleAutoRefresh} variant={autoRefresh ? 'danger' : 'primary'}>
              {autoRefresh ? '⏹️ Detener auto-refresh' : '▶️ Auto-refresh cada 10s'}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default DailySalesWidget;