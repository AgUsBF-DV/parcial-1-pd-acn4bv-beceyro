// JS PRINCIPAL

// Importar inicialización de productos
import { inicializarProductos } from './aux/producto.js';
// Importar inicialización de clientes
import { inicializarClientes } from './aux/cliente.js';
// Importar inicializacion de carrito
import { ControladorCarrito } from './aux/ControladorCarrito.js';

// Ejecutar cuando se haya cargado el DOM
document.addEventListener('DOMContentLoaded', async function () {
    console.info('Iniciando el sistema (En modo testing)...');
    console.log();

    // Guardar sesión de usuario
    console.info('Cargando usuario de prueba en sessionStorage...');
    try {
        if (!sessionStorage.getItem('usuario')) {
            sessionStorage.setItem(
                'usuario',
                JSON.stringify({ id: 1, nombre: 'Juan', dni: '12345678' })
            );
        }
    } catch (error) {
        console.error('Error al guardar usuario en sessionStorage:', error);
    }

    // Renderizar usuario en el navbar y en el campo vendedor
    try {
        const sesionUsuario = sessionStorage.getItem('usuario');
        const usuario = sesionUsuario ? JSON.parse(sesionUsuario) : null;

        if (usuario) {
            // Navbar: reemplazar "Nombre Usuario" por el nombre real usando id
            const span = document.getElementById('usuario-navbar');
            if (span) {
                span.textContent = `Bienvenido, ${usuario.nombre}`;
            }
            // Campo vendedor: insertar Nombre (DNI:numero)
            const campoVendedor = document.getElementById('campo-vendedor');
            if (campoVendedor) {
                campoVendedor.textContent = `${usuario.nombre} (DNI:${usuario.dni})`;
            }
        }
        // Configurar link de cerrar sesión: confirmar y limpiar sessionStorage
        try {
            const linkCerrar = document.getElementById('link-cerrar-sesion');
            if (linkCerrar) {
                linkCerrar.addEventListener('click', (evento) => {
                    evento.preventDefault();
                    // Confirmar
                    const confirmado = confirm('¿Desea salir? Se eliminará su sesión actual.');
                    if (confirmado) {
                        // Limpiar sessionStorage
                        try {
                            sessionStorage.removeItem('usuario');
                        } catch (error) {
                            console.warn('No se pudo eliminar sessionStorage.usuario:', error);
                        }
                        // Redirigir a logout
                        location.href = './logout.html';
                    }
                });
            }
        } catch (errorCerrar) {
            console.error('Error al cerrar sesión:', errorCerrar);
        }
    } catch (error) {
        console.error('Error al renderizar el navbar:', error);
    }

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
