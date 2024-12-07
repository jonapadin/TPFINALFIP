import * as readlineSync from 'readline-sync';
import * as fs from "fs";
import { Veterinaria } from './models/Veterinaria';

export function menuVeterinaria() {

    console.log("\n--- Gestión de Veterinaria ---");
    console.log("1. Ver Lista de Veterinarias");
    console.log("2. Seleccionar Veterinaria");
    console.log("0. Regresar al Menú Principal");

    let opcion = readlineSync.question("Elija una opcion: ");

    switch (opcion) {
        case "1":
            try {
                // Leemos el archivo veterinarias.txt de forma síncrona
                const data = fs.readFileSync("veterinarias.txt", "utf-8");

                if (!data) {
                    console.log("El archivo esta vacio")
                    return [];
                }

                // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
                const veterinariasTxt: { nombre: string; direccion: string; id: number }[] =
                    JSON.parse(data);

                // Convertimos los objetos del JSON en instancias de la clase Veterinaria
                const listaVeterinarias: Veterinaria[] = veterinariasTxt.map(
                    (vete) => new Veterinaria(vete.nombre, vete.direccion, vete.id) // Creamos la instancia de Veterinaria pasando el id
                );

                // Mostramos la información de las veterinarias
                listaVeterinarias.forEach((veterinaria, i) => {
                    console.log("---");
                    console.log(`Veterinaria ${i + 1}:`);
                    console.log(`ID: ${veterinaria.getId()}`);
                    console.log(`Nombre: ${veterinaria.getNombre()}`);
                    console.log(`Dirección: ${veterinaria.getDireccion()}`);
                    console.log("---");
                });
            } catch (err) {
                console.error("Error al leer o parsear el archivo veterinarias.txt:", err);
                return [];
            }
            break;
        case "2":
            const idSeleccionado = readlineSync.questionInt("Introduce el ID de la veterinaria a seleccionar: ");
            fs.readFile('veterinarias.txt', 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    return;
                }

                try {
                    // Parseamos el contenido del archivo a un array de objetos
                    const veterinariasTxt: { nombre: string; direccion: string; id: number }[] = JSON.parse(data);

                    // Creamos un array de instancias de Veterinaria, pasando también el id
                    const veterinarias: Veterinaria[] = veterinariasTxt.map((vete) =>
                        new Veterinaria(vete.nombre, vete.direccion, vete.id) // Pasar el id aquí
                    );

                    // Buscar la veterinaria por ID
                    const veterinaria = veterinarias.find(v => v.getId() === idSeleccionado);

                    if (veterinaria) {
                        console.log("\nDetalles de la Veterinaria Seleccionada:");
                        console.log(`ID: ${veterinaria.getId()}`);
                        console.log(`Nombre: ${veterinaria.getNombre()}`);
                        console.log(`Dirección: ${veterinaria.getDireccion()}`);
                        menu(veterinaria);
                    } else {
                        console.log("No se encontró una veterinaria con ese ID.");
                    }
                } catch (parseError) {
                    console.error('Error al parsear el contenido del archivo:', parseError);
                }
            });
            return;  // Regresamos al menú principal después de seleccionar una veterinaria
        case "0":
            console.log("Regresando al menú principal...");
            return;  // Regresamos al menú principal al elegir la opción 0
        default:
            console.log("Opcion no válida.");
            break;
    }

}

// Menú de gestion de veterinaria seleccionada
export function menu(veterinaria: Veterinaria): void {

    console.log("\n--- Menú Veterinaria ---");
    console.log("1. Gestionar Clientes");
    console.log("2. Gestionar Pacientes");
    console.log("3. Volver");
    console.log("0. Salir");

    let opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1":
            gestionarClientes(veterinaria);
            break;
        case "2":
            gestionarPacientes(veterinaria);
            break;
        case "3":
            console.log("Volviendo al menú de veterinarias...");
            return;
        case "0":
            console.log("Saliendo...");
            process.exit();  // Cierra la aplicación
        default:
            console.log("Opción no válida.");
            break;
    }

}

// Funciones para gestionar clientes y pacientes
function gestionarClientes(veterinaria: Veterinaria): void {


    console.log("\n--- Gestión de Clientes ---");
    console.log("1. Agregar Clientes");
    console.log("2. Modificar Clientes");
    console.log("3. Eliminar Clientes");
    console.log("0. Volver");

    let opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1":
            veterinaria.crearCliente();
            break;
        case "2":
            const buscar = readlineSync.questionInt("ID del cliente a actualizar: ");

            
            if (isNaN(buscar) || buscar <= 0) {
                console.log("ID no válido.");
                return;
            }

            let nuevoNombre:string = readlineSync.question("Nuevo nombre: ");
            let nuevoTelefono:string = readlineSync.question("Nuevo telefono: ");
            let nuevoCantVisitas:number = readlineSync.questionInt("Nueva cantidad de visitas: ");

            

            while (!nuevoNombre) {
                nuevoNombre = readlineSync.question("El nombre no puede estar vacio, Nombre: ");
            }
            

            while (!/^\d{8}$/.test(nuevoTelefono)) {
                nuevoTelefono = readlineSync.question("El telefono debe tener exactamente 8 digitos. Telefono: ");
            }
            
            

            if (nuevoCantVisitas < 0) {
                console.log("La cantidad de visitas debe ser un número positivo.");
                return;
            }

            veterinaria.modificarCliente(buscar,nuevoNombre,nuevoTelefono, nuevoCantVisitas);


            break;
        case "3":
            const buscarIdCliente:number = readlineSync.questionInt("ID del cliente a eliminar: ");

            if (isNaN(buscarIdCliente) || buscarIdCliente <= 0) {
                console.log("ID no válido.");
                return;
            }
            veterinaria.eliminarCliente(buscarIdCliente);
            break;
        case "0":
            return;
        default:
            console.log("Opción no válida.");
            break;
    }

}

function gestionarPacientes(veterinaria: Veterinaria): void {

    console.log("\n--- Gestión de Pacientes ---");
    console.log("1. Agregar Pacientes");
    console.log("2. Modificar Pacientes");
    console.log("3. Eliminar Pacientes");
    console.log("0. Volver");

    let opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1":
            veterinaria.crearPaciente();
            break;
        case "2":
           const buscar:number = readlineSync.questionInt("ID del paciente a actualizar: ");

            // Validate ID input
            if (buscar <= 0) {
                console.log("ID no válido.");
                return;
            }
            
            let nuevoNombreEspecie:string = readlineSync.question("Nuevo nombre: ");
            let nuevaEspecie:string = readlineSync.question("Nueva especie: ");
            

            while (nuevoNombreEspecie === "") {
                nuevoNombreEspecie = readlineSync.question("El nombre no puede estar vacío. Nuevo nombre: ");
            }
            

            while (nuevaEspecie === "") {
                nuevaEspecie = readlineSync.question("La especie no puede estar vacía. Nueva especie: ");
            }
            break;
        case "3":
            const buscarIdDuenio:number = readlineSync.questionInt("ID del paciente a eliminar: ");
            if (isNaN(buscarIdDuenio) || buscarIdDuenio <= 0) {
                console.log("ID no válido.");
                return;
            }

            veterinaria.eliminarPaciente(buscarIdDuenio);
            break;
        case "0":
            return;
        default:
            console.log("Opción no válida.");
            break;
    }

}

menuVeterinaria();