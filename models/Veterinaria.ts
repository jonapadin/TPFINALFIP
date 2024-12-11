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



  public modificarCliente(id: number, nombre?: string, telefono?: string, visitas?: number, esVip?: boolean) {
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

    // Imprimimos las veterinarias y sus clientes para depuración
    console.log("Veterinarias en el archivo:", veterinariasTxt);

    // Buscamos la veterinaria por su id 
    const veterinariaIndex = veterinariasTxt.findIndex((v: any) => v.id == id); 
    if (veterinariaIndex == -1) {
        console.log("No se encontró una veterinaria con ese ID.");
        return;
    }

    // Buscamos el cliente dentro de la veterinaria
    const clienteIndex = veterinariasTxt[veterinariaIndex].clientes.findIndex((cliente: any) => cliente.id == id);

    if (clienteIndex == -1) {
        console.log("No se encontró un cliente con ese ID dentro de la veterinaria.");
        return;
    }

    // Actualizamos el cliente
    veterinariasTxt[veterinariaIndex].clientes[clienteIndex].nombre = nombre;
    veterinariasTxt[veterinariaIndex].clientes[clienteIndex].telefono =
      telefono;
    veterinariasTxt[veterinariaIndex].clientes[clienteIndex].cantVisitas =
    visitas;

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(
        `El archivo ${"veterinarias.txt"} ha sido actualizado correctamente.`
      );
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
    const paciente = this.pacientes.find(pac => pac.getIdDuenio() == id);
    if (paciente) {
      if (nombre) paciente.setNombre(nombre);
      if (especie) paciente.setEspecie(especie);
    }

    // Leer datos existentes del archivo
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Parsear datos
    let veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      pacientes: { idDuenio: number; nombre: string; especie: string }[];
    }[];
    try {
      veterinariasTxt = JSON.parse(data);
    } catch (error) {
      console.error("Error al parsear el contenido del archivo:", error);
      return;
    }

    // Buscar la veterinaria por su ID
    const veterinariaIndex = veterinariasTxt.findIndex(v => v.id == this.getId());
    if (veterinariaIndex == -1 || !veterinariasTxt[veterinariaIndex].pacientes) {
        console.error("Veterinaria no encontrada o no tiene pacientes.");
        return;
    }

    // Buscar el paciente dentro de la veterinaria
    const pacienteIndex = veterinariasTxt[veterinariaIndex].pacientes.findIndex(p => p.idDuenio == id);
    if (pacienteIndex == -1) {
        console.error("No se encontró un paciente con ese ID.");
        return;
    }

    // Actualizar los datos del paciente
    if (nombre)
      veterinariasTxt[veterinariaIndex].pacientes[pacienteIndex].nombre =
        nombre;
    if (especie)
      veterinariasTxt[veterinariaIndex].pacientes[pacienteIndex].especie =
        especie;

    // Guardar los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(
        "El archivo veterinarias.txt ha sido actualizado correctamente. Paciente modificado con éxito!"
      );
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
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
  public getPacientes(): Paciente[] {
    return this.pacientes;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setDireccion(direccion: string): void {
    this.direccion = direccion;
  }
}
