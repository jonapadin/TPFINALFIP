import * as readlineSync from 'readline-sync';
import { RedVeterinaria } from './models/RedVeterinaria';
import { Veterinaria } from './models/Veterinaria';
import { Proveedor } from './models/Proveedor';
import { Cliente } from './models/Cliente';
import { Paciente } from './models/Paciente';

// Instancia de RedVeterinaria
const redVeterinaria = new RedVeterinaria([], []);

//Menu
function mostrarMenuPrincipal(): void {
    console.log("\n--- Menú Principal del Gestor ---");
    console.log("1. Gestionar Veterinarias");
    console.log("2. Gestionar Proveedores");
    console.log("0. Salir");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            gestionarVeterinarias();
            break;
        case "2":
            gestionarProveedores();
            break;
        case "0":
            console.log("Saliendo...");
            process.exit(0);
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenuPrincipal();
            break;
    }
}

function gestionarVeterinarias(): void {
    console.log("\n--- Gestión de Veterinarias ---");
    console.log("1. Agregar Veterinaria");
    console.log("2. Modificar Veterinaria");
    console.log("3. Eliminar Veterinaria");
    console.log("4. Gestionar Clientes");
    console.log("5. Gestionar Pacientes");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombre = readlineSync.question("Nombre de la veterinaria: ");
            const direccion = readlineSync.question("Dirección: ");
            const nuevaVeterinaria = new Veterinaria(nombre, direccion);
            redVeterinaria.darAltaVeterinaria(nuevaVeterinaria);
            console.log("Veterinaria agregada con éxito.");
            break;
        case "2":
            const idModificar = parseInt(readlineSync.question("ID de la veterinaria a modificar: "), 10);
            const nuevoNombre = readlineSync.question("Nuevo nombre (dejar vacío para no modificar): ");
            const nuevaDireccion = readlineSync.question("Nueva dirección (dejar vacío para no modificar): ");
            redVeterinaria.modificarVeterinaria(idModificar, nuevoNombre || undefined, nuevaDireccion || undefined);
            console.log("Veterinaria modificada.");
            break;
        case "3":
            const idEliminar = parseInt(readlineSync.question("ID de la veterinaria a eliminar: "), 10);
            redVeterinaria.darBajaVeterinaria(idEliminar);
            console.log("Veterinaria eliminada.");
            break;
        case "4":
            gestionarClientes();
            break;
        case "5":
            gestionarPacientes();
            break;
        case "0":
            mostrarMenuPrincipal();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarVeterinarias();
}

function gestionarProveedores(): void {
    console.log("\n--- Gestión de Proveedores ---");
    console.log("1. Agregar Proveedor");
    console.log("2. Modificar Proveedor");
    console.log("3. Eliminar Proveedor");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombreProveedor = readlineSync.question("Nombre del proveedor: ");
            const telefonoProveedor = parseInt(readlineSync.question("Teléfono: "), 10);
            const nuevoProveedor = new Proveedor(nombreProveedor, telefonoProveedor);
            redVeterinaria.agregarProveedor(nuevoProveedor);
            console.log("Proveedor agregado.");
            break;
        case "2":
            const idProveedorModificar = parseInt(readlineSync.question("ID del proveedor a modificar: "), 10);
            const nuevoNombreProveedor = readlineSync.question("Nuevo nombre (dejar vacío para no modificar): ");
            const nuevoTelefonoProveedor = readlineSync.question("Nuevo teléfono (dejar vacío para no modificar): ");
            redVeterinaria.modificarProveedor(
                idProveedorModificar,
                nuevoNombreProveedor || undefined,
                nuevoTelefonoProveedor ? parseInt(nuevoTelefonoProveedor, 10) : undefined
            );
            console.log("Proveedor modificado.");
            break;
        case "3":
            const idProveedorEliminar = parseInt(readlineSync.question("ID del proveedor a eliminar: "), 10);
            redVeterinaria.eliminarProveedor(idProveedorEliminar);
            console.log("Proveedor eliminado.");
            break;
        case "0":
            mostrarMenuPrincipal();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarProveedores();
}

function gestionarClientes(): void {
    console.log("\n--- Gestión de Clientes ---");

    if (redVeterinaria["veterinarias"].length === 0) {
        console.log("No hay veterinarias disponibles. Agregue una antes de gestionar clientes.");
        return;
    }

    const idVeterinaria = parseInt(readlineSync.question("Ingrese el ID de la veterinaria: "), 10);
    const veterinaria = redVeterinaria["veterinarias"].find(vet => vet.getId() === idVeterinaria);

    if (!veterinaria) {
        console.log("Veterinaria no encontrada.");
        return;
    }

    console.log("1. Agregar Cliente");
    console.log("2. Modificar Cliente");
    console.log("3. Eliminar Cliente");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombreCliente = readlineSync.question("Nombre del cliente: ");
            const telefonoCliente = parseInt(readlineSync.question("Teléfono del cliente: "), 10);
            const nuevoCliente = new Cliente(nombreCliente, telefonoCliente);
            veterinaria.agregarCliente(nuevoCliente);
            console.log("Cliente agregado con éxito.");
            break;
        case "2":
            const idCliente = parseInt(readlineSync.question("ID del cliente a modificar: "), 10);
            const nuevoNombreCliente = readlineSync.question("Nuevo nombre (dejar vacío para no modificar): ");
            const nuevoTelefonoCliente = readlineSync.question("Nuevo teléfono (dejar vacío para no modificar): ");
            veterinaria.modificarCliente(
                idCliente,
                nuevoNombreCliente || undefined,
                nuevoTelefonoCliente ? parseInt(nuevoTelefonoCliente, 10) : undefined
            );
            console.log("Cliente modificado con éxito.");
            break;
        case "3":
            const idClienteEliminar = parseInt(readlineSync.question("ID del cliente a eliminar: "), 10);
            veterinaria.eliminarCliente(idClienteEliminar);
            console.log("Cliente eliminado con éxito.");
            break;
        case "0":
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarClientes();
}

function gestionarPacientes(): void {
    console.log("\n--- Gestión de Pacientes ---");

    if (redVeterinaria["veterinarias"].length === 0) {
        console.log("No hay veterinarias disponibles. Agregue una antes de gestionar pacientes.");
        return;
    }

    const idVeterinaria = parseInt(readlineSync.question("Ingrese el ID de la veterinaria: "), 10);
    const veterinaria = redVeterinaria["veterinarias"].find(vet => vet.getId() === idVeterinaria);

    if (!veterinaria) {
        console.log("Veterinaria no encontrada.");
        return;
    }

    console.log("1. Agregar Paciente");
    console.log("2. Modificar Paciente");
    console.log("3. Eliminar Paciente");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombrePaciente = readlineSync.question("Nombre del paciente: ");
            const especiePaciente = readlineSync.question("Especie del paciente (Perro, Gato u otra): ");
            const idDuenio = parseInt(readlineSync.question("ID del dueño del paciente: "), 10);
            const nuevoPaciente = new Paciente(nombrePaciente, especiePaciente, idDuenio);
            veterinaria.agregarPaciente(nuevoPaciente);
            console.log("Paciente agregado con éxito.");
            break;
        case "2":
            const idDuenioPaciente = parseInt(readlineSync.question("ID del dueño del paciente a modificar: "), 10);
            const nuevoNombrePaciente = readlineSync.question("Nuevo nombre (dejar vacío para no modificar): ");
            const nuevaEspeciePaciente = readlineSync.question("Nueva especie (dejar vacío para no modificar): ");
            veterinaria.modificarPaciente(
                idDuenioPaciente,
                nuevoNombrePaciente || undefined,
                nuevaEspeciePaciente || undefined
            );
            console.log("Paciente modificado con éxito.");
            break;
        case "3":
            const idPacienteEliminar = parseInt(readlineSync.question("ID del dueño del paciente a eliminar: "), 10);
            veterinaria.eliminarPaciente(idPacienteEliminar);
            console.log("Paciente eliminado con éxito.");
            break;
        case "0":
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarPacientes();
}

// Inicia la aplicación
mostrarMenuPrincipal();