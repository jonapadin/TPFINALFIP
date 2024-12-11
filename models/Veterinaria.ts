import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import * as readlineSync from "readline-sync";
import * as fs from "fs";

export class Veterinaria {
  private id: number;
  private nombre: string;
  private direccion: string;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];

  constructor(nombre: string, direccion: string, id?: number) {
    this.id = id ?? Math.floor(Math.random() * 1000);
    this.nombre = nombre;
    this.direccion = direccion;

    if (id !== undefined) {
        this.setId(id);
      }
    this.setNombre(nombre)
    this.setDireccion(direccion);
}


//Gestionar clientes
public crearCliente(cliente?:Cliente){



let nombreCliente = readlineSync.question("Nombre del Cliente: ");


while (!nombreCliente) {
    nombreCliente = readlineSync.question("El nombre del cliente no puede estar vacio. Nombre del Cliente: ");
}

let telCliente = readlineSync.question("Telefono: ");


while (!telCliente || !/^\d+$/.test(telCliente)) {
    telCliente = readlineSync.question("El telefono debe ser un numero válido. Telefono: ");
}


while (telCliente.length !== 8) {
    telCliente = readlineSync.question("El telefono debe tener exactamente 8 digitos. Telefono: ");
}

let visitas = readlineSync.questionInt("Cantidad de visitas iniciales: ");

while (visitas < 0 || isNaN(visitas)) {
    visitas = readlineSync.questionInt("La cantidad de visitas debe ser un número positivo. Cantidad de visitas iniciales: ");
}

    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Parseamos los datos
    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
    }[] = JSON.parse(data);

    // Buscamos la veterinaria por su id
    const veterinariaIndex = veterinariasTxt.findIndex((v) => v.id == this.getId());

    if (veterinariaIndex == -1) {
        console.log("No se encontró una veterinaria con ese ID.");
        return;
    }

    // Si no se pasa un cliente, creamos uno nuevo
    if (!cliente) {
      cliente = new Cliente(nombreCliente, telCliente);
      for (let i = 0; i < visitas; i++) {
        cliente.registrarVisita();
      }
      veterinariasTxt[veterinariaIndex].clientes.push({
        id: cliente.getId(),
        nombre: cliente.getNombre(),
        telefono: cliente.getTelefono(),
        visitas: cliente.getCantVisitas(),
        esVip: cliente.getEsVip(),
      });
    } else {
        // Buscamos el cliente existente por nombre
        const clienteIndex = veterinariasTxt[veterinariaIndex].clientes.findIndex((c) => c.nombre == cliente?.getNombre());
        if (clienteIndex == -1) {
            console.log("No se encontró un cliente con ese nombre.");
            return;
        }

      // Actualizamos los datos del cliente
      veterinariasTxt[veterinariaIndex].clientes[clienteIndex].nombre =
        nombreCliente;
      veterinariasTxt[veterinariaIndex].clientes[clienteIndex].telefono =
        telCliente;
    }

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(
        "El archivo veterinarias.txt ha sido actualizado correctamente. Cliente agregado exitosamente!"
      );
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }

    this.agregarCliente(cliente);
  }

  public agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }



  public modificarCliente(idVeterinaria: number, idCliente: number, nombre?: string, telefono?: string, visitas?: number, esVip?: boolean) {
    // Leemos los datos existentes del archivo
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Parseamos los datos
    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: any[];
    }[] = JSON.parse(data);

    // Buscamos la veterinaria por su id 
    const veterinariaIndex = veterinariasTxt.findIndex((v) => v.id === idVeterinaria); 
    if (veterinariaIndex === -1) {
        console.log("No se encontró una veterinaria con ese ID.");
        return;
    }

    // Buscamos el cliente dentro de la veterinaria
    const clienteIndex = veterinariasTxt[veterinariaIndex].clientes.findIndex((cliente) => cliente.id === idCliente);

    if (clienteIndex === -1) {
        console.log("No se encontró un cliente con ese ID dentro de la veterinaria.");
        return;
    }

    // Actualizamos el cliente
    if (nombre !== undefined) {
        veterinariasTxt[veterinariaIndex].clientes[clienteIndex].nombre = nombre;
    }
    if (telefono !== undefined) {
        veterinariasTxt[veterinariaIndex].clientes[clienteIndex].telefono = telefono;
    }
    if (visitas !== undefined) {
        veterinariasTxt[veterinariaIndex].clientes[clienteIndex].cantVisitas = visitas;
    }
    if (esVip !== undefined) {
        veterinariasTxt[veterinariaIndex].clientes[clienteIndex].esVip = esVip;
    }

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(`El archivo "veterinarias.txt" ha sido actualizado correctamente.`);
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
}
 public eliminarCliente(id:number) {
  
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
    }[] = JSON.parse(data);

      // Buscar la veterinaria que contiene al cliente
      const veterinariaIndex = veterinariasTxt.findIndex(vet =>
        vet.clientes.some(cliente => cliente.id == id)
    );

    if (veterinariaIndex == -1) {
        console.log("No se encontró ninguna veterinaria que contenga al cliente con ese ID.");
        return;
    }

    // Eliminar el cliente de la lista de clientes
    const clienteIndex = veterinariasTxt[veterinariaIndex].clientes.findIndex(cliente => cliente.id == id);

    if (clienteIndex == -1) {
        console.log("No se encontró el cliente con ese ID.");
        return;
    }

    veterinariasTxt[veterinariaIndex].clientes.splice(clienteIndex, 1);

    // Guardar los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log("Cliente eliminado y archivo actualizado correctamente.");
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }
  //Gestionar Pacientes
  public crearPaciente(cliente?: Cliente, paciente?: Paciente) {

    let nombrePaciente: string = readlineSync.question("Nombre del paciente: ");
    while (!nombrePaciente) {
        nombrePaciente = readlineSync.question("El nombre del paciente no puede estar vacío. Nombre del paciente: ");
    }
    let especie: string = readlineSync.question("Especie del paciente: ");
    while (!especie) {
        especie = readlineSync.question("La especie no puede estar vacía. Especie del paciente: ");
    }
    let idDuenio: number = readlineSync.questionInt("ID del dueño: ");
    while (idDuenio <= 0) {
        idDuenio = readlineSync.questionInt("El ID del dueño debe ser un número mayor a 0. ID del dueño: ");
    }

    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Parseamos los datos
    const veterinariasTxt: {
        nombre: string,
        direccion: string,
        id: number,
        clientes: { id: number, nombre: string }[],
        pacientes: { nombre: string, especie: string, idDuenio: number }[]
    }[] = JSON.parse(data);

    // Verificar si el ID del dueño existe
    const clienteIndex = veterinariasTxt.findIndex(veterinaria => 
        veterinaria.clientes.some(cliente => cliente.id === idDuenio)
    );

    if (clienteIndex === -1) {
        console.log("No se encontró un cliente con ese ID.");
        return; 
    }

    // Si no se pasa un paciente, lo creamos
    if (!paciente) {
        paciente = new Paciente(nombrePaciente, especie, idDuenio);


        veterinariasTxt[clienteIndex].pacientes.push({
            nombre: paciente.getNombre(),
            especie: paciente.getEspecie(),
            idDuenio: paciente.getIdDuenio(),
        });
    } else {

        const pacienteIndex = veterinariasTxt[clienteIndex].pacientes.findIndex(p => p.nombre === paciente?.getNombre());

      if (pacienteIndex === -1) {
        console.log("No se encontró un paciente con ese nombre.");
        return;
      }

        // Si el paciente existe, lo actualizamos
        veterinariasTxt[clienteIndex].pacientes[pacienteIndex] = {
            nombre: nombrePaciente,
            especie: especie,
            idDuenio: idDuenio,
        };
    }

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(
        "El archivo veterinarias.txt ha sido actualizado correctamente. Paciente agregado!"
      );
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }

    // Aseguramos que el paciente sea válido antes de agregarlo
    if (paciente) {
      this.agregarPaciente(paciente);
    } else {
      console.error("Error: El paciente no se pudo crear correctamente.");
    }
  }

 public agregarPaciente(pacientes: Paciente) {
    this.pacientes.push(pacientes);
  }

  public modificarPaciente(id: number, nombre?: string, especie?: string) {
    // Leer los datos del archivo veterinarias.txt
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
      if (!data) {
        console.log("El archivo veterinarias.txt está vacío, inicializándolo...");
        data = "[]"; // Inicializamos el archivo con un arreglo vacío si no hay datos
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Parsear el archivo JSON para obtener las veterinarias y sus pacientes
    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
      pacientes: { nombre: string; especie: string; idDuenio: number }[];
    }[] = JSON.parse(data);

    // Buscar la veterinaria en el arreglo
    for (let i = 0; i < veterinariasTxt.length; i++) {
        // Buscar al paciente dentro de la veterinaria
        const pacienteIndex = veterinariasTxt[i].pacientes.findIndex(paciente => paciente.idDuenio === id);

        if (pacienteIndex !== -1) {
            // Si encontramos al paciente, modificamos sus datos
            if (nombre) veterinariasTxt[i].pacientes[pacienteIndex].nombre = nombre;
            if (especie) veterinariasTxt[i].pacientes[pacienteIndex].especie = especie;

            // Guardar los cambios en el archivo
            try {
              fs.writeFileSync("veterinarias.txt", JSON.stringify(veterinariasTxt, null, 2), "utf8");
              console.log("Paciente modificado con éxito.");
            } catch (error) {
              console.error("Error al guardar el archivo:", error);
            }

            return; // Salir de la función una vez que se haya modificado el paciente
        }
    }

    // Si no encontramos el paciente
    console.log("Paciente no encontrado.");
}


  public eliminarPaciente(id: number) {
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      pacientes: { nombre: string; especie: string; idDuenio: number }[];
    }[] = JSON.parse(data);

      // Buscar la veterinaria que contiene al paciente
      const veterinariaIndex = veterinariasTxt.findIndex(vet =>
        vet.pacientes.some(paciente => paciente.idDuenio == id)
    );

    if (veterinariaIndex == -1) {
        console.log("No se encontró ninguna veterinaria que contenga al cliente con ese ID.");
        return;
    }

    // Eliminar el paciente de la lista 
    const pacienteIndex = veterinariasTxt[veterinariaIndex].pacientes.findIndex(paciente => paciente.idDuenio == id);

    if (pacienteIndex == -1) {
        console.log("No se encontró el paciente con ese ID.");
        return;
    }

    veterinariasTxt[veterinariaIndex].pacientes.splice(pacienteIndex, 1);

    // Guardar los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log("Paciente eliminado y archivo actualizado correctamente.");
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    if (id < 0) {
      throw new Error("ID no puede ser negativo");
    }
    this.id = id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío.");
    }
    this.nombre = nombre;
  }


  public getDireccion(): string {
    return this.direccion;
  }

  public setDireccion(direccion: string): void {
    if (!direccion || direccion.trim() === "") {
      throw new Error("La dirección no puede estar vacía.");
    }
    this.direccion = direccion;
  }

  public getClientes(): Cliente[] {
    return this.clientes;
  }

  public getPacientes(): Paciente[] {
    return this.pacientes;
  }

}
