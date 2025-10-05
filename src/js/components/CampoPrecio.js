// Comoponente: Campo de Precio

export class CampoPrecio {

    // Atributos
    #id;
    #precio;
    #elemento;

    // Constructor
    constructor(id, precio = 0) {
        this.#id = id;
        this.#elemento = this.#crearElemento();
        this.setPrecio(precio);
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setter
    setPrecio(precio) {
        const elemento = this.#elemento.querySelector(`#${this.#id}`);
        if (elemento && precio >= 0) {
            this.#precio = precio;
            elemento.textContent = this.#precio;
        }
    }

    // Resetear precio
    reset() {
        this.setPrecio(0);
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
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
}
