export class Proveedor {
  private id: number;
  private nombre: string;
  private telefono: string;

  constructor(nombre: string, telefono: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.nombre = nombre;
    this.telefono = telefono;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getTelefono(): string {
    return this.telefono;
  }

  public setTelefono(telefono: string): void {
    this.telefono = telefono;
  }
}