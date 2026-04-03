# 💄 Dashboard Interactivo – Tienda de Cosméticos

## Dominio asignado
**Tienda de cosméticos** – productos de belleza, ventas y promociones.

## Widgets implementados
1. **Productos bajo stock** – muestra productos con stock < 10.
2. **Ventas del día** – total de ventas, con actualización manual y auto-refresh cada 10s.
3. **Productos en oferta** – lista de productos con promoción activa.

## Custom hooks utilizados (5+)
- `useLocalStorage` – persistencia del tema.
- `useFetch` – llamadas a API simuladas con AbortController.
- `useToggle` – sidebar colapsable y auto-refresh.
- `useDebounce` (preparado para búsqueda futura).
- `useFilter` (preparado para filtrar productos).

## Context API
- `ThemeContext` con tema claro/oscuro, persistente en localStorage.

## TypeScript
- Tipos estrictos, sin `any`. Interfaces para productos y ventas.

## Instalación y ejecución
```bash
pnpm install
pnpm dev