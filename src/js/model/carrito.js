// CLASE CARRITO

export class Carrito {

    // Propiedades
    items;
    total;

    constructor() {
        this.items = [];
        this.total = 0;
    }

    // Agregar producto
    agregarProducto(producto, cantidad) {
        // Validar stock disponible
        if (!producto.estaDisponible(cantidad)) {
            console.error(`${producto.nombre} - ID: ${producto.id} > Stock insuficiente`);
            return false;
        }
        // Agregar
        const nuevoItem = {
            producto: producto,
            cantidad: cantidad,
            subtotal: cantidad * producto.precio
        };
        this.items.push(nuevoItem);
        console.log(`${producto.nombre} - ID: ${producto.id} > Agregado al carrito`);
        // Recalcular total
        this.calcularTotal();
        return true;
    }

    // Remover producto
    eliminarProducto(producto) {
        const itemEncontrado = this.items.find(item => item.producto.id === producto.id);
        if (itemEncontrado) {
            const index = this.items.indexOf(itemEncontrado);
            const itemRemovido = this.items.splice(index, 1)[0];
            console.log(`${producto.nombre} - ID: ${producto.id} > Eliminado del carrito`);
            // Recalcular total
            this.calcularTotal();
            return true;
        }
        return false;
    }

    // Actualizar cantidad
    actualizarCantidad(producto, nuevaCantidad) {
        const item = this.items.find(item => item.producto.id === producto.id);
        if (item && nuevaCantidad > 0) {
            // Eliminar?
            if (nuevaCantidad === 0) {
                return this.eliminarProducto(producto);
            }
            // Validar stock
            if (item.producto.estaDisponible(nuevaCantidad)) {
                item.cantidad = nuevaCantidad;
                item.subtotal = nuevaCantidad * item.producto.precio;
                console.log(`${producto.nombre} - ID: ${producto.id} > Cantidad actualizada`);
                // Recalcular total
                this.calcularTotal();
                return true;
            } else {
                console.error(`${producto.nombre} - ID: ${producto.id} > Stock insuficiente`);
                return false;
            }
        }
        return false;
    }

    // Calcular total del carrito
    calcularTotal() {
        this.total = 0;
        this.items.forEach(item => {
            this.total += item.subtotal;
        });
        return this.total;
    }

    // Limpiar carrito
    limpiar() {
        this.items = [];
        this.total = 0;
        console.log('Carrito limpiado');
    }
}
