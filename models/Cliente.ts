
import { Veterinaria } from "./Veterinaria";
export class Cliente extends Veterinaria {
    protected telefono: number
    protected esVip: boolean;
    protected cantVisitas: number;

    constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean, cantVisitas: number) {
        super(id, nombre, direccion)
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas
    }

 public getId(): number {
    return this.id;
 }
 public setId(Id:number){
    this.id = Id;
    
 }
}