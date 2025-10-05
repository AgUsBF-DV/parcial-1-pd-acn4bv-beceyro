// Comoponente: Campo de Subtotal

export class CampoSubtotal {

    // Atributos
    #id;
    #subtotal;
    #elemento;

    // Constructor
    constructor(id, subtotal = 0) {
        this.#id = id;
        this.#elemento = this.#crearElemento();
        this.setSubtotal(subtotal);
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setter
    setSubtotal(subtotal) {
        const elemento = this.#elemento.querySelector(`#${this.#id}`);
        if (elemento && typeof subtotal === 'number' && subtotal >= 0) {
            this.#subtotal = subtotal;
            elemento.textContent = this.#subtotal;
        }
    }

    // Resetear subtotal
    reset() {
        this.setSubtotal(0);
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Subtotal
            </label>
            <div class="p-2 bg-green-100 border border-emerald-800 rounded-md text-sm font-bold text-emerald-800">
                $<span id="${this.#id}">0</span>
            </div>
        `;
        return div;
    }
}
