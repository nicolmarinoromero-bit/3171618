import React from 'react';
import { useConfig } from '../../contexts/ConfigContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useConfig();
  return <div className={`app-layout density-${config.density}`}>{children}</div>;
};

export default Layout;