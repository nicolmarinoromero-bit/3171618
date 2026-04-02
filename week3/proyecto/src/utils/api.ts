import { Product, Stats, RealTimeData } from '../types';

const mockProducts: Product[] = [
  { id: 1, name: 'Crema Hidratante Facial', brand: 'CeraVe', price: 15.99, stock: 25, category: 'Rostro', onSale: false },
  { id: 2, name: 'Champú Sólido de Romero', brand: 'Lush', price: 12.50, stock: 10, category: 'Cabello', onSale: true },
  { id: 3, name: 'Labial Líquido Mate', brand: 'Maybelline', price: 8.99, stock: 50, category: 'Maquillaje', onSale: false },
  { id: 4, name: 'Aceite Corporal de Almendras', brand: 'The Body Shop', price: 22.00, stock: 5, category: 'Cuidado corporal', onSale: true },
  { id: 5, name: 'Perfume Floral', brand: 'Chloé', price: 89.00, stock: 8, category: 'Perfumería', onSale: false },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (signal?: AbortSignal): Promise<Product[]> => {
  await delay(800);
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return [...mockProducts];
};

export const fetchStats = async (signal?: AbortSignal): Promise<Stats> => {
  await delay(500);
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  const totalProducts = mockProducts.length;
  const productsOnSale = mockProducts.filter(p => p.onSale).length;
  const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0);
  const totalInventoryValue = mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = mockProducts.filter(p => p.stock < 10).length;
  return { totalProducts, productsOnSale, totalStock, totalInventoryValue, lowStockCount };
};

let simulatedDailySales = 42;
export const fetchRealTimeData = async (signal?: AbortSignal): Promise<RealTimeData> => {
  await delay(300);
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  const increment = Math.floor(Math.random() * 5) + 1;
  simulatedDailySales += increment;
  return { dailySales: simulatedDailySales, lastUpdated: new Date().toLocaleTimeString() };
};