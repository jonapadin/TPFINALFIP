export class Paciente {

  private nombre: string;
  private especie: string;
  private idDuenio: number;

  constructor(nombre: string, especie: string, idDuenio: number) {
    this.nombre = nombre;
    this.especie = (especie === "Perro" || especie === "Gato") ? especie : "Exotica";
    this.idDuenio = idDuenio;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getEspecie(): string {
    return this.especie;
  }

  public setEspecie(especie: string): void {
    this.especie = especie;
  }

  public getIdDuenio(): number {
    return this.idDuenio;
  }

  public setIdDuenio(idDuenio: number): void {
    this.idDuenio = idDuenio;
  }
}