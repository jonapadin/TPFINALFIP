"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion) {
        this.clientes = [];
        this.pacientes = [];
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.direccion = direccion;
    }
    Veterinaria.prototype.agregarCliente = function (cliente) {
        this.clientes.push(cliente);
    };
    Veterinaria.prototype.modificarCliente = function (id, nombre, telefono) {
        var cliente = this.clientes.find(function (c) { return c.getId() === id; });
        if (cliente) {
            if (nombre)
                cliente.setNombre(nombre);
            if (telefono)
                cliente.setTelefono(telefono);
        }
    };
    Veterinaria.prototype.eliminarCliente = function (id) {
        this.clientes = this.clientes.filter((function (c) { return c.getId() !== id; }));
    };
    Veterinaria.prototype.agregarPaciente = function (pacientes) {
        this.pacientes.push(pacientes);
    };
    Veterinaria.prototype.modificarPaciente = function (id, nombre, especie) {
        var paciente = this.pacientes.find(function (pac) { return pac.getIdDuenio() === id; });
        if (paciente) {
            if (nombre)
                paciente.setNombre(nombre);
            if (especie)
                paciente.setEspecie(especie);
        }
    };
    Veterinaria.prototype.eliminarPaciente = function (id) {
        this.pacientes = this.pacientes.filter((function (pac) { return pac.getIdDuenio() !== id; }));
    };
    Veterinaria.prototype.setId = function (id) {
        this.id = id;
    };
    Veterinaria.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Veterinaria.prototype.setDireccion = function (direccion) {
        this.direccion = direccion;
    };
    Veterinaria.prototype.getId = function () {
        return this.id;
    };
    Veterinaria.prototype.getNombre = function () {
        return this.nombre;
    };
    Veterinaria.prototype.getDireccion = function () {
        return this.direccion;
    };
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
