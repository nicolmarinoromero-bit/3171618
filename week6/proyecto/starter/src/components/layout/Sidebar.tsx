import React from 'react';
import { useToggle } from '../../hooks';
import Button from '../ui/Button';

const Sidebar: React.FC = () => {
  const [collapsed, toggleCollapsed] = useToggle(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <Button onClick={toggleCollapsed} variant="secondary">
        {collapsed ? '➡️' : '⬅️'}
      </Button>
      <nav className="sidebar-nav">
        <ul>
          <li>📊 Dashboard</li>
          <li>📦 Productos</li>
          <li>📈 Ventas</li>
          <li>⚙️ Configuración</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;