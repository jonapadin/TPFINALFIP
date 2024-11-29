import * as readlineSync from "readline-sync";
import * as fs from "fs";

import {
  Cliente,
  Paciente,
  Proveedor,
  RedVeterinaria,
  Veterinaria,
} from "./models";

function guardarEnArchivo(nombreArchivo: string, datos: any[]): void {
  try {
    // Convertir los datos a formato JSON
    const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible

    fs.writeFileSync(nombreArchivo, contenido, "utf8");
    console.log(`El archivo se guardó correctamente como ${nombreArchivo}`);
  } catch (err) {
    console.error("Hubo un error al guardar el archivo: ", err);
  }
}

function actualizarCliente(nombreArchivo: string, veterinaria: Veterinaria) {
  // Leemos los datos existentes del archivo
  let data;
  try {
    data = fs.readFileSync(nombreArchivo, "utf-8");
  } catch (error) {
    data = "[]";
  }

  const veterinariasTxt = JSON.parse(data);

  // Buscamos si la veterinaria ya existe por su id
  const index = veterinariasTxt.findIndex(
    (v: any) => v.id === veterinaria.getId()
  );

  if (index === -1) {
    // Si la veterinaria no existe, la agregamos junto con sus clientes y pacientes
    veterinariasTxt.push({
      id: veterinaria.getId(),
      nombre: veterinaria.getNombre(),
      direccion: veterinaria.getDireccion(),
      clientes: veterinaria.getClientes(),
      pacientes: veterinaria.getPacientes(),
    });
  } else {
    // Si existe, actualizamos los clientes y pacientes
    veterinariasTxt[index].clientes = veterinaria.getClientes();
    veterinariasTxt[index].pacientes = veterinaria.getPacientes();
  }

  // Guardamos los datos actualizados en el archivo
  fs.writeFileSync(
    nombreArchivo,
    JSON.stringify(veterinariasTxt, null, 2),
    "utf8"
  );
  console.log(`El archivo ${nombreArchivo} ha sido actualizado correctamente.`);
}

export const leerVeterinarias = () => {
  try {
    // Leemos el archivo veterinarias.txt de forma síncrona
    const data = fs.readFileSync("veterinarias.txt", "utf-8");

    // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
    const veterinariasTxt: { nombre: string; direccion: string; id: number }[] =
      JSON.parse(data);

    // Convertimos los objetos del JSON en instancias de la clase Veterinaria
    const listaVeterinarias: Veterinaria[] = veterinariasTxt.map(
      (vete) => new Veterinaria(vete.nombre, vete.direccion, vete.id) // Creamos la instancia de Veterinaria pasando el id
    );

    // Mostramos la información de las veterinarias
    listaVeterinarias.forEach((veterinaria, i) => {
      console.log(`Veterinaria ${i + 1}:`);
      console.log(`ID: ${veterinaria.getId()}`);
      console.log(`Nombre: ${veterinaria.getNombre()}`);
      console.log(`Dirección: ${veterinaria.getDireccion()}`);
      console.log("---");
    });
  } catch (err) {
    console.error("Error al leer o parsear el archivo veterinarias.txt:", err);
  }
};

//Funciones red veterinaria




//Funciones red Proveedores


// Funciones clientes

export function modificarCliente(veterinaria: Veterinaria) {
  const buscar = readlineSync.questionInt("ID del clientes:");
  const nuevoNombreCliente = readlineSync.question("Nuevo nombre:");
  const nuevoTelefono = readlineSync.question("Nuevo telefono:");
  veterinaria.modificarCliente(buscar, nuevoNombreCliente, nuevoTelefono);
  console.log("Lista actualizada:", veterinaria.getClientes());
  actualizarCliente("veterinarias.txt", veterinaria);
}

export function eliminarCliente(veterinaria: Veterinaria) {
  const buscarIdCliente = readlineSync.questionInt(
    "ID del cliente a eliminar:"
  );
  veterinaria.eliminarCliente(buscarIdCliente);
  console.log("Lista actualizada:", veterinaria.getClientes());
  actualizarCliente("veterinarias.txt", veterinaria);
}

//Funciones pacientes

export function agregarPaciente(veterinaria: Veterinaria) {
  const nombrePaciente = readlineSync.question("Nombre del paciente: ");
  const especie = readlineSync.question("Especie del paciente: ");
  const idDuenio = readlineSync.questionInt("ID del dueño: ");

  const paciente1 = new Paciente(nombrePaciente, especie, idDuenio);
  veterinaria.agregarPaciente(paciente1);

  actualizarCliente("veterinarias.txt", veterinaria);
}

export function modificarPaciente(veterinaria: Veterinaria) {
  const buscar = readlineSync.questionInt("ID de la mascota:");
  const nuevoNombreEspecie = readlineSync.question("Nuevo nombre:");
  const nuevaEspecie = readlineSync.question("Nueva especie:");
  veterinaria.modificarPaciente(buscar, nuevoNombreEspecie, nuevaEspecie);
  actualizarCliente("veterinarias.txt", veterinaria);
}

export function eliminarPaciente(veterinaria: Veterinaria) {
  const buscarIdDuenio = readlineSync.questionInt(
    "ID del paciente a eliminar:"
  );
  veterinaria.eliminarPaciente(buscarIdDuenio);
  actualizarCliente("veterinarias.txt", veterinaria);
}
