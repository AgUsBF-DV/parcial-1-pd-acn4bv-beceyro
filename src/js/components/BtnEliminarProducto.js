// Componente: Botón eliminar un producto

export class BtnEliminarProducto {

    // Atributos
    #hayEliminacion;
    #texto;
    #elemento;

    // Constructor
    constructor(onDelete, texto = 'Eliminar') {
        this.#hayEliminacion = onDelete;
        this.#elemento = this.#crearElemento();
        this.setText(texto);
        this.#agregarListener();
    }

    // Getters
    getElemento() {
        return this.#elemento;
    }

    // Setters
    setText(texto) {
        const elemento = this.#elemento;
        if (elemento && texto) {
            this.#texto = texto;
            elemento.textContent = texto;
        }
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-bold transition-colors duration-200';
        return boton;
    }

    // Cargar listeners
    #agregarListener() {
        this.#elemento.addEventListener('click', (e) => this.#actuarEventoClick(e));
    }

    // Manejar evento click
    #actuarEventoClick(event) {
        event.preventDefault();
        event.stopPropagation();

        // Confirmación antes de eliminar
        if (this.#pedirConfirmacion()) {
            // Llamar callback si existe
            if (this.#hayEliminacion) {
                this.#hayEliminacion();
            }
        }
    }

    // Mje de confirmacion antes de eliminar
    #pedirConfirmacion() {
        return confirm('¿Seguro desea eliminar este producto del carrito?');
    }
}
