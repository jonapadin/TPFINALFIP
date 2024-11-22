import { Proveedor } from "./Proveedor"
import { Veterinaria } from "./Veterinaria";

export class RedVeterinaria {
 private  veterinarias: Veterinaria[] = [];
 private proveedores: Proveedor[] = [];


  constructor() {
    this.veterinarias = [];  
    this.proveedores = [];   
}

  public darAltaVeterinaria(veterinaria: Veterinaria) {
    this.veterinarias.push(veterinaria); 
  }

  public darBajaVeterinaria(id: number) {
    const veterinaria = this.veterinarias.find(vet => vet.getId() === id);
    if (veterinaria) {
      // Eliminar veterinaria
      this.veterinarias = this.veterinarias.filter(vet => vet.getId() !== id);
  
      // Mostrar detalles de la veterinaria eliminada
      console.log(`Veterinaria ${veterinaria.getNombre()} eliminada con éxito!`);
    } else {
      console.error("No se encuentra la veterinaria con el ID proporcionado.");
    }
  }

  public modificarVeterinaria(id?: number, nombre?: string, direccion?: string) {
    const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }
  }

  agregarProveedor(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
  }

  modificarProveedor(id: number, nombre?: string, telefono?: string) {
    const proveedor = this.proveedores.find(pr => pr.getId() === id);
    if (proveedor) {
      if (nombre) proveedor.setNombre(nombre);
      if (telefono) proveedor.setTelefono(telefono);
    }
  }

  eliminarProveedor(id: number) {
    this.proveedores = this.proveedores.filter((pr) => pr.getId() !== id);
  }

  public getVeterinarias(): Veterinaria[] {
    return this.veterinarias; 
  }

  public getProveedores():Proveedor[] {
    return this.proveedores;
  }
}