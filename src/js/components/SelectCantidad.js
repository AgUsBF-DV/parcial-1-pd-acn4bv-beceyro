// Componente: Select dropdown cantidad

export class SelectCantidad {

    // Atributos
    #id;
    #hayCambio;
    #cantidadMax;
    #cantidad;
    #elemento;

    // Constructor
    constructor(id, hayCambio, cantidadMax = 0) {
        this.#id = id;
        this.#hayCambio = hayCambio;
        this.#elemento = this.#crearElemento();
        this.setCantidadMax(cantidadMax);
        this.#cantidad = 0;
        this.#agregarListener();
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setters
    setCantidadMax(cantidadMax) {
        if (cantidadMax >= 0) {
            this.#cantidadMax = cantidadMax;
            this.#actualizarOpciones();
        }
    }

    // Resetear cantidad
    reset() {
        this.#cantidad = 0;
        const select = this.#elemento.querySelector('select');
        if (select) {
            select.value = 0;
        }
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Cantidad
            </label>
            <select
                id="${this.#id}"
                class="w-full p-2 bg-gray-200 border border-emerald-800 rounded-md text-sm text-emerald-800 focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            >
                <option value="0">0</option>
            </select>
        `;
        return div;
    }

    // Actualizar opciones según stock disponible
    #actualizarOpciones() {
        const select = this.#elemento.querySelector('select');
        // Limpiar opciones existentes
        select.innerHTML = '';
        // Generar opciones de 0 hasta el cantidadMax
        for (let i = 0; i <= this.#cantidadMax; i++) {
            const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i === 1 ? '1 unidad' : `${i} unidades`;
            select.appendChild(opcion);
        }
        // Resetear cantidad seleccionada
        this.#cantidad = 0;
        select.value = 0;
    }

    // Cargar listener de cambio
    #agregarListener() {
        const select = this.#elemento.querySelector('select');
        select.addEventListener('change', (evento) => this.#actualizarEventoCambio(evento));
    }

    // Manejar evento de cambio con callback
    #actualizarEventoCambio(evento) {
        this.#cantidad = parseInt(evento.target.value) || 0;
        // Llamar callback si existe
        if (this.#hayCambio) {
            this.#hayCambio(this.#cantidad);
        }
    }
}
