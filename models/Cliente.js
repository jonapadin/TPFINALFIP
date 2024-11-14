"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(nombre, telefono, esVip = false, cantVisitas = 0) {
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getTelefono() {
        return this.telefono;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }
    getEsVip() {
        return this.esVip;
    }
    setEsVip(esVip) {
        this.esVip = esVip;
    }
    getCantVisitas() {
        return this.cantVisitas;
    }
    setCantVisitas(cantVisitas) {
        this.cantVisitas = cantVisitas;
    }
    registrarVisita() {
        this.cantVisitas++;
        if (this.cantVisitas >= 5) {
            this.esVip = true;
        }
    }
}
exports.Cliente = Cliente;
