# 💄 Dashboard en Tiempo Real – Tienda de Cosméticos

## Dominio: Tienda de Cosméticos

El dashboard permite a una administradora de productos de belleza monitorear:
- **Lista de productos** (con scroll horizontal, búsqueda por nombre/marca)
- **Estadísticas clave**: total de productos, en oferta, valor del inventario
- **Ventas en tiempo real** (simuladas, aumentan cada 5 segundos)

## Decisiones técnicas

- **Fetch inicial**: `useEffect` con `AbortController` para cancelar peticiones al desmontar.
- **Polling**: `setInterval` cada 5 segundos, con cleanup para evitar memory leaks.
- **Múltiples estadísticas**: tres `useEffect` independientes (cada uno obtiene una métrica diferente).
- **Búsqueda**: con botón "Buscar" y "Limpiar", filtra localmente (sin refetch).
- **Lista horizontal**: `display: flex`, `overflow-x: auto`, tarjetas de 280px.
- **API simulada**: `delay()` y datos mock, ventas aleatorias incrementales.
- **Colores**: gradiente gris (`#c8cbdc`) a verde (`#7aff84`), diseño responsive.

## Instalación

```bash
npm install
npm run dev


---

## 8. `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

