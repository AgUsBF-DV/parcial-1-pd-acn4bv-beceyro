// Importar clases/funciones necesarias
import { obtenerProductosDisponibles } from './producto.js';
import { CartManager } from '../components/CartManager.js';

// Variables globales
let cartManager = null;

// Inicializar compoentes
async function inicializarCarrito() {
    console.info('Iniciando carrito...');
    try {
        // Obtener productos disponibles
        const productosDisponibles = await obtenerProductosDisponibles();
        // Validar si hay productos
        if (productosDisponibles.length === 0) {
            console.error('No hay productos disponibles');
            return;
        }
        // Crear el gestor del carrito
        cartManager = new CartManager(
            'contenedor-productos',
            'btn-agregar-producto',
            'campo-total-carrito',
            productosDisponibles
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
