import { useState } from "react";
import type { Product, ProductFormData } from "./types/index";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addProduct = (productData: ProductFormData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const startEdit = (id: number) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);
  const productToEdit = editingId ? products.find(p => p.id === editingId) : undefined;

  return (
    <div className="app">
      <Header />
      <div className="container">
        <ProductForm onAdd={addProduct} onUpdate={updateProduct} editingProduct={productToEdit} onCancelEdit={cancelEdit} />
        <ProductList products={products} onDelete={deleteProduct} onEdit={startEdit} />
      </div>
    </div>
  );
};

export default App;