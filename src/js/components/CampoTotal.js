// Componente: CampoTotal — muestra y actualiza el total de la compra

export class CampoTotal {

    // Campos privados
    #id;
    #valor;
    #elemento;

    // Constructor
    constructor(valor = 0) {
        this.#id = 'total-carrito';
        this.#elemento = this.#crearElemento();
        this.setValor(valor);
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setters
    setValor(valor) {
        const elemento = this.#elemento.querySelector(`#${this.#id}`);
        if (elemento && valor >= 0) {
            this.#valor = valor;
            elemento.textContent = this.#valor;
        }
    }

    // Resetear total
    reset() {
        this.setValor(0);
    }

    // Crear elemento DOM privado (método privado)
    #crearElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Total
            </label>
            <div class="p-3 bg-emerald-50 border border-emerald-800 rounded-md text-lg font-semibold text-emerald-900">
                $<span id="${this.#id}">0</span>
            </div>
        `;
        return div;
    }
}
