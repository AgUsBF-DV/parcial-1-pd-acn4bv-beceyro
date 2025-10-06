// Importar clases/funciones necesarias
import { Cliente } from '../model/cliente.js';

// Key para localStorage
const key_clientes = 'clientes_vivero';

// Lista en memoria
let clientes = [];

// Construir la URL para un id
function urlCliente(id) {
    return `https://jsonplaceholder.typicode.com/users/${id}`;
}

// Mapear respuesta API
function mapApiToCliente(rtaAPI) {
    if (!rtaAPI || !rtaAPI.id) {
        return null;
    }
    const id = rtaAPI.id;
    const nombreCompleto = rtaAPI.name || '';
    const email = rtaAPI.email || '';
    const street = rtaAPI.address && rtaAPI.address.street ? rtaAPI.address.street : '';
    const suite = rtaAPI.address && rtaAPI.address.suite ? rtaAPI.address.suite : '';
    const city = rtaAPI.address && rtaAPI.address.city ? rtaAPI.address.city : '';
    const direccion = `${street}, ${suite}, ${city}`.trim();
    const telefono = rtaAPI.phone || '';

    return new Cliente(id, nombreCompleto, email, direccion, telefono);
}

// Inicializar
async function inicializarClientes() {
    console.info('Inicializando clientes de la API...');
    try {
        // Limpiar datos existentes
        limpiarClientes();
        // Hacer request a la API buscando 10 clientes
        const requests = [];
        for (let i = 1; i <= 10; i++) {
            requests.push(
                fetch(urlCliente(i))
                    .then(respuesta => {
                        if (!respuesta.ok) {
                            throw new Error(`HTTP ${respuesta.status}`);
                        }
                        return respuesta.json();
                    })
                    .catch(error => {
                        console.error(`Error con el cliente ${i}:`, error.message);
                        return null;
                    })
            );
        };
        // Evaluar resultados
        const resultados = await Promise.all(requests);
        resultados.forEach(consulta => {
            const cliente = mapApiToCliente(consulta);
            if (cliente) {
                clientes.push(cliente);
            }
        });
        // Verificar si se cargaron clientes
        if (clientes.length === 0) {
            console.warn('No se cargó ningún cliente desde la API');
            return;
        }
        // Guardarlos en localStorage
        guardarClientes(clientes);
        // Poblar el select
        poblarSelectClientes();
    } catch (error) {
        console.error('Error en inicializarClientes():', error);
    }
}

// Poblar el select
function poblarSelectClientes(selectId = 'select-cliente') {
    try {
        const select = document.getElementById(selectId);
        if (!select) {
            return false;
        }
        // Limpiar opciones excepto la primera
        while (select.options.length > 1) {
            select.remove(1);
        }
        clientes.forEach(cliente => {
            const opcion = document.createElement('option');
            opcion.value = cliente.getId();
            opcion.textContent = cliente.armarLabel();
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error('Error en poblarSelectClientes():', error);
    }
}

// Guardar clientes en localStorage
function guardarClientes(clientes) {
    try {
        localStorage.setItem(key_clientes, JSON.stringify(clientes));
        console.log(`Clientes guardados en localStorage`);
    } catch (error) {
        console.error('Error en guardarClientes():', error);
    }
}

// Traer clientes desde localStorage
function traerClientes() {
    try {
        // Buscar datos en localStorage
        const clientesGuardados = localStorage.getItem(key_clientes);
        // Verificar si se encontraron datos guardados
        if (clientesGuardados) {
            // Parsear datos JSON
            const clientesArray = JSON.parse(clientesGuardados);
            // Cargar lista de objetos Cliente
            clientes = clientesArray.map(dato =>
                new Cliente(dato.id, dato.nombreCompleto, dato.email, dato.direccion, dato.telefono)
            );
            console.log(`Clientes cargados desde localStorage`);
        }
    } catch (error) {
        console.error('Error en traerClientes():', error);
    }
}

// Vaciar localStorage
function limpiarClientes() {
    console.log('Limpiando datos pre-existentes...');
    localStorage.removeItem(key_clientes);
    clientes = [];
    console.log('localStorage reseteado');
}

// Exportar funciones
export {
    inicializarClientes,
};
