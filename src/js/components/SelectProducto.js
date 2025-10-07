// Componente: Select dropdown producto

export class SelectProducto {

    // Atributos
    #id;
    #hayCambio;
    #productos;
    #productoSeleccionado;
    #elemento;

    // Constructor
    constructor(id, productos = [], hayCambio = null) {
        this.#id = id;
        this.#productos = productos;
        this.#hayCambio = hayCambio;
        this.#productoSeleccionado = null;
        this.#elemento = this.#crearElemento();
        this.#poblarOpciones();
        this.#agregarListener();
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setters
    setProductos(productos) {
        this.#productos = productos;
        this.#poblarOpciones();
    }

    // Resetear selección
    reset() {
        this.#productoSeleccionado = null;
        const select = this.#elemento.querySelector('select');
        if (select) {
            select.value = '';
        }
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block mb-1 font-bold text-emerald-800">
                Producto
            </label>
            <select
                id="${this.#id}"
                class="w-full p-2 bg-gray-200 border border-emerald-800 rounded-md text-sm text-emerald-800 focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
            >
                <option value="">Seleccionar un producto...</option>
            </select>
        `;
        return div;
    }

    // Poblar opciones del select (método privado)
    #poblarOpciones() {
        const select = this.#elemento.querySelector('select');
        // Limpiar opciones existentes (excepto la primera)
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        // Agregar productos
        this.#productos.forEach(producto => {
            const opcion = document.createElement('option');
            opcion.value = producto.getId();
            opcion.textContent = `${producto.getNombre()} (${producto.getNombreCientifico()}) - ID:${producto.getId()}`;
            // Guardar datos del producto
            opcion.dataset.precio = producto.getPrecio();
            opcion.dataset.stock = producto.getStock();
            opcion.dataset.nombre = producto.getNombre();
            opcion.dataset.nombreCientifico = producto.getNombreCientifico();

            select.appendChild(opcion);
        });
    }

    // Cargar listener de cambio
    #agregarListener() {
        const select = this.#elemento.querySelector('select');
        select.addEventListener('change', (evento) => this.#actualizarEventoCambio(evento));
    }

    // Manejar evento de cambio con callback
    #actualizarEventoCambio(evento) {
        const eleccion = evento.target.options[evento.target.selectedIndex];
        // Validar selección
        if (eleccion.value === '') {
            this.#productoSeleccionado = null;
            if (this.#hayCambio) {
                this.#hayCambio(null);
            }
            return;
        }
        // Crear objeto del producto seleccionado
        this.#productoSeleccionado = {
            id: eleccion.value,
            nombre: eleccion.dataset.nombre,
            nombreCientifico: eleccion.dataset.nombreCientifico,
            precio: parseFloat(eleccion.dataset.precio),
            stock: parseInt(eleccion.dataset.stock)
        };
        // Llamar callback si existe
        if (this.#hayCambio) {
            this.#hayCambio(this.#productoSeleccionado);
        }
    }
}
