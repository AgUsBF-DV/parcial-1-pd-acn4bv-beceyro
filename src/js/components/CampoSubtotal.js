// Comoponente: Campo de Subtotal

export class CampoSubtotal {

    // Atributos
    #id;
    #subtotal;
    #elemento;

    // Constructor
    constructor(id, subtotal = 0) {
        this.#id = id;
        this.#subtotal = subtotal;
        this.#elemento = this._createElemento();
        this.setSubtotal(this.#subtotal);
    }

    // Getters
    getSubtotal() {
        return this.#subtotal;
    }

    getElemento() {
        return this.#elemento;
    }

    setSubtotal(subtotal) {
        this.#subtotal = subtotal;
        const elemento = this.#elemento.querySelector(`#${this.#id}`);
        if (elemento) {
            elemento.textContent = this.#subtotal;
        }
    }

    // Crear elemento DOM (método privado)
    _createElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Subtotal
            </label>
            <div class="p-2 bg-green-100 border border-emerald-800 rounded-md text-sm font-bold text-emerald-800">
                $<span id="${this.id}">0</span>
            </div>
        `;

        return div;
    }

    // Resetear subtotal
    reset() {
        this.setSubtotal(0);
    }
}
