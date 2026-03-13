import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  return (
    <div className="item-card">
      <div className="item-card__header">
        <h3 className="item-card__title">{product.name}</h3>
        {product.onSale && <span className="badge badge--success">🔥 Oferta</span>}
      </div>

      <div className="item-card__body">
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
        <p>
          <strong>Stock:</strong>{' '}
          <span className={product.stock === 0 ? 'badge badge--danger' : ''}>
            {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
          </span>
        </p>
      </div>

      <div className="item-card__actions">
        <button className="btn btn-edit" onClick={() => onEdit(product.id)}>✏️ Editar</button>
        <button className="btn btn-delete" onClick={() => onDelete(product.id)}>🗑️ Eliminar</button>
      </div>
    </div>
  );
};

export default ProductCard;