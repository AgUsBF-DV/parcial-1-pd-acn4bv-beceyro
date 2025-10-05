// CLASES
class Producto {

    // Propiedades
    id;
    nombre;
    nombreCientifico;
    precio;
    stock;

    // Constructor
    constructor(id, nombre, nombreCientifico, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.nombreCientifico = nombreCientifico;
        this.precio = precio;
        this.stock = stock;
    }

    // Metodos
    // Verificar stock
    estaDisponible(cantidad = 1) {
        if (this.stock >= cantidad) {
            console.log(`Stock suficiente (ID:${this.id}, disponibles: ${this.stock}, solicitadas: ${cantidad})`);
            return true;
        } else {
            console.log(`Stock insuficiente (ID:${this.id}, disponibles: ${this.stock}, solicitadas: ${cantidad})`);
            return false;
        }
    }

    // Descontar stock
    descontarStock(cantidad) {
        if (this.estaDisponible(cantidad)) {
            this.stock -= cantidad;
            return true;
        }
        return false;
    }

    // Mostrar info
    mostrarInfo() {
        return `Producto ID ${this.id}: ${this.nombre} (${this.nombreCientifico}) - $${this.precio} - Stock: ${this.stock}`;
    }
}

// Exportar la clase
export { Producto };