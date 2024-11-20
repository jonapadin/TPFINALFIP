
import { menuPrincipal } from "./app";
import { Cliente, Paciente, Veterinaria } from "./models";
import * as readlineSync from 'readline-sync';


















export function menuVeterinaria(): void {
    console.log("\n--- Gestión de Veterinaria ---");
    console.log("1. Gestionar Clientes");
    console.log("2. Gestionar Pacientes");
    console.log("3. Volver");
    console.log("0. Salir");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            gestionarClientes();
            break;
        case "2":
           "gestionarPacientes";
            break;
        case "3":
            menuPrincipal(); 
        case "0":
           process.exit();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
}





function gestionarClientes(): void {
 
   console.log("\n--- Gestión de Clientes ---");
     console.log("1. Agregar Clientes");
     console.log("2. Modificar Clientes");
     console.log("3. Eliminar Clientes");
     console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

//     switch (opcion) {
//         case "1":
//             const nombreCliente= readlineSync.question("Nombre del Cliente: ");
//             const telCliente  = readlineSync.question("Telefono: ");
//             const cliente1 = new Cliente(nombreCliente,telCliente);

//             veterinaria.agregarCliente(cliente1);

//            // if(nuevaVeterinaria)

//             // Verificar estado después de agregar
//             console.log("Dedespués de agregar:", veterinaria.getClientes());
//             break;
//         case "2":
//             const buscarIdCliente = readlineSync.questionInt("ID del cliente:");
//             const nuevoNombreCliente = readlineSync.question("Nuevo nombre:");
//             const nuevoTelefono = readlineSync.question("Nuevo telefono:");
//             veterinaria.modificarCliente(buscarIdCliente,nuevoNombreCliente,nuevoTelefono);
//             console.log("Lista actualizada:", veterinaria.getClientes());
//             break;
//         case "3":
//             const buscarIdClient = readlineSync.questionInt("ID del cliente a eliminar:")
//             veterinaria.eliminarCliente(buscarIdClient);
//             console.log("Lista actualizada:", veterinaria);
//             break

//         case "0":
//             mostrarMenuPrincipal();
//             return;
//         default:
//             console.log("Opción no válida.");
//             break;
//     } 

//    gestionarClientes(veterinaria);
// }

// function gestionarPacientes(veterinaria: Veterinaria): void {
 
//     console.log("\n--- Gestión de Pacientes ---");
//     console.log("1. Agregar Pacientes");
//     console.log("2. Modificar Pacientes");
//     console.log("3. Eliminar Pacientes");
//     console.log("0. Volver");
//     const opcion = readlineSync.question("Seleccione una opción: ");

//     switch (opcion) {
//         case "1":
//             const nombrePaciente= readlineSync.question("Nombre del paciente: ");
//             const especie = readlineSync.question("Especie del paciente: ");
//             const idDuenio = readlineSync.questionInt("ID del dueño: ");

//             const paciente1 = new Paciente(nombrePaciente,especie,idDuenio);
//             veterinaria.agregarPaciente(paciente1);

//             console.log("Pacientes en la red después de agregar:", veterinaria.getPacientes());
//             break;
//         case "2":
//             const buscar = readlineSync.questionInt("ID de la mascota:");
//             const nuevoNombreEspecie = readlineSync.question("Nuevo nombre:");
//             const nuevaEspecie = readlineSync.question("Nueva especie:");
//             veterinaria.modificarPaciente(buscar,nuevoNombreEspecie,nuevaEspecie);
//             console.log("Lista actualizada:", veterinaria.getPacientes());
//             break;
//         case "3":
//             const buscarIdDuenio = readlineSync.questionInt("ID del paciente a eliminar:")
//             veterinaria.eliminarPaciente(buscarIdDuenio);
//             console.log("Lista actualizada:", veterinaria.getPacientes());
//             break

//         case "0":
//             mostrarMenuPrincipal();
//             return;
//         default:
//             console.log("Opción no válida.");
//             break;
//     } 

//    gestionarPacientes(veterinaria);
 }
