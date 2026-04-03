# 💄 Sistema de Configuración UI – Tienda de Cosméticos

## Dominio
Aplicación de configuración de interfaz para una tienda de cosméticos. Permite personalizar tema visual, tamaño de texto, densidad de contenido y notificaciones. Los cambios se guardan en localStorage y afectan globalmente.

## Tecnologías
- React + TypeScript
- Context API
- Compound Components (Card y Form)
- CSS Variables (temas claro/oscuro/sistema)
- Persistencia con localStorage

## Instalación y ejecución
```bash
npm install
npm run dev

## Estructura
starter/: contiene todo el código fuente

contexts/: ConfigContext global

components/: Card, Form, SettingsPanel, Layout

hooks/: useLocalStorage

App.tsx, main.tsx, styles.css, vite-env.d.ts