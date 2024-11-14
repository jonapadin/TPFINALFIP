"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedVeterinaria = void 0;
class RedVeterinaria {
    constructor(veterinaria, proveedor) {
        this.veterinarias = veterinaria;
        this.proveedores = proveedor;
    }
    darAltaVeterinaria(veterinaria) {
        this.veterinarias.push(veterinaria);
    }
    darBajaVeterinaria(id) {
        if (id) {
            this.veterinarias.filter(vet => vet.getId() !== id);
        }
        else {
            console.error("No se encuentra el ID");
        }
    }
    modificarVeterinaria(id, nombre, direccion) {
        const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
        if (veterinaria) {
            if (nombre)
                veterinaria.setNombre(nombre);
            if (direccion)
                veterinaria.setDireccion(direccion);
        }
    }
    agregarProveedor(proveedor) {
        this.proveedores.push(proveedor);
    }
    modificarProveedor(id, nombre, telefono) {
        const proveedor = this.proveedores.find(pr => pr.getId() === id);
        if (proveedor) {
            if (nombre)
                proveedor.setNombre(nombre);
            if (telefono)
                proveedor.setTelefono(telefono);
        }
    }
    eliminarProveedor(id) {
        this.proveedores = this.proveedores.filter((pr => pr.getId() !== id));
    }
    getVeterinarias() {
        return this.veterinarias;
    }
    getProveedores() {
        return this.proveedores;
    }
}
exports.RedVeterinaria = RedVeterinaria;
