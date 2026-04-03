# 💄 Catálogo Interactivo de Cosméticos

## Dominio: Tienda de Cosméticos

Catálogo de productos de belleza con filtros, ordenamiento y búsqueda en tiempo real. Los productos tienen:
- Nombre, marca, precio, stock, categoría y si está en oferta.

## Funcionalidades implementadas

- ✅ **Renderizado condicional**: loading, error, empty state, contador de resultados, badges.
- ✅ **Listas con keys**: uso de `id` como key, componente `ItemCard` separado.
- ✅ **Filtrado**: por categoría (Rostro, Cabello, Maquillaje, etc.), por rango de precio, y solo productos en oferta.
- ✅ **Ordenamiento**: por nombre, precio (asc/desc) y stock.
- ✅ **Búsqueda**: en tiempo real (case-insensitive) por nombre y marca. Con botón limpiar.
- ✅ **Sin mutación**: uso de `filter`, `sort` con spread y operadores inmutables.

## Instalación y ejecución

```bash
pnpm install
pnpm dev

Decisiones técnicas
useDebounce para optimizar la búsqueda en tiempo real (evita re-renderizados excesivos).

useMemo para filtrado y ordenamiento, mejora rendimiento.

Tipado estricto con TypeScript, sin uso de any.

CSS modular con clases BEM (aproximado).

Datos mock en src/data/items.ts para simular API.

Estructura de componentes
Catalog: componente principal, gestiona estado y lógica de filtros/orden.

ItemList: renderiza la lista de productos usando ItemCard.

ItemCard: tarjeta individual con información y badges.

SearchBar: input de búsqueda con botón limpiar.

FilterPanel: controles de categoría, rango de precio y checkbox de oferta.

SortSelector: selector de criterio y dirección de orden.

EmptyState, LoadingSpinner: estados visuales.