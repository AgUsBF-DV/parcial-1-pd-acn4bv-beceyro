// JS PRINCIPAL

// Importar funciones desde aux/producto.js
import { resetearDatos } from './aux/producto.js';
// Importar funciones desde aux/carrito.js
import { inicializarCarrito } from './aux/carrito.js';

// Variable para pruebas y mensajes en consola
const DEBUG_MODE = false;

// Ejecutar cuando se haya cargado el DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log();
    console.info('Iniciando el sistema...');

    // Si estamos testeando,
    if (DEBUG_MODE) {
        console.warn('DEBUG_MODE activado');
    }

    // Inicialización de datos de prueba en localStorage
    resetearDatos();

    // Inicialización del carrito
    inicializarCarrito();
    console.log();

    // Sistema listo
    console.info('Sistema inicializado');
    console.log();
});