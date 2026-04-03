import React from 'react';
import { ThemeProvider } from './context';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LowStockWidget from './components/widgets/LowStockWidget';
import DailySalesWidget from './components/widgets/DailySalesWidget';
import OnSaleWidget from './components/widgets/OnSaleWidget';
import './styles.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="dashboard">
            <div className="widgets-grid">
              <LowStockWidget />
              <DailySalesWidget />
              <OnSaleWidget />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;