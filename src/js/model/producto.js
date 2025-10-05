// CLASE PRODUCTO

export class Producto {

    // Campos privados
    #id;
    #nombre;
    #nombreCientifico;
    #precio;
    #stock;

    // Constructor
    constructor(id, nombre, nombreCientifico, precio, stock) {
        this.#id = id;
        this.#nombre = nombre;
        this.#nombreCientifico = nombreCientifico;
        this.#precio = Number(precio) || 0;
        this.#stock = Number(stock) || 0;
    }

    // Getters
    getId() {
        return this.#id;
    }
    getNombre() {
        return this.#nombre;
    }
    getNombreCientifico() {
        return this.#nombreCientifico;
    }
    getPrecio() {
        return this.#precio;
    }
    getStock() {
        return this.#stock;
    }

    // Setters
    setNombre(nombre) {
        this.#nombre = String(nombre);
    }
    setNombreCientifico(nombreCientifico) {
        this.#nombreCientifico = String(nombreCientifico);
    }
    setPrecio(precio) {
        const n = Number(precio);
        this.#precio = Number.isFinite(n) ? n : this.#precio;
    }
    setStock(stock) {
        const n = Number(stock);
        this.#stock = Number.isFinite(n) ? n : this.#stock;
    }

    // Metodos
    // Verificar stock
    estaDisponible(cantidad = 1) {
        return this.#stock >= cantidad;
    }

    // Descontar stock
    descontarStock(cantidad) {
        if (this.estaDisponible(cantidad)) {
            this.#stock -= cantidad;
            return true;
        }
        return false;
    }

    // Mostrar info
    mostrarInfo() {
        return `Producto ID ${this.#id}: ${this.#nombre} (${this.#nombreCientifico}) - $${this.#precio} - Stock: ${this.#stock}`;
    }

    // Serialización para JSON
    toJSON() {
        return {
            id: this.getId(),
            nombre: this.getNombre(),
            nombreCientifico: this.getNombreCientifico(),
            precio: this.getPrecio(),
            stock: this.getStock()
        };
    }
}