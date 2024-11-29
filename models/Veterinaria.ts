import { Fs } from '../interface';
import { Cliente } from './Cliente';
import { Paciente } from './Paciente';
import * as readlineSync from 'readline-sync';
import * as fs from "fs";

export class Veterinaria implements Fs{


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

    //  actualizarCliente('veterinarias.txt', veterinaria);
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


guardarArchivo(nombreArchivo: string, datos: any[]):void{

};
leerArchivo():void{
  try {
    // Leemos el archivo veterinarias.txt de forma síncrona
    const data = fs.readFileSync("veterinarias.txt", "utf-8");
    console.log(data);
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
actualizarArchivo():void{

};

}