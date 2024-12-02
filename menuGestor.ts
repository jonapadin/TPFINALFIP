import * as readlineSync from 'readline-sync';
import { RedVeterinaria } from './models/RedVeterinaria';

const redVetinaria = new RedVeterinaria();

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
            redVeterinaria.crearVeterinaria();
            break;
        case "2":
            const buscar = readlineSync.questionInt("ID de la veterinaria a actualizar:");
            const nuevoNombre = readlineSync.question("Nuevo nombre:");
            const nuevaDireccion = readlineSync.question("Nueva direccion:");
            redVeterinaria.modificarVeterinaria(buscar,nuevoNombre,nuevaDireccion);
            break;
        case "3":
            const buscarId = readlineSync.questionInt("ID de la veterinaria a eliminar:");
            redVeterinaria.darBajaVeterinaria(buscarId)
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
            redVeterinaria.crearProveedor();
            break;
        case "2":
            const buscar = readlineSync.questionInt("ID del proveedor:");
            const nuevoNombreProv = readlineSync.question("Nuevo nombre:");
            const nuevoTelefono = readlineSync.question("Nuevo telefono:");
            redVeterinaria.modificarProveedor(buscar,nuevoNombreProv,nuevoTelefono);
            break;
        case "3":
            const buscarIdProv = readlineSync.questionInt("ID del proveedor a eliminar:");
            redVeterinaria.eliminarProveedor(buscarIdProv);
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

mostrarMenuGestor(redVetinaria);

