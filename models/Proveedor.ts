export class Proveedor {
  private id: number;
  private nombre: string;
  private telefono: string;

  constructor(nombre: string, telefono: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.nombre = nombre;
    this.telefono = telefono;
    this.setNombre(nombre); 
    this.setTelefono(telefono);  
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    if (id <= 0) {
      throw new Error("El ID debe ser un número positivo.");
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

  public getTelefono(): string {
    return this.telefono;
  }

  public setTelefono(telefono: string): void {
    // Validamos si el teléfono es un número válido con una expresión regular
    const telefonoRegex = /^[0-9]{10}$/;  // Asegura que tenga 10 dígitos numéricos
    if (!telefonoRegex.test(telefono)) {
      console.error("El teléfono debe tener exactamente 10 dígitos numéricos.");
    }
    this.telefono = telefono;
  }
}