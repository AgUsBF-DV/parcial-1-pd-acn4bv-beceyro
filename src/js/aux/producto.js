// Importar clases/funciones necesarias
import { Producto } from '../model/producto.js';

// Key para localStorage
const key_productos = 'productos_vivero';

// Lista de objetos Producto
let productos = [];

// Datos de prueba: 10 productos (plantas)
const datosProductosPrueba = [
    { id: 1, nombre: "Rosa", nombreCientifico: "Rosa gallica", precio: 12500, stock: 15 },
    { id: 2, nombre: "Cactus", nombreCientifico: "Echinopsis chamaecereus", precio: 8000, stock: 8 },
    { id: 3, nombre: "Helecho", nombreCientifico: "Nephrolepis exaltata", precio: 18000, stock: 12 },
    { id: 4, nombre: "Begonia", nombreCientifico: "Begonia semperflorens", precio: 9500, stock: 20 },
    { id: 5, nombre: "Jazmín", nombreCientifico: "Jasminum officinale", precio: 8000, stock: 6 },
    { id: 6, nombre: "Suculenta", nombreCientifico: "Crassula ovata", precio: 1200, stock: 0 },
    { id: 7, nombre: "Lavanda", nombreCientifico: "Lavandula angustifolia", precio: 15800, stock: 14 },
    { id: 8, nombre: "Orquídea", nombreCientifico: "Phalaenopsis amabilis", precio: 14500, stock: 5 },
    { id: 9, nombre: "Pothos", nombreCientifico: "Epipremnum aureum", precio: 19700, stock: 1 },
    { id: 10, nombre: "Geranio", nombreCientifico: "Pelargonium graveolens", precio: 17200, stock: 11 }
];

// Cargar datos de prueba en localStorage
async function inicializarProductos() {
    console.info('Inicializando datos de prueba...');
    try {
        // Limpiar datos existentes
        limpiarProductos();
        // Buscar datos en localStorage
        const productosGuardados = localStorage.getItem(key_productos);
        // Verificar si se encontraron datos guardados
        if (!productosGuardados) {
            console.log('No se encontraron datos en localStorage');
            console.log('Guardando datos de prueba...');
            // Cargar lista de objetos Producto
            productos = datosProductosPrueba.map(dato =>
                new Producto(dato.id, dato.nombre, dato.nombreCientifico, dato.precio, dato.stock)
            )
            // Guardar productos en localStorage
            guardarProductos(productos);
        } else {
            console.log('Existen datos guardados en localStorage >> Cargando datos');
            traerProductos();
        }
    } catch (error) {
        console.error('Error en inicializarDatos():', error);
    }
}
// Guardar productos en localStorage
function guardarProductos(productos) {
    try {
        localStorage.setItem(key_productos, JSON.stringify(productos));
        console.log('Productos guardados en localStorage');
    } catch (error) {
        console.error('Error en guardarProductos():', error);
    }
}

// Traer productos de localStorage
function traerProductos() {
    try {
        // Buscar datos en localStorage
        const productosGuardados = localStorage.getItem(key_productos);
        // Verificar si se encontraron datos guardados
        if (productosGuardados) {
            // Parsear datos JSON
            const productosArray = JSON.parse(productosGuardados);
            // Cargar lista de objetos Producto
            productos = productosArray.map(dato =>
                new Producto(dato.id, dato.nombre, dato.nombreCientifico, dato.precio, dato.stock)
            );
            console.log('Productos cargados desde localStorage');
        }
    } catch (error) {
        console.error('Error en traerProductos():', error);
    }
}

// Vaciar localStorage
function limpiarProductos() {
    console.log('Limpiando datos pre-existentes...');
    localStorage.removeItem(key_productos);
    productos = [];
    console.log('localStorage reseteado');
}

// Obtener lista de los productos con stock > 0
async function obtenerProductosDisponibles() {
    return productos.filter(producto => producto.estaDisponible());
}

// Exportar las funciones que necesitas usar en otros archivos
export {
    inicializarProductos,
    obtenerProductosDisponibles,
};
