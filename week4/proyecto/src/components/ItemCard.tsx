import { Product } from '../types';

interface ItemCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ product, onDelete }) => {
  const handleViewDetails = () => {
    alert(`📋 Detalles de ${product.name}
    
Marca: ${product.brand}
Categoría: ${product.category}
Precio: $${product.price.toLocaleString('es-CO')} COP
Stock: ${product.stock} unidades
${product.onSale ? '🔥 En oferta' : ''}`);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar "${product.name}" del catálogo?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="item-card">
      <div className="card-header">
        <h3>{product.name}</h3>
        {product.onSale && <span className="badge sale-badge">🔥 Oferta</span>}
      </div>
      <div className="card-body">
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Precio:</strong> ${product.price.toLocaleString('es-CO')} COP</p>
        <p><strong>Stock:</strong> 
          <span className={product.stock === 0 ? 'out-of-stock' : 'in-stock'}>
            {product.stock === 0 ? ' Agotado' : ` ${product.stock} unidades`}
          </span>
        </p>
      </div>
      <div className="card-actions">
        <button onClick={handleViewDetails} className="btn-details">🔍 Ver detalles</button>
        <button onClick={handleDelete} className="btn-delete-card">🗑️ Eliminar</button>
      </div>
    </div>
  );
};

export default ItemCard;