// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('TIENDA DE COSMÉTICOS - MODELADO DE ENTIDADES\n');

// ============================================
// 1. ENTIDADES
// ============================================

// QUÉ: Representa un producto de cosmética
// PARA: Poder gestionar los datos básicos de cada artículo en el inventario
// IMPACTO: Es la entidad central; se usará en ventas, promociones y filtros
interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  category: ProductCategory;
  stock: number;
  promotion?: Promotion;
}

// QUÉ: Información de la marca fabricante
// PARA: Agrupar productos por marca y mostrar detalles de la misma
// IMPACTO: Permite búsquedas por marca y asociar productos correctamente
interface Brand {
  id: string;
  name: string;
  country: string;
  description?: string;
}

// QUÉ: Datos de un cliente de la tienda
// PARA: Identificar al comprador y aplicar descuentos por fidelidad
// IMPACTO: Se usará en ventas y programas de lealtad
interface Customer {
  id: string;
  name: string;
  email: string;
  level: CustomerLevel;
  registeredAt: Date;
}

// QUÉ: Registro de una venta realizada
// PARA: Llevar el histórico de transacciones y calcular ingresos
// IMPACTO: Modifica el stock de productos y queda como comprobante
interface Sale {
  id: string;
  customer: Customer;
  products: { product: Product; quantity: number }[];
  total: number;
  date: Date;
}

// QUÉ: Promoción aplicable a productos
// PARA: Ofrecer descuentos temporales y atraer clientes
// IMPACTO: Puede modificar el precio final de un producto si está activa
interface Promotion {
  id: string;
  name: string;
  discount: number;
  status: PromotionStatus;
  validUntil: Date;
}

// ============================================
// 2. TYPES (UNIONS Y LITERALS)
// ============================================

// QUÉ: Categorías de productos disponibles
// PARA: Clasificar los productos
// IMPACTO: Garantiza categorías válidas
type ProductCategory = 'skincare' | 'makeup' | 'fragrance' | 'haircare';

// QUÉ: Estados de promoción
// PARA: Controlar promociones activas o expiradas
type PromotionStatus = 'active' | 'inactive' | 'expired';

// QUÉ: Niveles de fidelidad del cliente
// PARA: Aplicar beneficios según el nivel
type CustomerLevel = 'bronze' | 'silver' | 'gold';

// ============================================
// 3. FUNCIONES
// ============================================

// QUÉ: Calcula el precio final considerando promoción
// PARA: Reutilizar la lógica de descuentos
// IMPACTO: Evita repetir código en otras funciones
function calculatePrice(product: Product): number {
  if (product.promotion && product.promotion.status === 'active') {
    return product.price * (1 - product.promotion.discount / 100);
  }
  return product.price;
}

// QUÉ: Crea un nuevo producto
// PARA: Agregar artículos al inventario
// IMPACTO: Retorna un objeto Product
function createProduct(
  id: string,
  name: string,
  brand: Brand,
  price: number,
  category: ProductCategory,
  stock: number
): Product {
  return {
    id,
    name,
    brand,
    price,
    category,
    stock,
  };
}

// QUÉ: Lista todos los productos
// PARA: Mostrar el inventario
// IMPACTO: Retorna el array recibido
function listProducts(products: Product[]): Product[] {
  return products;
}

// QUÉ: Filtra productos por categoría
// PARA: Buscar productos por tipo
// IMPACTO: Devuelve un nuevo array filtrado
function filterProductsByCategory(
  products: Product[],
  category: ProductCategory
): Product[] {
  return products.filter(product => product.category === category);
}

// QUÉ: Registra una venta
// PARA: Crear un registro de compra
// IMPACTO: Reduce el stock y calcula el total
function registerSale(
  id: string,
  customer: Customer,
  items: { product: Product; quantity: number }[],
  date: Date
): Sale {

  let total = 0;

  items.forEach(item => {

    const product = item.product;

    // VALIDACIÓN DE STOCK
    if (product.stock < item.quantity) {
      throw new Error(`No hay suficiente stock para ${product.name}`);
    }

    const finalPrice = calculatePrice(product);

    total += finalPrice * item.quantity;

    // reducir stock
    product.stock -= item.quantity;

  });

  return {
    id,
    customer,
    products: items,
    total,
    date,
  };
}

// QUÉ: Aplica una promoción a un producto
// PARA: Asignar un descuento
// IMPACTO: Devuelve el producto con promoción activa
function applyPromotion(product: Product, promotion: Promotion): Product {
  return {
    ...product,
    promotion,
  };
}

// ============================================
// 4. DATOS DE PRUEBA
// ============================================

// Crear marcas
const brandLoreal: Brand = {
  id: 'b1',
  name: "L'Oréal Paris",
  country: 'Francia',
  description: 'Marca líder en cosmética capilar y skincare',
};

const brandMaybelline: Brand = {
  id: 'b2',
  name: 'Maybelline',
  country: 'EE.UU.',
};

// Crear productos
const product1 = createProduct(
  'p1',
  'Crema Hidratante Facial',
  brandLoreal,
  25.99,
  'skincare',
  50
);

const product2 = createProduct(
  'p2',
  'Máscara de pestañas',
  brandMaybelline,
  12.50,
  'makeup',
  30
);

const product3 = createProduct(
  'p3',
  'Perfume Flower',
  brandLoreal,
  45.00,
  'fragrance',
  15
);

const products = [product1, product2, product3];

// Crear promoción
const promotionSummer: Promotion = {
  id: 'promo1',
  name: 'Descuento verano',
  discount: 15,
  status: 'active',
  validUntil: new Date('2025-08-31'),
};

// Aplicar promoción
const product1WithPromo = applyPromotion(product1, promotionSummer);

products[0] = product1WithPromo;

// Crear cliente
const customer: Customer = {
  id: 'c1',
  name: 'Ana García',
  email: 'ana@email.com',
  level: 'gold',
  registeredAt: new Date('2024-01-15'),
};

// Registrar venta
const sale = registerSale(
  's1',
  customer,
  [
    { product: product1WithPromo, quantity: 2 },
    { product: product2, quantity: 1 },
  ],
  new Date()
);

// ============================================
// 5. PRUEBAS
// ============================================

console.log('Productos en inventario:');
console.log(listProducts(products));

console.log('\nProductos de la categoría "skincare":');
console.log(filterProductsByCategory(products, 'skincare'));

console.log('\nVenta registrada:');
console.log(sale);

console.log('\nStock después de la venta:');
console.log(`Producto ${product1.name}: ${product1.stock} unidades`);
console.log(`Producto ${product2.name}: ${product2.stock} unidades`);