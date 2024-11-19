"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
var Paciente = /** @class */ (function () {
    function Paciente(nombre, especie, idDuenio) {
        this.nombre = nombre;
        this.especie = (especie === "Perro" || especie === "Gato") ? especie : "Exotica";
        this.idDuenio = idDuenio;
    }
    Paciente.prototype.getNombre = function () {
        return this.nombre;
    };
    Paciente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Paciente.prototype.getEspecie = function () {
        return this.especie;
    };
    Paciente.prototype.setEspecie = function (especie) {
        this.especie = especie;
    };
    Paciente.prototype.getIdDuenio = function () {
        return this.idDuenio;
    };
    Paciente.prototype.setIdDuenio = function (idDuenio) {
        this.idDuenio = idDuenio;
    };
    return Paciente;
}());
exports.Paciente = Paciente;
