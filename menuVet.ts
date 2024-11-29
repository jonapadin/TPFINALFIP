import {leerVeterinarias, } from "./funciones";
import * as readlineSync from 'readline-sync';
import * as fs from "fs";
import { Veterinaria } from './models/Veterinaria';

export function menuVeterinaria(veterinaria?:Veterinaria) {

        console.log("\n--- Gestión de Veterinaria ---");
        console.log("1. Ver Lista de Veterinarias");
        console.log("2. Seleccionar Veterinaria");
        console.log("0. Regresar al Menú Principal");

       let opcion = readlineSync.question("Elija una opción: ");

        switch(opcion) {
            case "1":
                veterinaria?.leerArchivo();  // Muestra la lista de veterinarias
                break;
            case "2":
                const idSeleccionado = readlineSync.questionInt("Introduce el ID de la veterinaria a seleccionar: ");
                seleccionarVeterinaria(idSeleccionado);  // Lógica para seleccionar la veterinaria
                return;  // Regresamos al menú principal después de seleccionar una veterinaria
            case "0":
                console.log("Regresando al menú principal...");
                return;  // Regresamos al menú principal al elegir la opción 0
            default:
                console.log("Opción no válida.");
                break;
        }
    
}

function seleccionarVeterinaria(id: number) {
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
            const veterinaria = veterinarias.find(v => v.getId() === id);

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
}

// Menú de gestión de veterinaria seleccionada
export function menu(veterinaria: Veterinaria): void {

        console.log("\n--- Menú Veterinaria ---");
        console.log("1. Gestionar Clientes");
        console.log("2. Gestionar Pacientes");
        console.log("3. Volver");
        console.log("0. Salir");

      let  opcion = readlineSync.question("Seleccione una opción: ");

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

     let   opcion = readlineSync.question("Seleccione una opción: ");

        switch (opcion) {
            case "1":
                veterinaria.crearCliente();
                break;
            case "2":
                const buscar = readlineSync.questionInt("ID de la veterinaria a actualizar:");
                const nuevoNombre = readlineSync.question("Nuevo nombre:");
                const nuevaDireccion = readlineSync.question("Nueva direccion:");
                veterinaria.modificarCliente(buscar,nuevoNombre,nuevaDireccion);
                break;
            case "3":
                const buscarIdCliente = readlineSync.questionInt("ID del cliente a eliminar:");
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

      let  opcion = readlineSync.question("Seleccione una opción: ");

        switch (opcion) {
            case "1":
                veterinaria.crearPaciente();
                break;
            case "2":
                const buscar = readlineSync.questionInt("ID de la mascota:");
                const nuevoNombreEspecie = readlineSync.question("Nuevo nombre:");
                const nuevaEspecie = readlineSync.question("Nueva especie:");
                veterinaria.modificarPaciente(buscar,nuevoNombreEspecie,nuevaEspecie);
                break;
            case "3":
                const buscarIdDuenio = readlineSync.questionInt("ID del paciente a eliminar:");
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