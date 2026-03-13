import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>💄 No hay productos en la tienda</p>
        <p className="empty-state__hint">Agrega tu primer producto usando el formulario</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductList;