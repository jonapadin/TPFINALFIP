import * as readlineSync from "readline-sync";
import { RedVeterinaria } from "./models/RedVeterinaria";

const redVetinaria = new RedVeterinaria();

export function mostrarMenuGestor(redVeterinaria: RedVeterinaria): void {
  console.log("\n--- Menú Principal del Gestor ---");
  console.log("1. Gestionar Veterinarias");
  console.log("2. Gestionar Proveedores");
  console.log("0. Salir");
  const opcion = readlineSync.question("Seleccione una opcion: ");
  if (!["1", "2", "3", "0"].includes(opcion)) {
    console.log("Opcion no valida. Por favor, selecciona una opcion correcta.");
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
        console.log("Opcion no valida.");
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
  console.log("4. Ver lista de veterinarias");
  console.log("0. Volver");
  const opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1":
            redVeterinaria.crearVeterinaria();
            break;
        case "2":
            const buscar:number = readlineSync.questionInt("ID de la veterinaria a actualizar:");

            if (buscar <= 0) {
                console.log("ID no válido.");
                return;
            }
            
            let nuevoNombre:string = readlineSync.question("Nuevo nombre: ");
            let nuevaDireccion:string = readlineSync.question("Nueva direccion: ");
            

            while (!nuevoNombre) {
                nuevoNombre = readlineSync.question("El nombre no puede estar vacío. Nuevo nombre: ");
            }
            

            while (!nuevaDireccion) {
                nuevaDireccion = readlineSync.question("La direccion no puede estar vacía. Nueva direccion: ");
            }
            

            redVeterinaria.modificarVeterinaria(buscar, nuevoNombre, nuevaDireccion);


            break;
        case "3":
            const buscarId:number = readlineSync.questionInt("ID de la veterinaria a eliminar:");
            if (isNaN(buscarId) || buscarId <= 0) {
                console.log("ID no válido.");
                return;
            }
            redVeterinaria.darBajaVeterinaria(buscarId)
            break
        case "4":
            redVeterinaria.getVeterinarias();
            break
        case "0":
            mostrarMenuGestor(redVeterinaria);
            return;
        default:
            console.log("Opcion no válida.");
            break;
    }
    gestionarVeterinarias(redVeterinaria,);
}

export function gestionarProveedores(redVeterinaria: RedVeterinaria): void {
  console.log("\n--- Gestión de Proveedores ---");
  console.log("1. Agregar Proveedores");
  console.log("2. Modificar Proveedores");
  console.log("3. Eliminar Proveedores");
  console.log("4. Ver lista de proveedores");
  console.log("0. Volver");
  const opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1":
            redVeterinaria.crearProveedor();
            break;
        case "2":

            let buscarProv:number = readlineSync.questionInt("ID del proveedor: ");
            
            if (isNaN(buscarProv) || buscarProv <= 0) {
                console.log("ID no válido.");
                return;
            }

            let nuevoNombreProv = readlineSync.question("Nuevo nombre: ");
            let nuevoTelefono = readlineSync.question("Nuevo telefono: ");

            while (!nuevoNombreProv) {
                nuevoNombreProv = readlineSync.question("El nombre no puede estar vacío. Nuevo nombre: ");
            }
            

            while (!nuevoTelefono) {
                nuevoTelefono = readlineSync.question("El Telefono no puede estar vacío. Nueva direccion: ");
            }
            

            redVeterinaria.modificarProveedor(buscarProv,nuevoNombreProv,nuevoTelefono);
            break;
     
        case "3":
            const buscarIdProv = readlineSync.questionInt("ID del proveedor a eliminar:");
            if (isNaN(buscarIdProv) || buscarIdProv <= 0) {
                console.log("ID no válido.");
                return;
            }

            redVeterinaria.eliminarProveedor(buscarIdProv);
            break
        case "4":
            redVeterinaria.getProveedores();
            break
        case "0":
            mostrarMenuGestor(redVeterinaria);
            return;
        default:
            console.log("Opcion no válida.");
            break;
    }
    gestionarProveedores(redVeterinaria);
}

mostrarMenuGestor(redVetinaria);
