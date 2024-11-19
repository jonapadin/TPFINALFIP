export class Cliente {
  private id: number;
  private nombre: string;
  private telefono: string;
  private esVip: boolean;
  private cantVisitas: number;

  constructor(nombre: string, telefono: string, esVip: boolean = false, cantVisitas: number = 0) {
    this.id = Math.floor(Math.random() * 1000);
    this.nombre = nombre;
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

  public getTelefono(): string {
    return this.telefono;
  }

  public setTelefono(telefono: string): void {
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
