import React from 'react';
import { useTheme } from '../../context';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-logo">
        <h1> Dashboard Cosméticos</h1>
      </div>
      <div className="header-actions">
        <Button onClick={toggleTheme} variant="secondary">
          {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
        </Button>
      </div>
    </header>
  );
};

export default Header;