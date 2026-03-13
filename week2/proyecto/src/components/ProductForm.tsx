import { useState, useEffect } from "react";
import type { Product, ProductFormData, ProductCategory } from "../types";

interface ProductFormProps {
  onAdd: (product: ProductFormData) => void;
  onUpdate: (id: number, updates: Partial<Product>) => void;
  editingProduct?: Product;
  onCancelEdit: () => void;
}

const categories: ProductCategory[] = [
  "Rostro",
  "Cabello",
  "Maquillaje",
  "Cuidado corporal",
  "Perfumería"
];

const ProductForm: React.FC<ProductFormProps> = ({ onAdd, onUpdate, editingProduct, onCancelEdit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    price: 0,
    stock: 0,
    category: "Rostro",
    onSale: false
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        brand: editingProduct.brand,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category,
        onSale: editingProduct.onSale
      });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      onUpdate(editingProduct.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData({
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      category: "Rostro",
      onSale: false
    });
  };

  return (
    <div className="form-container">
      <h2>{editingProduct ? "✏️ Editar Producto" : " Agregar Producto"}</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marca *</label>
          <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio ($) *</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" min="" required/>
        </div>

        <div className="form-group">
          <label htmlFor="stock">Cantidad *</label>
          <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} step="1" min="" required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <br></br>
        <div className="form-group checkbox">
          <label>
            <input type="checkbox" name="onSale" checked={formData.onSale} onChange={handleChange} />
            En promoción
          </label>
        </div>
        <br></br>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{editingProduct ? "Actualizar" : "Agregar"}</button>
          {editingProduct && <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>Cancelar</button>}
        </div>

      </form>
    </div>
  );
};

export default ProductForm;