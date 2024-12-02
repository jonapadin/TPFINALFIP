import { Cliente } from './Cliente';
import { Paciente } from './Paciente';
import * as readlineSync from 'readline-sync';
import * as fs from "fs";


export class Veterinaria  {


  private id: number;
  private nombre: string;
  private direccion: string;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];


  constructor(nombre: string, direccion: string, id?: number) {

    this.id = id ?? Math.floor(Math.random() * 1000);
    this.nombre = nombre;
    this.direccion = direccion;
}
//Gestionar clientes
  crearCliente(){
    const nombreCliente= readlineSync.question("Nombre del Cliente: ");
    const telCliente  = readlineSync.question("Telefono: ");
    const visitas = readlineSync.questionInt("Cantidad de visitas iniciales: ");
    const cliente1 = new Cliente(nombreCliente,telCliente);

     for (let i = 0; i < visitas; i++) {
        cliente1.registrarVisita();
    }

     this.agregarCliente(cliente1);

      this.actualizarCliente('veterinarias.txt',this.getId(),cliente1.getId(),cliente1.getNombre(),cliente1.getTelefono());
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  modificarCliente(id: number, nombre?: string, telefono?: string) {
    const cliente = this.clientes.find(c => c.getId() === id);
    if (cliente) {
      if (nombre) cliente.setNombre(nombre);
      if (telefono) cliente.setTelefono(telefono);
    }
  }
  eliminarCliente(id: number) {
    this.clientes = this.clientes.filter((c => c.getId() !== id));
    console.log("Lista actualizada:", this.getClientes());
    // actualizarCliente("veterinarias.txt", veterinaria);
  }


  //Gestionar Pacientes

  crearPaciente(){
    const nombrePaciente = readlineSync.question("Nombre del paciente: ");
    const especie = readlineSync.question("Especie del paciente: ");
    const idDuenio = readlineSync.questionInt("ID del dueño: ");

    const paciente1 = new Paciente(nombrePaciente, especie, idDuenio);
    this.agregarPaciente(paciente1);
  
    // actualizarCliente("veterinarias.txt", veterinaria);
  }

  agregarPaciente(pacientes: Paciente) {
    this.pacientes.push(pacientes);
  }

  modificarPaciente(id: number, nombre?: string, especie?: string) {
    const paciente = this.pacientes.find(pac => pac.getIdDuenio() === id);
    if (paciente) {
      if (nombre) paciente.setNombre(nombre);
      if (especie) paciente.setEspecie(especie);
    }

    // actualizarCliente("veterinarias.txt", veterinaria);
  }




  eliminarPaciente(id: number) {
    this.pacientes = this.pacientes.filter((pac => pac.getIdDuenio() !== id));
  }


 actualizarCliente(nombreArchivo: string, veterinariaId: number, clienteId: number, nuevoNombre: string, nuevoTelefono: string) {
    // Leemos los datos existentes del archivo
    let data: string;
    try {
        data = fs.readFileSync(nombreArchivo, "utf-8");
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return;
    }

    // Parseamos los datos
    const veterinariasTxt: { id: number, nombre: string, direccion: string, clientes: any[] }[] = JSON.parse(data);

    // Buscamos la veterinaria por su id
    const veterinariaIndex = veterinariasTxt.findIndex((v: any) => v.id === veterinariaId);

    if (veterinariaIndex === -1) {
        console.log("No se encontró una veterinaria con ese ID.");
        return;
    }

    // Buscamos el cliente dentro de la veterinaria
    const clienteIndex = veterinariasTxt[veterinariaIndex].clientes.findIndex((cliente: any) => cliente.id === clienteId);

    if (clienteIndex === -1) {
        console.log("No se encontró un cliente con ese ID.");
        return;
    }

    // Actualizamos el cliente
    veterinariasTxt[veterinariaIndex].clientes[clienteIndex].nombre = nuevoNombre;
    veterinariasTxt[veterinariaIndex].clientes[clienteIndex].telefono = nuevoTelefono;

    // Guardamos los datos actualizados en el archivo
    try {
        fs.writeFileSync(nombreArchivo, JSON.stringify(veterinariasTxt, null, 2), "utf8");
        console.log(`El archivo ${nombreArchivo} ha sido actualizado correctamente.`);
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
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

  public getId(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }



  public getDireccion(): string {
    return this.direccion;
  }

  public getClientes(){
    return this.clientes;
  }

  public getPacientes(){
    return this.pacientes;
  }
}