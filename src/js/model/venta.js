// Modelo Venta
export class Venta {

    // Campos privados
    #clienteId;
    #vendedorId;
    #items;
    #total;
    #fecha;

    // Constructor
    constructor(clienteId, vendedorId, items = [], total = 0) {
        this.#clienteId = clienteId;
        this.#vendedorId = vendedorId;
        this.#items = Array.isArray(items) ? items.slice() : [];
        this.#total = total;
        this.#fecha = new Date();
    }

    toJSON() {
        return {
            clienteId: this.#clienteId,
            vendedorId: this.#vendedorId,
            items: this.#items.map(item => ({
                productoId: item.productoId,
                nombre: item.nombre,
                precio: Number(item.precio),
                cantidad: Number(item.cantidad),
                subtotal: Number(item.subtotal)
            })),
            total: Number(this.#total),
            fecha: this.#fecha.toISOString()
        };
    }

    static guardar(venta) {
        const key_ventas = 'ventas_vivero';
        const almacenamiento = localStorage.getItem(key_ventas);
        let datos = [];
        try {
            if (almacenamiento) {
                datos = JSON.parse(almacenamiento);
            }
            // datos = almacenamiento ? JSON.parse(almacenamiento) : [];
            // if (!Array.isArray(datos)) datos = [];
        } catch (error) {
            datos = [];
            console.error('Error en guardar() venta:', error);
        }
        datos.push(venta.toJSON());
        localStorage.setItem(key_ventas, JSON.stringify(datos));
    }
}
