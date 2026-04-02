import ProductList from './ProductList';
import StatsCard from './StatsCard';
import RealTimeIndicator from './RealTimeIndicator';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💄 Dashboard de Tienda de Cosméticos</h1>
        <p>Bienvenida, administradora de belleza</p>
      </header>
      <div className="dashboard-grid">
        <div className="stats-section">
          <StatsCard />
        </div>
        <div className="realtime-section">
          <RealTimeIndicator />
        </div>
        <div className="products-section">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;