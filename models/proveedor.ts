import { Veterinaria } from "./Veterinaria";
export class Proveedor {
    private id: string;
    private nombre: string;
    private telefono: number;

    constructor(id: string, nombre: string, telefono: number){
        this.id=id;
        this.nombre=nombre;
        this.telefono=telefono;
    }
}

