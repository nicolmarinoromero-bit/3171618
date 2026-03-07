// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
console.log('TIENDA DE COSMÉTICOS - MODELADO DE ENTIDADES\n');
// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================
// QUÉ: Crea un nuevo producto
// PARA: Agregar un artículo al inventario
// IMPACTO: Retorna un objeto Product con los datos proporcionados
function createProduct(id, name, brand, price, category, stock) {
    return {
        id: id,
        name: name,
        brand: brand,
        price: price,
        category: category,
        stock: stock,
        // promotion no se asigna por defecto
    };
}
// QUÉ: Lista todos los productos
// PARA: Mostrar el inventario completo
// IMPACTO: Simplemente retorna el array recibido (podría ordenarse o filtrarse después)
function listProducts(products) {
    return products;
}
// QUÉ: Filtra productos por categoría
// PARA: Obtener solo los productos de una categoría específica
// IMPACTO: Devuelve un nuevo array con los productos que cumplen la condición
function filterProductsByCategory(products, category) {
    return products.filter(function (product) { return product.category === category; });
}
// QUÉ: Registra una venta
// PARA: Crear un registro de transacción, descontar stock y calcular total
// IMPACTO: Modifica el stock de los productos vendidos y devuelve el objeto Sale
function registerSale(id, customer, items, date) {
    // Calcular total aplicando promociones si existen
    var total = 0;
    items.forEach(function (item) {
        var product = item.product;
        var finalPrice = product.price;
        // Si el producto tiene promoción activa, aplicar descuento
        if (product.promotion && product.promotion.status === 'active') {
            var discount = product.promotion.discount;
            finalPrice = product.price * (1 - discount / 100);
        }
        total += finalPrice * item.quantity;
        // Reducir stock (simulación, en un sistema real se haría con update)
        product.stock -= item.quantity;
    });
    return {
        id: id,
        customer: customer,
        products: items,
        total: total,
        date: date,
    };
}
// QUÉ: Aplica una promoción a un producto
// PARA: Asignar un descuento temporal a un artículo específico
// IMPACTO: Modifica la propiedad promotion del producto
function applyPromotion(product, promotion) {
    // Clonamos el producto para no mutar el original directamente (buena práctica)
    return __assign(__assign({}, product), { promotion: promotion });
}
// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================
// Crear marcas de ejemplo
var brandLoreal = {
    id: 'b1',
    name: 'L\'Oréal Paris',
    country: 'Francia',
    description: 'Marca líder en cosmética capilar y skincare',
};
var brandMaybelline = {
    id: 'b2',
    name: 'Maybelline',
    country: 'EE.UU.',
};
// Crear productos
var product1 = createProduct('p1', 'Crema Hidratante Facial', brandLoreal, 25.99, 'skincare', 50);
var product2 = createProduct('p2', 'Máscara de pestañas', brandMaybelline, 12.50, 'makeup', 30);
var product3 = createProduct('p3', 'Perfume Flower', brandLoreal, 45.00, 'fragrance', 15);
var products = [product1, product2, product3];
// Crear una promoción
var promotionSummer = {
    id: 'promo1',
    name: 'Descuento verano',
    discount: 15,
    status: 'active',
    validUntil: new Date('2025-08-31'),
};
// Aplicar promoción al producto 1
var product1WithPromo = applyPromotion(product1, promotionSummer);
// Actualizar el array (en un caso real se actualizaría la referencia)
products[0] = product1WithPromo;
// Crear un cliente
var customer = {
    id: 'c1',
    name: 'Ana García',
    email: 'ana@email.com',
    level: 'gold', // type literal
    registeredAt: new Date('2024-01-15'),
};
// Registrar una venta
var sale = registerSale('s1', customer, [
    { product: product1WithPromo, quantity: 2 },
    { product: product2, quantity: 1 },
], new Date());
// Pruebas
console.log('Productos en inventario:');
console.log(listProducts(products));
console.log('\nProductos de la categoría "skincare":');
console.log(filterProductsByCategory(products, 'skincare'));
console.log('\nVenta registrada:');
console.log(sale);
// Verificar que el stock se redujo
console.log('\nStock después de la venta:');
console.log("Producto ".concat(product1.name, ": ").concat(product1.stock, " unidades"));
console.log("Producto ".concat(product2.name, ": ").concat(product2.stock, " unidades"));
