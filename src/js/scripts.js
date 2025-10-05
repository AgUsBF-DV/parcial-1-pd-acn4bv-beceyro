// JS principal

// Importar funciones desde aux.js
import {
    inicializarDatos,
    limpiarDatos,
    resetearDatos,
    obtenerProductos,
    obtenerProductosDisponibles,
    mostrarProductosEnConsola,
} from './aux/producto.js';

// Variable para pruebas y mensajes en consola
const DEBUG_MODE = true;

// Inicio
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

// Inicializacion de datos de prueba en localStorage
inicializarDatos();
console.log();

if (DEBUG_MODE) {
    console.log('Modo DEBUG activado');
    console.log();

    // Mostrar TODOS los productos en consola
    // console.log('Listado de TODOS los Productos:');
    // mostrarProductosEnConsola(obtenerProductos());
    // console.log();

    // Mostrar solo productos con stock > 0
    // console.log('Listado de los Productos con stock > 0:');
    // mostrarProductosEnConsola(obtenerProductosDisponibles());
    // console.log();

    // Resetear datos de prueba
    // console.log('Reseteando datos de prueba...');
    // resetearDatos();
    // console.log();

    
}

// Sistema listo
console.log('Sistema listo.');
console.log();