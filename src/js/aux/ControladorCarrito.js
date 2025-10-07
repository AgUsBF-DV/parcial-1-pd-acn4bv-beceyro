// Importar clases/funciones necesarias
import { CardProducto } from '../components/CardProducto.js';
import { CampoTotal } from '../components/CampoTotal.js';
import { Venta } from '../model/venta.js';
import { obtenerProductosDisponibles } from './producto.js';

export class ControladorCarrito {

    // Valores predefinidos
    #idFormulario = 'formulario-venta';
    #idSelectCliente = 'select-cliente';
    #idCampoVendedor = 'campo-vendedor';
    // Atributos
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
    constructor(productosDisponibles) {
        this.#productosDisponibles = productosDisponibles;
        // Setup
        // Obtener elementos del DOM
        this.#contenedor = document.getElementById('contenedor-productos');
        this.#btnAgregarProducto = document.getElementById('btn-agregar-producto');
        this.#despliegueTotal = document.getElementById('campo-total-carrito');
        // Validar elementos
        if (!this.#contenedor || !this.#btnAgregarProducto || !this.#despliegueTotal) {
            throw new Error('No se encontraron todos los elementos DOM necesarios');
        }
        this.#campoTotal = new CampoTotal(0);
        try {
            this.#despliegueTotal.replaceWith(this.#campoTotal.getElemento());
        } catch (error) {
            console.error('Error en el setup del controlador del carrito:', error);
        }
        // Configurar eventos
        this.#agregarListener();
        // Agregar primera tarjeta de producto
        this.#agregarTarjetaProducto();
    }

    // Inicializador 
    static async inicializarCarrito() {
        console.info('Iniciando carrito...');
        // Obtener productos disponibles
        const productosDisponibles = await obtenerProductosDisponibles();
        if (!productosDisponibles || productosDisponibles.length === 0) {
            console.error('No hay productos disponibles');
            return null;
        }
        // Instanciar el controlador
        const controlador = new ControladorCarrito(productosDisponibles);
        console.log('Controlador del carrito inicializado');
    }

    // Cargar listener de click
    #agregarListener() {
        // Click para agregar producto
        this.#btnAgregarProducto.addEventListener('click', () => this.#agregarTarjetaProducto());
        // Submit del formulario de venta
        const formulario = document.getElementById(this.#idFormulario);
        if (formulario) {
            formulario.addEventListener('submit', (evento) => this.enviarFormulario(evento));
        }
    }

    // Lógica de manejo del submit (extraída del inicializador estático)
    enviarFormulario(evento) {
        evento.preventDefault();
        try {
            const selectCliente = document.getElementById(this.#idSelectCliente);
            const clienteId = selectCliente ? selectCliente.value : '';
            const vendedorEl = document.getElementById(this.#idCampoVendedor);
            const vendedor = vendedorEl ? vendedorEl.textContent.trim() : '';
            try {
                this.procesarVenta(clienteId, vendedor);
                alert('Venta guardada correctamente en localStorage');
                console.log('Venta procesada:', { datos: this.getDatosVenta() });
                // Limpiar formulario y resetear el carrito visual y su estado
                const formulario = document.getElementById('formulario-venta');
                if (formulario) {
                    formulario.reset();
                }
                try {
                    this.reset();
                } catch (errorReset) {
                    console.warn('No se pudo resetear el controlador:', errorReset);
                }
            } catch (errorProcesar) {
                console.error('Error al procesar la venta:', errorProcesar);
            }
        } catch (errorSubmit) {
            console.error('Error en el submit del formulario de venta:', errorSubmit);
            alert('Ocurrió un error al guardar la venta');
        }
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

    // Resetear el carrito: eliminar tarjetas, reiniciar contadores y total
    reset() {
        // Eliminar elementos del DOM del contenedor
        try {
            if (this.#contenedor) {
                // Remover todos los hijos
                while (this.#contenedor.firstChild) {
                    this.#contenedor.removeChild(this.#contenedor.firstChild);
                }
            }
        } catch (error) {
            console.warn('Error en reset() del carrito:', error);
        }
        // Resetear estado interno
        this.#tarjetasProductos.clear();
        this.#contadorProductos = 0;
        this.#totalVenta = 0;
        // Actualizar vista del total
        if (this.#campoTotal) {
            this.#campoTotal.setValor(0);
        } else if (this.#despliegueTotal) {
            this.#despliegueTotal.textContent = '0';
        }
        // Agregar la tarjeta inicial para nueva venta
        this.#agregarTarjetaProducto();
    }

    // Obtener datos listos para la venta
    getDatosVenta() {
        const items = [];
        for (const [cardId, card] of this.#tarjetasProductos) {
            const datosProducto = card.getDatosProducto();
            // Ignorar tarjetas sin producto seleccionado o cantidad 0
            if (!datosProducto.productoId || datosProducto.cantidad <= 0) {
                continue;
            }
            items.push({
                productoId: datosProducto.productoId,
                nombre: datosProducto.productoNombre,
                precio: datosProducto.precio,
                cantidad: datosProducto.cantidad,
                subtotal: datosProducto.subtotal
            });
        }
        return {
            items: items,
            total: this.#totalVenta
        };
    }

    // Procesar y guardar la venta (valida datos y usa el modelo Venta)
    procesarVenta(clienteId, vendedor) {
        // Validaciones básicas
        if (!clienteId) {
            throw new Error('Seleccione un cliente antes de confirmar la venta.');
        }
        const datos = this.getDatosVenta();
        if (!datos.items || datos.items.length === 0) {
            throw new Error('Agregue al menos un producto con cantidad mayor a 0.');
        }
        // Crear venta y guardar
        const nuevaVenta = new Venta(clienteId, vendedor, datos.items, datos.total);
        Venta.guardar(nuevaVenta);
        // return nuevaVenta;
    }
}
