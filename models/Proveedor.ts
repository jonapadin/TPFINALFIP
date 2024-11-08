export class Proveedor {
  private id: number;
  private nombre: string;
  private telefono: number;

  constructor(nombre: string, telefono: number) {
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

  public getTelefono(): number {
    return this.telefono;
  }

  public setTelefono(telefono: number): void {
    this.telefono = telefono;
  }
}

