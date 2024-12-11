export class Paciente {

  private nombre: string ;
  private especie: string ;
  private idDuenio: number;


  constructor(nombre: string, especie: string, idDuenio: number) {
    this.nombre = nombre;
    this.especie = (especie.toLowerCase() == "perro" || especie.toLowerCase() == "gato") ? especie : "exotica";
    this.idDuenio = idDuenio;

    this.setNombre(nombre);
    this.setEspecie(especie);
    this.setIdDuenio(idDuenio);

  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    if (!nombre) {
      throw new Error("El nombre no puede ser vacío");
    }
    this.nombre = nombre;
  }

  public getEspecie(): string {
    return this.especie;
  }

  public setEspecie(especie: string): void {
    if (!especie) {
      throw new Error("La especie no puede ser vacía");
    }
    this.especie = especie;
  }

  public getIdDuenio(): number {
    return this.idDuenio;
  }

  public setIdDuenio(idDuenio: number): void {
    if (idDuenio < 0) {
      throw new Error("El ID del dueño no puede ser negativo");
    }
    this.idDuenio = idDuenio;
  }
}