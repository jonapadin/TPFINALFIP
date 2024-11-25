
import { agregarProveedor, agregarVeterinaria, eliminarProveedor, eliminarVeterinaria, modificarProveedor, modificarVeterinaria } from "./funciones";
import { RedVeterinaria } from "./models";
import * as readlineSync from 'readline-sync';

export function mostrarMenuGestor(redVeterinaria: RedVeterinaria): void {
    console.log("\n--- Menú Principal del Gestor ---");
    console.log("1. Gestionar Veterinarias");
    console.log("2. Gestionar Proveedores");
    console.log("0. Salir");
    const opcion = readlineSync.question("Seleccione una opción: ");
    if (!["1", "2","3", "0"].includes(opcion)) {
        console.log("Opción no válida. Por favor, selecciona una opción correcta.");
    } else {
        switch (opcion) {
            case "1":
                gestionarVeterinarias(redVeterinaria);
                break;
            case "2":
                gestionarProveedores(redVeterinaria);
                break;
            case "0":
                return;
            default:
                console.log("Opción no válida.");
                mostrarMenuGestor(redVeterinaria);
                break;
        }
    }
    
}




export function gestionarVeterinarias(redVeterinaria: RedVeterinaria): void {
 
    console.log("\n--- Gestión de Veterinarias ---");
    console.log("1. Agregar Veterinaria");
    console.log("2. Modificar Veterinaria");
    console.log("3. Eliminar Veterinaria");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            agregarVeterinaria(redVeterinaria);

            break;
        case "2":
            modificarVeterinaria(redVeterinaria);
            break;
        case "3":
            eliminarVeterinaria(redVeterinaria);
            break
        case "0":
            mostrarMenuGestor(redVeterinaria);
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarVeterinarias(redVeterinaria,);
}



export function gestionarProveedores(redVeterinaria: RedVeterinaria, ): void {
    console.log("\n--- Gestión de Proveedores ---");
    console.log("1. Agregar Proveedores");
    console.log("2. Modificar Proveedores");
    console.log("3. Eliminar Proveedores");
    console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            agregarProveedor(redVeterinaria);
            break;
        case "2":
            modificarProveedor(redVeterinaria);
            break;
        case "3":
          eliminarProveedor(redVeterinaria);
            break

        case "0":
            mostrarMenuGestor(redVeterinaria);
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    gestionarProveedores(redVeterinaria);
}
