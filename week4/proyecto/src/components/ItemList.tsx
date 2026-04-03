import { Product } from '../types';
import ItemCard from './ItemCard';
import EmptyState from './EmptyState';

interface ItemListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="item-list">
      {products.map(product => (
        <ItemCard key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ItemList;