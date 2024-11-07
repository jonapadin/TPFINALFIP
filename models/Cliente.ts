
import { Veterinaria } from "./Veterinaria";
export class Cliente extends Veterinaria {
    private id: number;
    private nombre: string;
    private telefono: number;
    private esVip: boolean;
    private cantVisitas: number;

    constructor(id:number,nombre:string,telefono:number,esVip:boolean,cantVisitas:number){
    super(id,nombre,direccion)
    this.telefono=telefono;
    this.esVip=esVip;
    this.cantVisitas=cantVisitas




}
}