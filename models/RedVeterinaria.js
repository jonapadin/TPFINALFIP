"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedVeterinaria = void 0;
var RedVeterinaria = /** @class */ (function () {
    function RedVeterinaria(veterinaria, proveedor) {
        this.veterinarias = veterinaria;
        this.proveedores = proveedor;
    }
    RedVeterinaria.prototype.darAltaVeterinaria = function (veterinaria) {
        var _a;
        (_a = this.veterinarias) === null || _a === void 0 ? void 0 : _a.push(veterinaria);
    };
    RedVeterinaria.prototype.darBajaVeterinaria = function (id) {
        if (id) {
            this.veterinarias.filter(function (vet) { return vet.getId() !== id; });
        }
        else {
            console.error("No se encuentra el ID");
        }
    };
    RedVeterinaria.prototype.modificarVeterinaria = function (id, nombre, direccion) {
        var veterinaria = this.veterinarias.find(function (veterinaria) { return veterinaria.getId() === id; });
        if (veterinaria) {
            if (nombre)
                veterinaria.setNombre(nombre);
            if (direccion)
                veterinaria.setDireccion(direccion);
        }
    };
    RedVeterinaria.prototype.agregarProveedor = function (proveedor) {
        this.proveedores.push(proveedor);
    };
    RedVeterinaria.prototype.modificarProveedor = function (id, nombre, telefono) {
        var proveedor = this.proveedores.find(function (pr) { return pr.getId() === id; });
        if (proveedor) {
            if (nombre)
                proveedor.setNombre(nombre);
            if (telefono)
                proveedor.setTelefono(telefono);
        }
    };
    RedVeterinaria.prototype.eliminarProveedor = function (id) {
        this.proveedores = this.proveedores.filter((function (pr) { return pr.getId() !== id; }));
    };
    return RedVeterinaria;
}());
exports.RedVeterinaria = RedVeterinaria;
