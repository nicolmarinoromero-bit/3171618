// Producto de cosméticos
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  onSale: boolean;
}

// Venta del día
export interface DailySale {
  id: number;
  productId: number;
  quantity: number;
  total: number;
  date: string;
}

// Datos mock
export const mockProducts: Product[] = [
  { id: 1, name: 'Crema Hidratante', brand: 'CeraVe', price: 68900, stock: 5, category: 'Rostro', onSale: false },
  { id: 2, name: 'Champú Sólido', brand: 'Lush', price: 42500, stock: 2, category: 'Cabello', onSale: true },
  { id: 3, name: 'Labial Mate', brand: 'Maybelline', price: 32900, stock: 50, category: 'Maquillaje', onSale: false },
  { id: 4, name: 'Aceite Corporal', brand: 'The Body Shop', price: 78900, stock: 0, category: 'Cuidado corporal', onSale: true },
  { id: 5, name: 'Perfume Floral', brand: 'Chloé', price: 349900, stock: 8, category: 'Perfumería', onSale: false },
];

export const mockDailySales: DailySale[] = [
  { id: 1, productId: 1, quantity: 2, total: 137800, date: new Date().toISOString() },
  { id: 2, productId: 3, quantity: 1, total: 32900, date: new Date().toISOString() },
];