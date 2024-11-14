import { Cliente } from './Cliente';
import { Paciente } from './Paciente'

export class Veterinaria {

  private id: number;
  private nombre: string;
  private direccion: string;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];

  constructor(nombre: string, direccion: string,) {
    this.id = Math.floor(Math.random() * 1000);
    this.nombre = nombre;
    this.direccion = direccion;
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  modificarCliente(id: number, nombre?: string, telefono?: number) {
    const cliente = this.clientes.find(c => c.getId() === id);
    if (cliente) {
      if (nombre) cliente.setNombre(nombre);
      if (telefono) cliente.setTelefono(telefono);
    }
  }
  eliminarCliente(id: number) {
    this.clientes = this.clientes.filter((c => c.getId() !== id));
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
}