// Componente: Tarjeta de producto

import { SelectProducto } from './SelectProducto.js';
import { CampoPrecio } from './CampoPrecio.js';
import { SelectCantidad } from './SelectCantidad.js';
import { CampoSubtotal } from './CampoSubtotal.js';
import { BtnEliminarProducto } from './BtnEliminarProducto.js';

export class CardProducto {

    // Atributos
    #id;
    #idProducto;
    #productosDisponibles;
    #hayCambioProducto;
    #hayCambioCantidad;
    #hayEliminacion;

    // Constructor
    constructor(id, idProducto, productosDisponibles, hayCambioProducto, hayCambioCantidad, hayEliminacion) {
        this.#id = id;
        this.#idProducto = idProducto;
        this.#productosDisponibles = productosDisponibles;
        this.#hayCambioProducto = hayCambioProducto;
        this.#hayCambioCantidad = hayCambioCantidad;
        this.#hayEliminacion = hayEliminacion;
        this.element = this.#crearElemento();

        // Datos del producto actual
        this.productoSeleccionado = null;
        this.canidadProductoSeleccionado = 0;
        this.precioProductoSeleccionado = 0;
        this.subtotalProductoSeleccionado = 0;

        // Crear el elemento raíz
        this.#inicializar();
    }

    // Getters
    getDatosProducto() {
        return {
            id: this.#id,
            numeroProducto: this.#idProducto,
            productoId: this.productoSeleccionado ? this.productoSeleccionado.id : '',
            cantidad: this.canidadProductoSeleccionado,
            precio: this.precioProductoSeleccionado,
            subtotal: this.subtotalProductoSeleccionado
        };
    }

    // Crear elemento DOM (método privado)
    #crearElemento() {
        const div = document.createElement('div');
        div.id = this.#id;
        div.className = 'bg-green-300 p-5 rounded-md border border-emerald-800 relative producto-entrada';
        div.innerHTML = `
            <div class="mb-3 text-md font-bold text-emerald-800">
                <span>Item #${this.#idProducto}</span>
            </div>
            <div id="producto-${this.#id}"></div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5 items-end pt-5">
                <div id="precio-${this.#id}"></div>
                <div id="cantidad-${this.#id}"></div>
                <div id="subtotal-${this.#id}"></div>
                <div id="acciones-${this.#id}" class="flex flex-col justify-center">
                    ${this.#idProducto > 1 ? `<div id="eliminar-${this.#id}"></div>` : ''}
                </div>
            </div>
        `;
        return div;
    }

    // Setup de componentes
    #inicializar() {
        // Buscar contenedores e instanciar componentes
        // Selector producto
        const contenedorSelectProducto = this.element.querySelector(`#producto-${this.#id}`);
        if (contenedorSelectProducto) {
            this.selectProducto = new SelectProducto(
                `select-nombre-${this.#id}`,
                this.#productosDisponibles,
                (productData) => this.actualizarCambioProducto(productData)
            );
            contenedorSelectProducto.appendChild(this.selectProducto.getElemento());
        }
        // Campo precio
        const contenedorCampoPrecio = this.element.querySelector(`#precio-${this.#id}`);
        if (contenedorCampoPrecio) {
            this.campoPrecio = new CampoPrecio(`campo-precio-${this.#id}`);
            contenedorCampoPrecio.appendChild(this.campoPrecio.getElemento());
        }
        // Selector cantidad
        const contenedorSelectCantidad = this.element.querySelector(`#cantidad-${this.#id}`);
        if (contenedorSelectCantidad) {
            this.selectCantidad = new SelectCantidad(
                `select-cantidad-${this.#id}`,
                (quantity) => this.handleQuantityChange(quantity)
            );
            contenedorSelectCantidad.appendChild(this.selectCantidad.getElemento());
        }
        // Campo subtotal
        const contenedorCampoSubtotal = this.element.querySelector(`#subtotal-${this.#id}`);
        if (contenedorCampoSubtotal) {
            this.campoSubtotal = new CampoSubtotal(`campo-subtotal-${this.#id}`);
            contenedorCampoSubtotal.appendChild(this.campoSubtotal.getElemento());
        }
        // Botón eliminar
        const contenedorBtnEliminar = this.element.querySelector(`#eliminar-${this.#id}`);
        if (contenedorBtnEliminar && this.#idProducto > 1) {
            this.btnEliminar = new BtnEliminarProducto(
                () => this.handleDelete()
            );
            contenedorBtnEliminar.appendChild(this.btnEliminar.getElemento());
        }
    }

    // Manejar cambios de producto
    actualizarCambioProducto(datosProducto) {
        this.productoSeleccionado = datosProducto;
        this.precioProductoSeleccionado = datosProducto ? datosProducto.precio : 0;
        this.canidadProductoSeleccionado = 0;
        // Actualizar componentes
        this.campoPrecio.setPrecio(this.precioProductoSeleccionado);
        this.selectCantidad.setCantidadMax(datosProducto ? datosProducto.stock : 0);
        this.calcularSubtotal();
        // Notificar al padre
        if (this.#hayCambioProducto) {
            this.#hayCambioProducto(this.#id, datosProducto);
        }
    }

    // Manerjar cambios de cantidad
    manejarCambioCantidad(cantidad) {
        this.canidadProductoSeleccionado = cantidad;
        this.calcularSubtotal();
        // Notificar al padre
        if (this.#hayCambioCantidad) {
            this.#hayCambioCantidad(this.#id, cantidad);
        }
    }

    // Manejar eliminación de producto
    manejarEliminacionProducto() {
        if (this.#hayEliminacion) {
            this.#hayEliminacion(this.#id);
        }
    }

    // Calcular subtotal
    calcularSubtotal() {
        this.subtotalProductoSeleccionado = this.precioProductoSeleccionado * this.canidadProductoSeleccionado;
        this.campoSubtotal.setSubtotal(this.subtotalProductoSeleccionado);
    }

    // Resetear la tarjeta
    reset() {
        this.productoSeleccionado = null;
        this.canidadProductoSeleccionado = 0;
        this.precioProductoSeleccionado = 0;
        this.subtotalProductoSeleccionado = 0;

        if (this.selectProducto) {
            this.selectProducto.reset();
        }
        if (this.campoPrecio) {
            this.campoPrecio.setPrecio(0);
        }
        if (this.selectCantidad) {
            this.selectCantidad.setCantidadMax(0);
        }
        if (this.campoSubtotal) {
            this.campoSubtotal.setSubtotal(0);
        }
    }

    // Eliminar tarjeta
    eliminar() {
        // Limpiar event listeners y eliminar del DOM
        if (this.element && this.element.parentNode) {
            this.element.classList.add('producto-salida');
            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }, 300);
        }
    }
}
