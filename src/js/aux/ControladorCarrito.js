// Importar clases/funciones necesarias
import { CardProducto } from '../components/CardProducto.js';
import { CampoTotal } from '../components/CampoTotal.js';

export class ControladorCarrito {

    // Atributos
    #idContenedor;
    #idBtnAgregarProducto;
    #idCampoTotal;
    #productosDisponibles;
    // Estado del carrito
    #tarjetasProductos = new Map();
    #contadorProductos = 0;
    #totalVenta = 0;
    // Elementos DOM
    #contenedor = null;
    #btnAgregarProducto = null;
    #despliegueTotal = null;
    #campoTotal = null;

    // Constructor
    constructor(idContenedor, idBtnAgregarProducto, idCampoTotal, productosDisponibles) {
        this.#idContenedor = idContenedor;
        this.#idBtnAgregarProducto = idBtnAgregarProducto;
        this.#idCampoTotal = idCampoTotal;
        this.#productosDisponibles = productosDisponibles;

        // Inicializar
        this.inicializarControladorCarrito();
    }

    // Inicializar el gestor del carrito
    inicializarControladorCarrito() {
        // Obtener elementos del DOM
        this.#contenedor = document.getElementById(this.#idContenedor);
        this.#btnAgregarProducto = document.getElementById(this.#idBtnAgregarProducto);
        this.#despliegueTotal = document.getElementById(this.#idCampoTotal);
        // Validar elementos
        if (!this.#contenedor || !this.#btnAgregarProducto || !this.#despliegueTotal) {
            throw new Error('No se encontraron todos los elementos DOM necesarios');
        }
        // Crear y montar componente CampoTotal usando su API pública
        this.#campoTotal = new CampoTotal(0);
        try {
            document.getElementById(this.#idCampoTotal).replaceWith(this.#campoTotal.getElemento());
        } catch (error) {
            console.error('Error en inicializarControladorCarrito()):', error);
        }
        // Configurar eventos
        this.#agregarListener();
        // Agregar primera tarjeta de producto
        this.#agregarTarjetaProducto();
        console.log('ControladorCarrito inicializado correctamente');
    }

    // Cargar listener de click
    #agregarListener() {
        this.#btnAgregarProducto.addEventListener('click', () => this.#agregarTarjetaProducto());
    }

    // Agregar nueva tarjeta de producto
    #agregarTarjetaProducto() {
        // Actualizar contador y cardId
        this.#contadorProductos++;
        const cardId = `producto-${this.#contadorProductos}`;
        // Crear nueva tarjeta
        const cardProducto = new CardProducto(
            cardId,
            this.#contadorProductos,
            this.#productosDisponibles,
            (id, productData) => this.actualizarCambioProducto(id, productData),
            (id, quantity) => this.manejarCambioCantidad(id, quantity),
            (id) => this.manejarEliminacionProducto(id)
        );
        // Agregar al contenedor
        this.#contenedor.appendChild(cardProducto.element);
        // Guardar referencia
        this.#tarjetasProductos.set(cardId, cardProducto);
    }

    // Manejar cambios de producto en la tarjeta
    actualizarCambioProducto(cardId, productData) {
        // Verificar si el producto ya está seleccionado en otra tarjeta
        if (productData && this.estaProductoSeleccionado(cardId, productData.id)) {
            alert('Este producto ya está agregado al carrito.');
            // Resetear la tarjeta
            const tarjeta = this.#tarjetasProductos.get(cardId);
            if (tarjeta) {
                tarjeta.reset();
            }
            return;
        }
        // Recalcular total
        this.calcularTotal();
    }

    // Manerjar cambios de cantidad en la tarjeta
    manejarCambioCantidad() {
        this.calcularTotal();
    }

    // Manejar eliminación de una tarjeta
    manejarEliminacionProducto(cardId) {
        const tarjeta = this.#tarjetasProductos.get(cardId);
        if (tarjeta) {
            // Eliminar la tarjeta
            tarjeta.eliminar();
            // Eliminar de la colección
            this.#tarjetasProductos.delete(cardId);
            // Recalcular total
            this.calcularTotal();
        }
    }

    // Verificar en todas las tarjetas, excepto en la actual, si un producto ya está seleccionado
    estaProductoSeleccionado(idTarjeta, idProducto) {
        for (const [cardId, card] of this.#tarjetasProductos) {
            if (cardId !== idTarjeta) {
                const datosProducto = card.getDatosProducto();
                if (datosProducto.productoId === idProducto) {
                    return true;
                }
            }
        }
        return false;
    }

    // Calcular totales
    calcularTotal() {
        this.#totalVenta = 0;
        // Calclar
        for (const [cardId, card] of this.#tarjetasProductos) {
            const datosProducto = card.getDatosProducto();
            this.#totalVenta += datosProducto.subtotal;
        }
        // Actualizar valor mostrado
        if (this.#campoTotal) {
            this.#campoTotal.setValor(this.#totalVenta);
        } else if (this.#despliegueTotal) {
            this.#despliegueTotal.textContent = this.#totalVenta;
        }
    }
}
