export class Paciente{
    private id:number;
    private nombre:string;
    private direccion:string;
    private telefono:number;
    private esVip:boolean;
    private cantVisitas:number;
    private especie: string;
    private idDuenio: number;

    constructor(id: number, nombre: string, direccion: string, telefono: number, esVip: boolean, cantVisitas: number, especie: string, idDuenio: number) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas;
        this.especie = especie;
        this.idDuenio = idDuenio;
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

    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    public getTelefono(): number {
        return this.telefono;
    }

    public setTelefono(telefono: number): void {
        this.telefono = telefono;
    }

    public isEsVip(): boolean {
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