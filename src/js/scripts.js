// JS PRINCIPAL

// Importar inicialización de productos
import { inicializarProductos } from './aux/producto.js';
// Importar inicialización de clientes
import { inicializarClientes } from './aux/cliente.js';
// Importar inicializacion de carrito
import { ControladorCarrito } from './aux/ControladorCarrito.js';

// Ejecutar cuando se haya cargado el DOM
document.addEventListener('DOMContentLoaded', async function () {
    console.log();
    console.info('Iniciando el sistema...');

    // Inicialización de datos de productos en localStorage
    try {
        await inicializarProductos();
    } catch (error) {
        console.error('Error al inicializar datos de productos:', error);
    }

    // Inicialización de clientes
    try {
        await inicializarClientes();
    } catch (error) {
        console.error('Error al inicializar clientes desde la API:', error);
    }

    // Inicialización del carrito
    try {
        await ControladorCarrito.inicializarCarrito();
    } catch (error) {
        console.error('Error al inicializar el carrito:', error);
    }

    // Sistema listo
    console.log();
    console.info('Sistema inicializado');
    console.log();
});