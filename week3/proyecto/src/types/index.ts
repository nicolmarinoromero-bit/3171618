export type ProductCategory = 'Rostro' | 'Cabello' | 'Maquillaje' | 'Cuidado corporal' | 'Perfumería';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: ProductCategory;
  onSale: boolean;
}

export interface Stats {
  totalProducts: number;
  productsOnSale: number;
  totalStock: number;
  totalInventoryValue: number;
  lowStockCount: number;
}

export interface RealTimeData {
  dailySales: number;
  lastUpdated: string;
}