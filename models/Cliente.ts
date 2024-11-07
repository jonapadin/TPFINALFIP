
import { Veterinaria } from "./Veterinaria";
export class Cliente extends Veterinaria {
    protected telefono: number
    protected esVip: boolean;
    protected cantVisitas: number;

    constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean, cantVisitas: number) {
        super(id, nombre, direccion,telefono)
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas
    }

    public getId(): number {
        return this.id;
    }
    public setId(Id: number) {
        this.id = Id;
    }
    getNombre(): string {
        return this.nombre
    }
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    getDireccion(): string {
        return this.direccion;
    }
    setDireccion(direccion: string): void {
        this.direccion = direccion
    }
    getTelefono(): number {
        return this.telefono
    }
    setTelefono(telefono: number): void {
        this.telefono = telefono
    }
    getEsVip(): boolean {
        return this.esVip
    }
    setEsVip(esVip: boolean): void {
        this.esVip = esVip
    }
    getCantVisitas(): number {
        return this.cantVisitas
    }
    setCantVisitas(cantVisitas: number): void {
        this.cantVisitas = cantVisitas;
    }
}