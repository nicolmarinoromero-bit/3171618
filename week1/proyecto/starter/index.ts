// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('🏛️ PROYECTO SEMANAL: MODELADO DE ENTIDADES\n');

// INSTRUCCIONES:
// Adapta este archivo a tu dominio asignado (ej: biblioteca, farmacia, gimnasio, restaurante, etc.)
// Implementa las entidades, tipos y funciones siguiendo los TODOs y comentarios.
// Usa interfaces, types, type unions y literales. Comenta el código con qué/para/impacto.

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

/**
 * QUÉ: Interfaz que representa un producto de cosmética en la tienda.
 * PARA: Definir la estructura base de cualquier producto en el inventario.
 * IMPACTO: Permite tipar y garantizar que todos los productos tengan las mismas propiedades obligatorias.
 */
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: ProductCategory;    // Type union definido abajo
  onSale: boolean;              // Indica si está en promoción
}

/**
 * QUÉ: Interfaz que representa una venta realizada en la tienda.
 * PARA: Registrar transacciones, asociar productos vendidos y calcular ingresos.
 * IMPACTO: Permite llevar un historial de ventas y analizar tendencias.
 */
interface Sale {
  id: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  saleDate: Date;
  paymentMethod: PaymentMethod; // Type union definido abajo
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

/**
 * QUÉ: Type union para las categorías permitidas de productos.
 * PARA: Restringir los valores que puede tomar la propiedad `category` de un Producto.
 * IMPACTO: Evita errores y documenta las únicas categorías válidas en la tienda.
 */
type ProductCategory = 
  | 'Rostro'
  | 'Cabello'
  | 'Maquillaje'
  | 'Cuidado corporal'
  | 'Perfumería';

/**
 * QUÉ: Type union para los métodos de pago aceptados.
 * PARA: Limitar las opciones de pago en las ventas.
 * IMPACTO: Estandariza la información de pago y facilita reportes.
 */
type PaymentMethod = 'Efectivo' | 'Tarjeta débito' | 'Tarjeta crédito' | 'Transferencia';

/**
 * QUÉ: Type union para el estado de un producto (activo, descatalogado, agotado).
 * PARA: Gestionar el ciclo de vida de los productos.
 * IMPACTO: Permite filtrar productos activos y controlar inventario.
 */
type ProductStatus = 'active' | 'discontinued' | 'outOfStock';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

/**
 * QUÉ: Crea un nuevo producto con un ID único y valores por defecto.
 * PARA: Agregar productos al inventario de forma controlada.
 * IMPACTO: Centraliza la creación de productos y garantiza que siempre tengan todas las propiedades.
 */
function createProduct(
  name: string,
  brand: string,
  price: number,
  stock: number,
  category: ProductCategory,
  onSale: boolean = false
): Product {
  const id = Date.now(); // ID único basado en timestamp
  return { id, name, brand, price, stock, category, onSale };
}

/**
 * QUÉ: Lista todos los productos de un array dado.
 * PARA: Visualizar el inventario completo.
 * IMPACTO: Proporciona una vista genérica y tipada del catálogo.
 */
function listProducts(products: Product[]): Product[] {
  return products;
}

/**
 * QUÉ: Filtra productos por categoría.
 * PARA: Obtener subconjuntos de productos según su tipo (ej: solo maquillaje).
 * IMPACTO: Facilita la navegación y segmentación del inventario.
 */
function filterByCategory(products: Product[], category: ProductCategory): Product[] {
  return products.filter(product => product.category === category);
}

/**
 * QUÉ: Filtra productos por estado (basado en stock y disponibilidad).
 * PARA: Identificar productos activos, descatalogados o agotados.
 * IMPACTO: Ayuda a gestionar el inventario y tomar decisiones de reposición.
 */
function filterByStatus(products: Product[], status: ProductStatus): Product[] {
  switch (status) {
    case 'active':
      return products.filter(p => p.stock > 0 && !p.onSale);
    case 'outOfStock':
      return products.filter(p => p.stock === 0);
    case 'discontinued':
      return products.filter(p => p.stock === 0 && p.price === 0);
    default:
      return [];
  }
}

/**
 * QUÉ: Registra una venta de un producto, actualizando el stock y calculando el total.
 * PARA: Procesar compras y mantener la integridad del inventario.
 * IMPACTO: Vincula productos y ventas, evita inconsistencias.
 */
function createSale(
  product: Product,
  quantity: number,
  paymentMethod: PaymentMethod
): Sale | null {
  if (quantity <= 0 || quantity > product.stock) {
    console.error(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
    return null;
  }
  const totalAmount = product.price * quantity;
  const sale: Sale = {
    id: Date.now(),
    productId: product.id,
    quantity,
    totalAmount,
    saleDate: new Date(),
    paymentMethod,
  };
  // Actualizar stock del producto
  product.stock -= quantity;
  return sale;
}

/**
 * QUÉ: Calcula el total de ventas en dinero para un array de ventas.
 * PARA: Obtener ingresos totales.
 * IMPACTO: Útil para reportes financieros.
 */
function calculateTotalSales(sales: Sale[]): number {
  return sales.reduce((total, sale) => total + sale.totalAmount, 0);
}

// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================

// Crear productos de ejemplo
const products: Product[] = [
  createProduct('Crema Hidratante Facial', 'CeraVe', 15.99, 25, 'Rostro', false),
  createProduct('Champú Sólido de Romero', 'Lush', 12.5, 10, 'Cabello', true),
  createProduct('Labial Líquido Mate', 'Maybelline', 8.99, 50, 'Maquillaje', false),
  createProduct('Aceite Corporal de Almendras', 'The Body Shop', 22.0, 5, 'Cuidado corporal', true),
  createProduct('Perfume Floral', 'Chloé', 89.0, 8, 'Perfumería', false),
];

console.log('Inventario completo:');
console.log(listProducts(products));

console.log('\nFiltrado por categoría (Maquillaje):');
console.log(filterByCategory(products, 'Maquillaje'));

// Modificamos stock de un producto a cero para probar filtro de agotados
products[3].stock = 0;
console.log('\nProductos agotados:');
console.log(filterByStatus(products, 'outOfStock'));

console.log('\nRegistro de ventas:');
const sales: Sale[] = [];

const sale1 = createSale(products[0], 2, 'Tarjeta débito');
if (sale1) sales.push(sale1);

const sale2 = createSale(products[2], 1, 'Efectivo');
if (sale2) sales.push(sale2);

const sale3 = createSale(products[3], 1, 'Tarjeta crédito'); // fallará porque stock = 0
if (sale3) sales.push(sale3);

console.log('Ventas realizadas:');
console.log(sales);

console.log(`\nTotal de ventas acumulado: $${calculateTotalSales(sales).toFixed(2)}`);

console.log('\nInventario actualizado:');
console.log(products);

// ============================================
// 5. Comenta tu código explicando qué/para/impacto
// ============================================

// QUÉ: Se usaron interfaces para Product y Sale, y types para categorías, métodos de pago y estados.
// PARA: Asegurar un modelado fuerte y evitar errores en tiempo de ejecución.
// IMPACTO: El código es más mantenible y auto-documentado.

// QUÉ: Las funciones son puras en su mayoría y tipan tanto parámetros como retornos.
// PARA: Facilitar pruebas y razonamiento sobre el flujo de datos.
// IMPACTO: Reduce bugs y mejora la experiencia de desarrollo.

// QUÉ: Se incluyeron ejemplos de filtrado, creación y ventas con console.log.
// PARA: Demostrar el uso práctico de los tipos y funciones.
// IMPACTO: Sirve como base para extender a una aplicación real (con UI o API).

console.log('\n🚦 Recuerda: Adapta TODO a tu dominio y comenta tu código.');