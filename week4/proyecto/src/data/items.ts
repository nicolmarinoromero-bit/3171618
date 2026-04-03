import { Product } from '../types';

export const mockProducts: Product[] = [
  { id: 1, name: 'Crema Hidratante Facial', brand: 'CeraVe', price: 68900, stock: 25, category: 'Rostro', onSale: false },
  { id: 2, name: 'Champú Sólido de Romero', brand: 'Lush', price: 42500, stock: 10, category: 'Cabello', onSale: true },
  { id: 3, name: 'Labial Líquido Mate', brand: 'Maybelline', price: 32900, stock: 50, category: 'Maquillaje', onSale: false },
  { id: 4, name: 'Aceite Corporal de Almendras', brand: 'The Body Shop', price: 78900, stock: 5, category: 'Cuidado corporal', onSale: true },
  { id: 5, name: 'Perfume Floral', brand: 'Chloé', price: 349900, stock: 8, category: 'Perfumería', onSale: false },
  { id: 6, name: 'Mascarilla Capilar', brand: 'Moroccanoil', price: 125900, stock: 15, category: 'Cabello', onSale: false },
  { id: 7, name: 'Base de Maquillaje', brand: 'Fenty Beauty', price: 159900, stock: 20, category: 'Maquillaje', onSale: true },
  { id: 8, name: 'Agua Micelar', brand: 'Garnier', price: 38900, stock: 30, category: 'Rostro', onSale: false },
];