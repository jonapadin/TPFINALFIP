<<<<<<< HEAD
import {Cliente} from "./Cliente";

export class Paciente extends Cliente {
    protected especie : string;
    protected idDuenio: number;

    constructor(id:number, nombre:string,especie:string,idDuenio:number){
        super(id,nombre,direccion,telefono,esVip,cantVisitas)
        this.especie = especie;
        this.idDuenio = idDuenio;
    }
}
=======
import { Cliente } from "./Cliente"

export class Paciente extends Cliente {
  private especie: string;
  private idDuenio: number;

  constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean, cantVisitas: number, especie: string, idDuenio: number) {
    super(id, nombre, direccion, telefono, esVip, cantVisitas)
    this.especie = especie;
    this.idDuenio = idDuenio;
  }
}
>>>>>>> refs/remotes/origin/main
