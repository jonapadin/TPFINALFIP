import { Cliente}  from './Cliente.ts';
import { Proveedor } from './Proveedor.ts';
import { Paciente } from './Paciente'
export class Veterinaria {
  protected id: number;
  protected nombre: string;
  protected direccion: string;

  private clientes: Cliente[] = [];
  private proveedores: Proveedor[] = [];
  private pacientes: Paciente[] = [];

  constructor(id: number, nombre: string, direccion: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
  }


  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  modificarCliente(id: number, nombre: string, telefono: number) {
    const cliente = this.clientes.find((c => c.id === id));
    if (cliente) {
      if (nombre) cliente.setNombre = nombre;
      if (telefono) cliente.setTelefono = telefono;
    }
  }

  eliminarCliente(id: number) {
    this.clientes = this.clientes.filter((c => c.id !== id));
  }

  agregarPaciente(paciente: Paciente) {
    this.clientes.push(paciente);
  }

  modificarPaciente(id: number, nombre: string, telefono: number) {
    const paciente = this.pacientes.find((c => c.id === id));
    if (paciente) {
      if (nombre) paciente.setNombre = nombre;
      if (telefono) paciente.setTelefono = telefono;
    }
  }

  eliminarPaciente(id: number) {
    this.pacientes = this.pacientes.filter((pac => pac.id !== id));
  }

  agregarProveedor(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
  }

  modificarProveedor(id: number, nombre: string, telefono: number) {
    const proveedor = this.proveedores.find((c => c.id === id));
    if (proveedor) {
      if (nombre) proveedor.setNombre = nombre;
      if (telefono) proveedor.setTelefono = telefono;
    }
  }

  eliminarProveedor(id: number) {
    this.proveedores = this.proveedor.filter((pr => pr.id !== id));
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
