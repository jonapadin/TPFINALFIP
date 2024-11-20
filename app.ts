import { RedVeterinaria } from './models/RedVeterinaria';
import * as readlineSync from 'readline-sync';
import { mostrarMenuGestor } from './menuGestor';
import { menuVeterinaria } from './menuVet';
import { Veterinaria } from './models';


export function menuPrincipal() {
    console.log("\n--- Gestión de Menu ---");
    console.log("1. Gestionar Red de veterinarias");
    console.log("2. Gestionar Veterinarias");
    console.log("0. Salir");

    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            mostrarMenuGestor();
            break;
        case "2":
            menuVeterinaria();
            break;
        case "0":
            process.exit();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    menuPrincipal();
}

menuPrincipal();