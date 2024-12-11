import * as readlineSync from "readline-sync";
import * as fs from "fs";
import { Veterinaria } from "./models/Veterinaria";

export function menuVeterinaria() {
  console.log("\n--- Gestión de Veterinaria ---");
  console.log("1. Ver Lista de Veterinarias");
  console.log("2. Seleccionar Veterinaria");
  console.log("0. Regresar al Menú Principal");

  let opcion = readlineSync.question("Elija una opcion: ");

    switch (opcion) {
        case "1":
            try {
                const data = fs.readFileSync("veterinarias.txt", "utf-8");

        if (!data) {
          console.log("El archivo esta vacio");
          return [];
        }

                const veterinariasTxt: { nombre: string; direccion: string; id: number }[] =
                    JSON.parse(data);

                const listaVeterinarias: Veterinaria[] = veterinariasTxt.map(
                    (vete) => new Veterinaria(vete.nombre, vete.direccion, vete.id) 
                );
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
            menuVeterinaria();
            break
        case "2":
            const idSeleccionado = readlineSync.questionInt("Introduce el ID de la veterinaria a seleccionar: ");
            fs.readFile('veterinarias.txt', 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    return;
                }

                try {
                    const veterinariasTxt: { nombre: string; direccion: string; id: number }[] = JSON.parse(data);

                    const veterinarias: Veterinaria[] = veterinariasTxt.map((vete) =>
                        new Veterinaria(vete.nombre, vete.direccion, vete.id) // Pasar el id aquí
                    );

                    const veterinaria = veterinarias.find(v => v.getId() == idSeleccionado);

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
            return; 
        case "0":
            console.log("Regresando al menú principal...");
            return; 
        default:
            console.log("Opcion no válida.");
            menuVeterinaria();
            break;
    }
   
}

// Menú de gestion de veterinaria seleccionada
export function menu(veterinaria: Veterinaria): void {

    console.log("\n--- Menú Veterinaria ---");
    console.log("1. Gestionar Clientes");
    console.log("2. Gestionar Pacientes");
    console.log("3. Volver");

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
            menuVeterinaria();
            return;
        default:
            console.log("Opción no válida.");
            menu(veterinaria);
            break;
    }

}

// Funciones para gestionar clientes y pacientes
function gestionarClientes(veterinaria: Veterinaria): void {


    console.log("\n--- Gestión de Clientes ---");
    console.log("1. Ver Clientes");
    console.log("2. Agregar Clientes");
    console.log("3. Modificar Clientes");
    console.log("4. Eliminar Clientes");
    console.log("0. Volver");

  let opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1": 
        try {
            // Leemos el archivo veterinarias.txt de forma síncrona
            const data = fs.readFileSync("veterinarias.txt", "utf-8");
        
            if (!data) {
                console.log("El archivo está vacío");
                return;
            }
        
            // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
            const veterinariasTxt: { id: number; nombre: string; direccion: string; clientes: any[]; pacientes: any[] }[] =
                JSON.parse(data);
        
            // Mostramos solo los clientes de cada veterinaria
            veterinariasTxt.forEach((veterinaria, i) => {
                console.log(`--- Veterinaria ${i + 1} - Clientes ---`);
        
                if (veterinaria.clientes.length > 0) {
                    veterinaria.clientes.forEach((cliente, index) => {
                        // Asumiendo que cliente tiene propiedades como "nombre" y "telefono"
                        console.log(`Cliente ${index + 1}: ${cliente.nombre}, Teléfono: ${cliente.telefono}`);
                    });
                } else {
                    console.log("No hay clientes.");
                }
        
                console.log("---");
            });
        } catch (err) {
            console.error("Error al leer o parsear el archivo veterinarias.txt:", err);
        }
        gestionarClientes(veterinaria);
        break;
        case "2":
            veterinaria.crearCliente();
            gestionarClientes(veterinaria);
            break;
            case "3":
            let idCliente = readlineSync.questionInt("Id de cliente a modificar: ");
            let nombre = readlineSync.question("Nuevo nombre del cliente (dejar vacío para no modificar): ");
            let telefono = readlineSync.question("Nuevo teléfono del cliente (dejar vacío para no modificar): ");
            let visitas = readlineSync.questionInt("Cantidad de visitas del cliente (dejar en 0 para no modificar): ");
            let esVip = readlineSync.keyInYNStrict("¿Es el cliente VIP? (s/n): ");
            
            // Llamamos a la función modificarCliente
            veterinaria.modificarCliente(
                veterinaria.getId(),  // Usamos veterinaria.id en lugar de veterinaria.getId()
                idCliente, 
                nombre || undefined,  // Si nombre está vacío, pasamos undefined
                telefono || undefined,  // Lo mismo para el teléfono
                visitas === 0 ? undefined : visitas,  // Si visitas es 0, pasamos undefined
                esVip  // esVip ya es un booleano, no hace falta convertirlo
            );
            gestionarClientes(veterinaria);
            break;
        case "4":
            const buscarIdCliente:number = readlineSync.questionInt("ID del cliente a eliminar: ");

            if (isNaN(buscarIdCliente) || buscarIdCliente <= 0) {
                console.log("ID no válido.");
                return;
            }
            veterinaria.eliminarCliente(buscarIdCliente);
            gestionarClientes(veterinaria);
            break;
        case "0":
            menuVeterinaria();
            return;
        default:
            console.log("Opción no válida.");
            gestionarClientes(veterinaria);
            break;
    }

}

function gestionarPacientes(veterinaria: Veterinaria): void {

    console.log("\n--- Gestión de Pacientes ---");
    console.log("1. Ver Lista");
    console.log("2. Agregar Pacientes");
    console.log("3. Modificar Pacientes");
    console.log("4. Eliminar Pacientes");
    console.log("0. Volver");

  let opcion = readlineSync.question("Seleccione una opcion: ");

    switch (opcion) {
        case "1": 
        try {
            const data = fs.readFileSync("veterinarias.txt", "utf-8");
        
            if (!data) {
                console.log("El archivo está vacío");
                return;
            }
        
            const veterinariasTxt: {
                id: number;
                nombre: string;
                direccion: string;
                clientes: { id: number; nombre: string; telefono: string; visitas: number; esVip: boolean }[];
                pacientes: { nombre: string; especie: string; idDuenio: number }[];
            }[] = JSON.parse(data);
        
            veterinariasTxt.forEach((veterinaria, i) => {
                console.log(`--- Veterinaria ${i + 1} - ${veterinaria.nombre} ---`);
                console.log(`Dirección: ${veterinaria.direccion}`);
                
                if (veterinaria.clientes.length > 0) {
                    veterinaria.clientes.forEach((cliente, index) => {
                        console.log(`\nCliente ${index + 1}: ${cliente.nombre}, Teléfono: ${cliente.telefono}`);

                        const pacientesDelCliente = veterinaria.pacientes.filter(paciente => paciente.idDuenio === cliente.id);
        
                        if (pacientesDelCliente.length > 0) {
                            console.log("Pacientes:");
                            pacientesDelCliente.forEach((paciente, pIndex) => {
                                console.log(`  Paciente ${pIndex + 1}: ${paciente.nombre}, Especie: ${paciente.especie}`);
                            });
                        } else {
                            console.log("  No tiene pacientes registrados.");
                        }
                    });
                } else {
                    console.log("No hay clientes registrados.");
                }
        
                console.log("---\n");
            });
        } catch (err) {
            console.error("Error al leer o parsear el archivo veterinarias.txt:", err);
        }
        gestionarPacientes(veterinaria);
        break;
        case "2":
            veterinaria.crearPaciente();
            break;
        case "3":
            const buscar: number = readlineSync.questionInt("ID del paciente a actualizar: ");

            // Validar el ID
            if (buscar <= 0) {
                console.log("ID no válido.");
                return;
            }
            
            // Solicitar el nuevo nombre
            let nuevoNombreEspecie: string = readlineSync.question("Nuevo nombre: ");
            while (nuevoNombreEspecie == "") {
                nuevoNombreEspecie = readlineSync.question("El nombre no puede estar vacío. Nuevo nombre: ");
            }
            
            // Solicitar la nueva especie
            let nuevaEspecie: string = readlineSync.question("Nueva especie: ");
            while (nuevaEspecie == "") {
                nuevaEspecie = readlineSync.question("La especie no puede estar vacía. Nueva especie: ");
            }
            
            // Llamar a la función para modificar el paciente
            veterinaria.modificarPaciente(buscar, nuevoNombreEspecie, nuevaEspecie);

            gestionarPacientes(veterinaria);
            break;
        case "0":
            menuVeterinaria();
            return;
        default:
            console.log("Opción no válida.");
            gestionarPacientes(veterinaria);
            break;
    }

}

menuVeterinaria();
