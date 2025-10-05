// Importar clases/funciones necesarias
import { obtenerProductosDisponibles } from './producto.js';
import { CartManager } from '../components/CartManager.js';

// Variables globales
let cartManager = null;

// Inicializar compoentes
function inicializarCarrito() {
    console.info('Iniciando carrito...');
    try {
        // Obtener productos disponibles
        const productosDisponibles = obtenerProductosDisponibles();
        
        if (productosDisponibles.length === 0) {
            console.error('No hay productos disponibles');
            return;
        }
        // Crear el gestor del carrito
        cartManager = new CartManager(
            'contenedor-productos',    // ID del contenedor
            'btn-agregar-producto',    // ID del botón agregar
            'campo-total-carrito',     // ID del display de total
            productosDisponibles       // Array de productos
        );      
        console.log('Carrito inicializado');
    } catch (error) {
        console.error('Error al inicializar carrito:', error);
    }
}

// Exportar funciones principales
export {
    inicializarCarrito,
};
