"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var Proveedor = /** @class */ (function () {
    function Proveedor(nombre, telefono) {
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.telefono = telefono;
    }
    Proveedor.prototype.getId = function () {
        return this.id;
    };
    Proveedor.prototype.setId = function (id) {
        this.id = id;
    };
    Proveedor.prototype.getNombre = function () {
        return this.nombre;
    };
    Proveedor.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Proveedor.prototype.getTelefono = function () {
        return this.telefono;
    };
    Proveedor.prototype.setTelefono = function (telefono) {
        this.telefono = telefono;
    };
    return Proveedor;
}());
exports.Proveedor = Proveedor;
