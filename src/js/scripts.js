// JS PRINCIPAL

// Importar funciones desde aux/producto.js
import {
    inicializarDatos,
    limpiarDatos,
    resetearDatos,
    obtenerProductos,
    obtenerProductosDisponibles,
    mostrarProductosEnConsola,
} from './aux/producto.js';

// Importar funciones desde aux/carrito.js
import {
    inicializarCarrito
} from './aux/carrito.js';

// Variable para pruebas y mensajes en consola
const DEBUG_MODE = true;

// Ejecutar cuando se haya cargado el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log();
    console.log('Iniciando el sistema...');
    console.log();

    // Si estamos testeando, borrar datos almacenados
    if (DEBUG_MODE) {
        console.log('DEBUG_MODE activado');
        console.log('Vaciando datos...');
        limpiarDatos();
        console.log();
    }

    // Inicialización de datos de prueba en localStorage
    inicializarDatos();
    console.log();

    // Inicialización del carrito
    inicializarCarrito();
    console.log();

    // Sistema listo
    console.log('Sistema inicializado');
    console.log();
});