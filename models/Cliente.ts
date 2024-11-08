export class Cliente {
  private id: number;
  private nombre: string;
  private direccion: string;
  private telefono: number;
  private esVip: boolean;
  private cantVisitas: number;

  constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean = false, cantVisitas: number = 0) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.esVip = esVip;
    this.cantVisitas = cantVisitas;
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

  public getDireccion(): string {
    return this.direccion;
  }

  public setDireccion(direccion: string): void {
    this.direccion = direccion;
  }

  public getTelefono(): number {
    return this.telefono;
  }

  public setTelefono(telefono: number): void {
    this.telefono = telefono;
  }

  public getEsVip(): boolean {
    return this.esVip;
  }

  public setEsVip(esVip: boolean): void {
    this.esVip = esVip;
  }

  public getCantVisitas(): number {
    return this.cantVisitas;
  }

  public setCantVisitas(cantVisitas: number): void {
    this.cantVisitas = cantVisitas;
  }


  public registrarVisita(): void {
    this.cantVisitas++;
    if (this.cantVisitas >= 5) {
      this.esVip = true;
    }
  }
}
