import { Cliente } from "./models/Cliente";
import { Paciente } from "./models/Paciente";
import { Proveedor } from "./models/Proveedor";
import { RedVeterinaria } from "./models/RedVeterinaria";
import { Veterinaria } from "./models/Veterinaria";
import * as readlineSync from 'readline-sync';

//Crear Red Veterinaria

const redVeterinaria = new RedVeterinaria();




function mostrarMenu() {
    console.log("\n--- Menú Principal ---");
    const opcion = readlineSync.question("Seleccione una opción:\n1. Gestionar Veterinarias\n2. Gestionar Proveedores\n0. Salir\n");
    if (opcion === "1") {
        mostrarMenuVeterinarias();
    } else if (opcion === "2") {
        mostrarMenuProveedores();
    } else if (opcion === "0") {
        console.log("Saliendo...");
        return;
    } else {
        console.log("Opción no válida. Intente nuevamente.");
        mostrarMenu();
    }
}
function mostrarMenuVeterinarias() {
    console.log("\n--- Menú de Gestión de Veterinarias ---");
    const opcion = readlineSync.question("Seleccione una opción:\n1. Crear Veterinaria\n2. Mostrar Veterinarias\n3. Crear Cliente\n4. Crear Paciente\n0. Volver\n");
    if (opcion === "1") {
        const nombre = readlineSync.question("Nombre de la veterinaria: ");
        const direccion = readlineSync.question("Dirección de la veterinaria: ");
        const veterinaria = redVeterinaria.darAltaVeterinaria();
        console.log(`Veterinaria creada: ${veterinaria.nombre}`);
        mostrarMenuVeterinarias();
    } else if (opcion === "2") {
        redVeterinaria.mostrarVeterinarias();
        mostrarMenuVeterinarias();
    } else if (opcion === "3") {
        const nombre = readlineSync.question("Nombre del cliente: ");
        const telefono = readlineSync.question("Teléfono del cliente: ");
        const veterinariaId = readlineSync.question("ID de la veterinaria donde crear el cliente: ");
        const veterinaria = red.veterinarias.find(vet => vet.id === veterinariaId);
        if (veterinaria) {
            veterinaria.crearCliente(nombre, telefono);
            console.log(`Cliente creado en la veterinaria ${veterinaria.nombre}`);
        } else {
            console.log("Veterinaria no encontrada.");
        }
        mostrarMenuVeterinarias();
    } else if (opcion === "4") {
        const nombre = readlineSync.question("Nombre del paciente: ");
        const especie = readlineSync.question("Especie del paciente (perro/gato/exótica): ");
        const idDueno = readlineSync.question("ID del cliente dueño: ");
        const veterinariaId = readlineSync.question("ID de la veterinaria donde crear el paciente: ");
        const veterinaria = redVeterinaria.veterinarias.find(vet => vet.id === veterinariaId);
        if (veterinaria) {
            veterinaria.crearPaciente(nombre, especie, idDueno);
            console.log(`Paciente creado en la veterinaria ${veterinaria.nombre}`);
        } else {
            console.log("Veterinaria no encontrada.");
        }
        mostrarMenuVeterinarias();
    } else if (opcion === "0") {
        mostrarMenu();
    } else {
        console.log("Opción no válida. Intente nuevamente.");
        mostrarMenuVeterinarias();
    }
}
function mostrarMenuProveedores() {
    console.log("\n--- Menú de Gestión de Proveedores ---");
    const opcion = readlineSync.question("Seleccione una opción:\n1. Crear Proveedor\n2. Mostrar Proveedores\n0. Volver\n");
    if (opcion === "1") {
        const nombre = readlineSync.question("Nombre del proveedor: ");
        const telefono = readlineSync.question("Teléfono del proveedor: ");
        const proveedor = redVeterinaria.crearProveedor(nombre, telefono);
        console.log(`Proveedor creado: ${proveedor.nombre}`);
        mostrarMenuProveedores();
    } else if (opcion === "2") {
        redVeterinaria.mostrarProveedores();
        mostrarMenuProveedores();
    } else if (opcion === "0") {
        mostrarMenu();
    } else {
        console.log("Opción no válida. Intente nuevamente.");
        mostrarMenuProveedores();
    }
}
// Ejecutar el menú principal
mostrarMenu();