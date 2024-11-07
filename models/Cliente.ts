
import { Veterinaria } from "./Veterinaria";
export class Cliente extends Veterinaria {
    private telefono: number
    private esVip: boolean;
    private cantVisitas: number;

    constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean, cantVisitas: number) {
        super(id, nombre, direccion)
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas
    }

 public getId(): number {
    
 }
}