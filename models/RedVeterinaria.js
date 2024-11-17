import { Proveedor } from "./Proveedor.js";
import { Veterinaria } from "./Veterinaria.js";

export class RedVeterinaria {
  constructor(veterinarias, proveedores) {
    this.veterinarias = veterinarias || [];
    this.proveedores = proveedores || [];
  }

  async cargarDatos(archivo) {
    await cargarDatosDesdeArchivo(archivo, this);
  }

  darAltaVeterinaria(veterinaria) {
    this.veterinarias.push(veterinaria);
  }

  darBajaVeterinaria(id) {
    if (id) {
      this.veterinarias = this.veterinarias.filter(vet => vet.getId() !== id);
    } else {
      console.error("No se encuentra el ID");
    }
  }

  modificarVeterinaria(id, nombre, direccion) {
    const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }
  }

  agregarProveedor(proveedor) {
    this.proveedores.push(proveedor);
  }

  modificarProveedor(id, nombre, telefono) {
    const proveedor = this.proveedores.find(pr => pr.getId() === id);
    if (proveedor) {
      if (nombre) proveedor.setNombre(nombre);
      if (telefono) proveedor.setTelefono(telefono);
    }
  }

  eliminarProveedor(id) {
    this.proveedores = this.proveedores.filter(pr => pr.getId() !== id);
  }
}
