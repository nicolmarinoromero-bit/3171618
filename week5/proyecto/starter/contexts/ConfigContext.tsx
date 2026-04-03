import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Tipos de configuración
export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type Density = 'compact' | 'normal' | 'spacious';

export interface Notifications {
  email: boolean;
  push: boolean;
  sound: boolean;
}

export interface ConfigState {
  theme: Theme;
  fontSize: FontSize;
  density: Density;
  notifications: Notifications;
}

// Valores por defecto
const defaultConfig: ConfigState = {
  theme: 'system',
  fontSize: 'medium',
  density: 'normal',
  notifications: {
    email: true,
    push: true,
    sound: false,
  },
};

interface ConfigContextValue {
  config: ConfigState;
  updateConfig: (updates: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedConfig, setStoredConfig] = useLocalStorage<ConfigState>('app-config', defaultConfig);
  const [config, setConfig] = useState<ConfigState>(storedConfig);

  // Detectar tema del sistema
  useEffect(() => {
    if (config.theme === 'system') {
      const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
      };
      applySystemTheme(darkModeMedia);
      darkModeMedia.addEventListener('change', applySystemTheme);
      return () => darkModeMedia.removeEventListener('change', applySystemTheme);
    } else {
      document.documentElement.setAttribute('data-theme', config.theme);
    }
  }, [config.theme]);

  // Aplicar tamaño de fuente al body
  useEffect(() => {
    document.body.style.fontSize = 
      config.fontSize === 'small' ? '14px' :
      config.fontSize === 'large' ? '18px' : '16px';
  }, [config.fontSize]);

  // Aplicar densidad (clases CSS)
  useEffect(() => {
    document.body.classList.remove('density-compact', 'density-normal', 'density-spacious');
    document.body.classList.add(`density-${config.density}`);
  }, [config.density]);

  const updateConfig = (updates: Partial<ConfigState>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      setStoredConfig(newConfig);
      return newConfig;
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    setStoredConfig(defaultConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};