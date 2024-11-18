"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(nombre, telefono, esVip, cantVisitas) {
        if (esVip === void 0) { esVip = false; }
        if (cantVisitas === void 0) { cantVisitas = 0; }
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.telefono = telefono;
        this.esVip = esVip;
        this.cantVisitas = cantVisitas;
    }
    Cliente.prototype.getId = function () {
        return this.id;
    };
    Cliente.prototype.setId = function (id) {
        this.id = id;
    };
    Cliente.prototype.getNombre = function () {
        return this.nombre;
    };
    Cliente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Cliente.prototype.getTelefono = function () {
        return this.telefono;
    };
    Cliente.prototype.setTelefono = function (telefono) {
        this.telefono = telefono;
    };
    Cliente.prototype.getEsVip = function () {
        return this.esVip;
    };
    Cliente.prototype.setEsVip = function (esVip) {
        this.esVip = esVip;
    };
    Cliente.prototype.getCantVisitas = function () {
        return this.cantVisitas;
    };
    Cliente.prototype.setCantVisitas = function (cantVisitas) {
        this.cantVisitas = cantVisitas;
    };
    Cliente.prototype.registrarVisita = function () {
        this.cantVisitas++;
        if (this.cantVisitas >= 5) {
            this.esVip = true;
        }
    };
    return Cliente;
}());
exports.Cliente = Cliente;
