// Comoponente: Campo de Precio

export class CampoPrecio {

    // Atributos
    #id;
    #precio;
    #elemento;

    // Constructor
    constructor(id, precio = 0) {
        this.#id = id;
        this.#precio = precio;
        this.#elemento = this._crearElemento();
    }

    // Getters
    getPrecio() {
        return this.#precio;
    }

    getElemento() {
        return this.#elemento;
    }

    // Setter
    setPrecio(precio) {
        this.#precio = precio;
        const elemento = this.#elemento.querySelector(`#${this.#id}`);
        if (elemento) {
            elemento.textContent = this.#precio;
        }
    }

    // Crear elemento DOM (método privado)
    _crearElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Precio
            </label>
            <div class="p-2 bg-green-100 border border-emerald-800 rounded-md text-sm text-emerald-800">
                $<span id="${this.#id}">0</span>
            </div>
        `;
        return div;
    }

    // Resetear precio
    reset() {
        this.setPrecio(0);
    }
}
