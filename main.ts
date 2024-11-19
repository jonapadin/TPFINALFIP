import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { RedVeterinaria } from './models/RedVeterinaria';
import { Veterinaria } from './models/Veterinaria';
import { Proveedor } from './models/Proveedor';
import { Cliente } from './models/Cliente';
import { Paciente } from './models/Paciente';


const redVeterinaria = new RedVeterinaria();
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
            process.exit();
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
            // Agregar veterinaria a la red
            redVeterinaria.darAltaVeterinaria(nuevaVeterinaria);

            if (redVeterinaria.getVeterinarias().some(vet => vet.getId() === nuevaVeterinaria.getId())) {
                console.log("Veterinaria agregada correctamente.");
                console.log("Veterinarias en la red después de agregar:", redVeterinaria.getVeterinarias());

                const siguienteOpcion = readlineSync.question("¿Deseas gestionar clientes o pacientes para esta veterinaria? (c: clientes, p: pacientes, 0: volver): ");

                if (siguienteOpcion === "c") {
                    gestionarClientes(nuevaVeterinaria);  // Si elige 'c', gestionar clientes para esta veterinaria
                } else if (siguienteOpcion === "p") {
                    gestionarPacientes();  // Si elige 'p', gestionar pacientes para esta veterinaria
                } else if (siguienteOpcion === "0") {
                    gestionarVeterinarias();  // Volver al menú principal de veterinarias
                }
            } else {
                console.log("Error al agregar la veterinaria. Intenta de nuevo.");
            }



            break;
        case "2":
            const buscar = readlineSync.questionInt("ID de la veterinaria a actualizar:");
            const nuevoNombre = readlineSync.question("Nuevo nombre:");
            const nuevaDireccion = readlineSync.question("Nueva direccion:");
            redVeterinaria.modificarVeterinaria(buscar,nuevoNombre,nuevaDireccion);
            console.log("Lista actualizada:", redVeterinaria.getVeterinarias());
            break;
        case "3":
            const buscarId = readlineSync.questionInt("ID de la veterinaria a eliminar:")
            redVeterinaria.darBajaVeterinaria(buscarId);
            console.log("Lista actualizada:", redVeterinaria.getVeterinarias());
            break

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
    console.log("1. Agregar Proveedores");
    console.log("2. Modificar Proveedores");
    console.log("3. Eliminar Proveedores");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombreProveedor= readlineSync.question("Nombre del proveedor: ");
            const Telefono  = readlineSync.question("Telefono: ");
            const proveedor1 = new Proveedor(nombreProveedor, Telefono );

            redVeterinaria.agregarProveedor(proveedor1);

            console.log("Proveedores en la red después de agregar:", redVeterinaria.getProveedores());
            break;
        case "2":
            const buscar = readlineSync.questionInt("ID del proveedor:");
            const nuevoNombreProv = readlineSync.question("Nuevo nombre:");
            const nuevaTelefono = readlineSync.question("Nuevo telefono:");
            redVeterinaria.modificarProveedor(buscar,nuevoNombreProv,nuevaTelefono);
            console.log("Lista actualizada:", redVeterinaria.getProveedores());
            break;
        case "3":
            const buscarIdProv = readlineSync.questionInt("ID del proveedor a eliminar:")
            redVeterinaria.eliminarProveedor(buscarIdProv);
            console.log("Lista actualizada:", redVeterinaria.getProveedores());
            break

        case "0":
            mostrarMenuPrincipal();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarProveedores();
}

function gestionarClientes(veterinaria: Veterinaria): void {
 
    console.log("\n--- Gestión de Clientes ---");
    console.log("1. Agregar Clientes");
    console.log("2. Modificar Clientes");
    console.log("3. Eliminar Clientes");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombreCliente= readlineSync.question("Nombre del Cliente: ");
            const telCliente  = readlineSync.question("Telefono: ");
            const cliente1 = new Cliente(nombreCliente,telCliente);

            veterinaria.agregarCliente(cliente1);

           // if(nuevaVeterinaria)

            // Verificar estado después de agregar
            console.log("Dedespués de agregar:", veterinaria.getClientes());
            break;
        case "2":
            const buscarIdCliente = readlineSync.questionInt("ID del cliente:");
            const nuevoNombreCliente = readlineSync.question("Nuevo nombre:");
            const nuevoTelefono = readlineSync.question("Nuevo telefono:");
            veterinaria.modificarCliente(buscarIdCliente,nuevoNombreCliente,nuevoTelefono);
            console.log("Lista actualizada:", veterinaria.getClientes());
            break;
        case "3":
            const buscarIdClient = readlineSync.questionInt("ID del cliente a eliminar:")
            veterinaria.eliminarCliente(buscarIdClient);
            console.log("Lista actualizada:", veterinaria);
            break

        case "0":
            mostrarMenuPrincipal();
            return;
        default:
            console.log("Opción no válida.");
            break;
    } 

   gestionarClientes(veterinaria);
}

function gestionarPacientes(veterinaria: Veterinaria): void {
 
    console.log("\n--- Gestión de Pacientes ---");
    console.log("1. Agregar Pacientes");
    console.log("2. Modificar Pacientes");
    console.log("3. Eliminar Pacientes");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            const nombrePaciente= readlineSync.question("Nombre del paciente: ");
            const especie = readlineSync.question("Especie del paciente: ");
            
            const paciente1 = new Paciente(nombrePaciente,especie,);


            console.log("Proveedores en la red después de agregar:", redVeterinaria.getProveedores());
            break;
        case "2":
            const buscar = readlineSync.questionInt("ID del proveedor:");
            const nuevoNombreProv = readlineSync.question("Nuevo nombre:");
            const nuevaTelefono = readlineSync.question("Nuevo telefono:");
            redVeterinaria.modificarProveedor(buscar,nuevoNombreProv,nuevaTelefono);
            console.log("Lista actualizada:", redVeterinaria.getProveedores());
            break;
        case "3":
            const buscarIdProv = readlineSync.questionInt("ID del proveedor a eliminar:")
            redVeterinaria.eliminarProveedor(buscarIdProv);
            console.log("Lista actualizada:", redVeterinaria.getProveedores());
            break

        case "0":
            mostrarMenuPrincipal();
            return;
        default:
            console.log("Opción no válida.");
            break;
    } 

   gestionarPacientes();
}

mostrarMenuPrincipal()