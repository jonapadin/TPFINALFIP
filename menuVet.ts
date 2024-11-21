import { menuPrincipal } from "./app";
import { agregarCliente, eliminarCliente, leerVeterinarias, modificarCliente } from "./funciones";
import { Cliente, Paciente,Veterinaria } from "./models";
import * as readlineSync from 'readline-sync';
import * as fs from "fs";




function menuVeterinaria() {
    console.log("\n--- Gestión de Veterinaria ---");
    console.log("1. Ver Lista de Veterinarias");
    console.log("2. Seleccionar Veterinaria");
    console.log("0. Salir");
    const opcion = readlineSync.question("Eliga una opcion: ");

    switch(opcion) {
        case "1":
            leerVeterinarias();
        break;
        case "2":
            const idSeleccionado = readlineSync.questionInt("Introduce el ID de la veterinaria a seleccionar: ");
            seleccionarVeterinaria(idSeleccionado)
            break;
        case "0":
                process.exit();    
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
                menu(veterinaria);  // Aquí puedes hacer lo que necesites con la veterinaria seleccionada
            } else {
                console.log("No se encontró una veterinaria con ese ID.");
            }
        } catch (parseError) {
            console.error('Error al parsear el contenido del archivo:', parseError);
        }
    });
}

menuVeterinaria();
export function menu(veterinaria:Veterinaria): void {
    console.log("\n--- Menu Veterinaria---");
    console.log("1. Gestionar Clientes");
    console.log("2. Gestionar Pacientes");
    console.log("3. volver");
    console.log("0. Salir");
    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion) {
        case "1":
            gestionarClientes(veterinaria)
            break;
        case "2":
           "gestionarPacientes";
            break;
            case "3":
                menuVeterinaria();
                break;
        case "0":
           process.exit();
            return;
        default:
            console.log("Opción no válida.");
            break;
    }
    menu(veterinaria)
}



function gestionarClientes(veterinaria:Veterinaria): void {
 
   console.log("\n--- Gestión de Clientes ---");
     console.log("1. Agregar Clientes");
     console.log("2. Modificar Clientes");
     console.log("3. Eliminar Clientes");
     console.log("0. Volver");
    const opcion = readlineSync.question("Seleccione una opción: ");

      switch (opcion) {
         case "1":
            agregarCliente(veterinaria);
            
          break;

          case "2":
            modificarCliente(veterinaria);
            break;

           case "3":
            eliminarCliente(veterinaria);
            break 
           case "0": 
           menu(veterinaria);
           break;
          default:
             console.log("Opción no válida.");
             gestionarClientes(veterinaria);
            
        break;
     } 
     gestionarClientes(veterinaria);
}

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
//             menuPrincipal();
//             return;
//         default:
//             console.log("Opción no válida.");
//             break;
//     } 

//    gestionarPacientes(veterinaria);
//  }
