import { useState, useEffect } from 'react';
import { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const newData = await fetchRealTimeData(controller.signal);
        if (isMounted) {
          setData(newData);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (isMounted) {
          setError('Error al obtener datos en tiempo real');
          setLoading(false);
        }
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  if (loading) return <div className="loading">Cargando datos en tiempo real...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="realtime-indicator">
      <h3>🕒 Ventas en Tiempo Real</h3>
      <div className="realtime-value">
        <span className="sales-number">{data?.dailySales || 0}</span>
        <span>ventas hoy</span>
      </div>
      <div className="last-updated">Última actualización: {data?.lastUpdated}</div>
    </div>
  );
};

export default RealTimeIndicator;