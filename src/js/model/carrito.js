// CLASE CARRITO

export class Carrito {

    // Campos privados
    #items;
    #total;

    constructor() {
        this.#items = [];
        this.#total = 0;
    }

    // Getters
    getItems() {
        // retornar copia
        if (Array.isArray(this.#items)) {
            return this.#items.slice();
        }
        return [];
    }

    getTotal() {
        return this.#total;
    }

    // Setters
    setItems(items) {
        if (Array.isArray(items)) {
            this.#items = items.slice();
            this.calcularTotal();
            return true;
        }
        return false;
    }

    // Agregar producto
    agregarProducto(producto, cantidad) {
        // Validar stock disponible
        if (!producto.estaDisponible(cantidad)) {
            console.error(`${producto.getNombre()} - ID: ${producto.getId()} > Stock insuficiente`);
            return false;
        }
        // Agregar
        const nuevoItem = {
            producto: producto,
            cantidad: cantidad,
            subtotal: cantidad * producto.getPrecio()
        };
        this.#items.push(nuevoItem);
        console.log(`${producto.getNombre()} - ID: ${producto.getId()} > Agregado al carrito`);
        // Recalcular total
        this.calcularTotal();
        return true;
    }

    // Remover producto
    eliminarProducto(producto) {
        const itemEncontrado = this.#items.find(item => {
            const pid = item.producto.getId();
            const targetId = producto.getId();
            return pid === targetId;
        });
        if (itemEncontrado) {
            const index = this.#items.indexOf(itemEncontrado);
            const itemEliminado = this.#items.splice(index, 1)[0];
            console.log(`${producto.getNombre()} - ID: ${producto.getId()} > Eliminado del carrito`);
            // Recalcular total
            this.calcularTotal();
            return true;
        }
        return false;
    }

    // Actualizar cantidad
    actualizarCantidad(producto, nuevaCantidad) {
        const item = this.items.find(item => item.producto.getId() === producto.getId());
        if (item && nuevaCantidad > 0) {
            // Eliminar?
            if (nuevaCantidad === 0) {
                return this.eliminarProducto(producto);
            }
            // Validar stock
            const producto = item.producto;
            if (producto.estaDisponible(nuevaCantidad)) {
                item.cantidad = nuevaCantidad;
                item.subtotal = nuevaCantidad * producto.getPrecio();
                console.log(`${producto.getNombre()} - ID: ${producto.getId()} > Cantidad actualizada`);
                // Recalcular total
                this.calcularTotal();
                return true;
            } else {
                console.error(`${producto.getNombre()} - ID: ${producto.getId()} > Stock insuficiente`);
                return false;
            }
        }
        return false;
    }

    // Calcular total del carrito
    calcularTotal() {
        this.#total = 0;
        this.#items.forEach(item => {
            this.#total += item.subtotal;
        });
        return this.#total;
    }

    // Limpiar carrito
    limpiar() {
        this.#items = [];
        this.#total = 0;
        console.log('Carrito limpio');
    }
}
