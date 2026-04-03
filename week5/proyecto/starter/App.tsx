import React from 'react';
import { ConfigProvider } from './contexts/ConfigContext';
import Layout from './components/Layout/Layout';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import { Card } from './components/Card/Card';

// Datos mock de productos de cosméticos
const products = [
  { id: 1, name: 'Crema Hidratante Facial', brand: 'CeraVe', price: 68900 },
  { id: 2, name: 'Champú Sólido de Romero', brand: 'Lush', price: 42500 },
  { id: 3, name: 'Labial Líquido Mate', brand: 'Maybelline', price: 32900 },
  { id: 4, name: 'Aceite Corporal de Almendras', brand: 'The Body Shop', price: 78900 },
];

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Layout>
        <div className="app-container">
          <header className="app-header">
            <h1> Tienda de Cosméticos</h1>
            <p>Personaliza tu experiencia de compra</p>
          </header>

          <div className="main-grid">
            <aside className="sidebar">
              <SettingsPanel />
            </aside>
            <main className="content">
              <h2>Productos destacados</h2>
              <div className="product-grid">
                {products.map(product => (
                  <Card key={product.id}>
                    <Card.Body>
                      <h3>{product.name}</h3>
                      <p>Marca: {product.brand}</p>
                      <p>Precio: ${product.price.toLocaleString('es-CO')} COP</p>
                    </Card.Body>
                    <Card.Footer>
                      <button className="btn-buy">Comprar</button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default App;