// Importar clases/funciones necesarias
import { obtenerProductosDisponibles } from './producto.js';

// Variables globales
let productosDisponibles = [];
let carritoItems = [];
let totalVenta = 0;

// Elementos del DOM
let selectNombre;
let campoPrecio;
let selectCantidad;
let campoSubtotal;
let campoTotal;

// Función para inicializar el carrito
function inicializarCarrito() {
    console.log('Inicializando carrito...');
    // Obtener elementos del DOM
    selectNombre = document.getElementById('select-nombre-producto');
    campoPrecio = document.getElementById('campo-precio-producto');
    selectCantidad = document.getElementById('select-cantidad-producto');
    campoSubtotal = document.getElementById('campo-subtotal-producto');
    campoTotal = document.getElementById('campo-total-carrito');
    // Verificar que los elementos existan
    if (!selectNombre || !selectCantidad || !campoPrecio || !campoSubtotal || !campoTotal) {
        console.error('No se encontraron todos los elementos del DOM');
        return false;
    }
    // Cargar productos en el dropdown
    cargarProductosEnSelect();
    // Configurar event listeners
    configurarEventListeners();

    console.log('Interfaz del carrito inicializada correctamente');
    return true;
}

// Cargar productos disponibles en el dropdown
function cargarProductosEnSelect() {
    // Obtener productos con stock > 0
    productosDisponibles = obtenerProductosDisponibles();
    // Validar si hay productos disponibles
    if (productosDisponibles.length === 0) {
        console.error('No hay productos disponibles');
        return;
    }
    // Agregar productos al select
    productosDisponibles.forEach(producto => {
        // Crear elemento option
        const option = document.createElement('option');
        // Cargar el id
        option.value = producto.id;
        // Cargar el texto
        option.textContent = `${producto.nombre} (${producto.nombreCientifico}) - ID:${producto.id}`;
        // Cargar datos
        option.dataset.precio = producto.precio;
        option.dataset.stock = producto.stock;
        // Agregar al select
        selectNombre.appendChild(option);
    });

    console.log(`${productosDisponibles.length} productos cargados en select`);
}

// Configurar listeners
function configurarEventListeners() {
    // Evento cambio de producto
    selectNombre.addEventListener('change', actualizarCambioProducto);
    // Evento cambio de cantidad
    selectCantidad.addEventListener('change', actualizarCambioCantidad);

    console.log('Listeners configurados');
}

// Cambio de producto seleccionado
function actualizarCambioProducto(event) {
    const opcion = event.target.options[event.target.selectedIndex];
    // Validar si hay producto seleccionado
    if (opcion.value === '') {
        resetearCampos();
        return;
    }
    // Obtener datos del producto
    const precio = parseFloat(opcion.dataset.precio);
    const stock = parseInt(opcion.dataset.stock);

    console.log(`Producto seleccionado > ${opcion.textContent}`);

    // Actualizar campo precio
    campoPrecio.textContent = precio;
    // Actualizar opciones del select cantidad
    actualizarOpcionesCantidad(stock);
    // Calcular subtotal
    calcularSubtotal();
}

// Cambio de cantidad
function actualizarCambioCantidad(event) {
    console.log(`Cantidad seleccionada: ${event.target.value}`);
    calcularSubtotal();
}

// Generar opciones de cantidad
function actualizarOpcionesCantidad(stock) {
    // Limpiar opciones existentes
    selectCantidad.innerHTML = '';
    // Generar opciones
    for (let i = 0; i <= stock; i++) {
        // Crear elemento option
        const option = document.createElement('option');
        // Cargar el valor
        option.value = i;
        // Cargar el texto
        option.textContent = i === 0 ? '0' : `${i} unidad${i > 1 ? 'es' : ''}`;
        // Agregar al select
        selectCantidad.appendChild(option);
    }

    console.log(`Opciones de cantidad generadas: 0 - ${stock}`);
}

// Calcular y mostrar subtotal
function calcularSubtotal() {
    // Valores del select
    const producto = selectNombre.options[selectNombre.selectedIndex];
    const cantidad = parseInt(selectCantidad.value) || 0;
    // Validar selección
    if (producto.value === '' || cantidad === 0) {
        campoSubtotal.textContent = '0';
        actualizarTotalCarrito(0);
        return;
    }
    // Recuperar datos
    const precio = parseFloat(producto.dataset.precio);
    const subtotal = precio * cantidad;
    // Setear subtotal
    campoSubtotal.textContent = subtotal;
    // Actualizar total del carrito
    actualizarTotalCarrito(subtotal);

    console.log(`Subtotal calculado: $${subtotal} (${cantidad} x $${precio})`);
}

// Actualizar total del carrito
function actualizarTotalCarrito(subtotal) {
    // con un solo item en el carrito
    totalVenta = subtotal;
    campoTotal.textContent = totalVenta;
}

// Resetear todos los campos
function resetearCampos() {
    // Reset precio
    campoPrecio.textContent = '0';
    // Resetear cantidad a solo opción 0
    selectCantidad.innerHTML = '<option value="0">0</option>';
    // Reset subtotal
    campoSubtotal.textContent = '0';
    // Resetear total
    actualizarTotalCarrito(0);

    console.log('Campos reseteados');
}

// Exportar funciones principales
export {
    inicializarCarrito,
    cargarProductosEnSelect as cargarProductosEnDropdown,
    resetearCampos,
    configurarEventListeners
};
