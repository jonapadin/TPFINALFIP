import {Cliente} from "./Cliente"

export class Paciente extends Cliente {
    protected id: number;
    protected nombre: string;
    protected especie : string;
    protected idDuenio: number;

    constructor(id:number, nombre:string,especie:string,idDuenio:number){
        super(id,nombre,telefono,esVip,cantVisitas)
        this.especie = especie;
        this.idDuenio = idDuenio;
    }
}