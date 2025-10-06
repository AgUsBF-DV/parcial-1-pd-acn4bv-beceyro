# Informe: Gestor interno para Vivero Da Vinci

Este documento resume la propuesta del proyecto "Vivero Da Vinci" y describe las pantallas, las funcionalidades y los flujos de uso principales para una aplicación de gestión de ventas e inventario. El trabajo actual incluye una muestra semifuncional (Carrito de Venta) como demostración.

## Resumen

Vivero Da Vinci es una aplicación web orientada a digitalizar las operaciones de venta y el control de stock de un vivero. El prototipo actual implementa un carrito de ventas con componentes reutilizables, persistencia en localStorage y consumo de datos externos (clientes). El objetivo es extender las funcionalidades hacia inventario, clientes, reportes y gestión de usuarios.

## Pantallas principales

- Panel de acceso (login) para ingresar a la plataforma.
- Dashboard con acceso a los módulos de la plataforma (usuarios, clientes, productos, categorías, etc.).
- Visualización y edición del perfil de usuario.
- Visualización de reportes de ventas.
- Panel de administración para editar roles y permisos de empleados.
- Panel de visualización y formularios para ABM. Se incluirá una vista en tablas para mostrar los registros y formularios para alta/edición de:
  - Clientes
  - Empleados
  - Categorías
  - Marcas
  - Productos
  - Ventas

## Funcionalidades y flujos esperados

### Flujo de ventas

- Ingreso al sistema mediante el control de acceso.
- Acceder al módulo de ventas.
- Seleccionar cliente (o usar un cliente por defecto).
- Agregar productos.
- Seleccionar cantidad.
- Validar stock.
- Mostrar subtotales y total.
- Repetir los pasos anteriores por cada producto a cargar.
- Confirmar la venta.
- Registrar la venta.
- Descontar el stock correspondiente.

### Flujo de gestión de registros (ABM: cliente/empleado/categoría/marca/producto)

- Ingreso al sistema mediante el control de acceso.
- Acceder al módulo correspondiente (cliente/empleado/categoría/marca/producto).
- Mostrar una tabla con los registros.
- Seleccionar el botón de editar registro o el botón de nuevo para dar de alta.
- Completar los datos del formulario correspondiente.
- Validar campos.
- Confirmar la operación.
- Registrar la operación.

### Flujo para editar información personal

- Ingreso al sistema mediante el control de acceso.
- Acceder a la sección de información personal.
- Se mostrará un formulario con los datos actuales.
- Editar los campos que se deseen modificar.
- Validar los datos.
- Confirmar la operación.
- Registrar la actualización.

### Flujo para generación de reportes de ventas

- Ingreso al sistema mediante el control de acceso.
- Acceder al módulo de reportes.
- Se mostrará una tabla con los registros y opciones de filtrado.
- Aplicar filtros según la información que se desee consultar.
