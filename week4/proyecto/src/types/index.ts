export type ProductCategory = 
  | 'Rostro'
  | 'Cabello'
  | 'Maquillaje'
  | 'Cuidado corporal'
  | 'Perfumería';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: ProductCategory;
  onSale: boolean;
}

export type SortField = 'name' | 'price' | 'stock';
export type SortOrder = 'asc' | 'desc';