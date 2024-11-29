import { Proveedor } from "./Proveedor"
import { Veterinaria } from "./Veterinaria";
import * as readlineSync from 'readline-sync';

export class RedVeterinaria {
 private  veterinarias: Veterinaria[] = [];
 private proveedores: Proveedor[] = [];


  constructor() {
    this.veterinarias = [];  
    this.proveedores = [];   
}

//Gestionar Veterinaria
  crearVeterinaria(){
    const nombre = readlineSync.question("Nombre de la veterinaria: ");
    const direccion = readlineSync.question("Dirección: ");
    const nuevaVeterinaria = new Veterinaria(nombre, direccion);
    // Agregar veterinaria a la red
    this.darAltaVeterinaria(nuevaVeterinaria);
    console.log("Veterinaria agregada", nuevaVeterinaria);
  
    // Guardar veterinarias
    // guardarEnArchivo("veterinarias.txt", redVeterinaria.getVeterinarias());
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

    console.log("Lista actualizada:", this.getVeterinarias());
    // guardarEnArchivo("veterinarias.txt", redVeterinaria.getVeterinarias());
  }

  public modificarVeterinaria(id?: number, nombre?: string, direccion?: string) {

    const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }

    
    console.log("Lista actualizada:", this.getVeterinarias());
  
    // guardarEnArchivo("veterinarias.txt", redVeterinaria.getVeterinarias());
  }




//Gestionar Proveedor
  crearProveedor(){
    const nombreProveedor = readlineSync.question("Nombre del proveedor: ");
    const Telefono = readlineSync.question("Telefono: ");
    const proveedor1 = new Proveedor(nombreProveedor, Telefono);
  
    this.agregarProveedor(proveedor1);
  
    console.log(
      "Proveedores en la red después de agregar:",
      this.getProveedores()
    );
  
    // guardarEnArchivo("proveedores.txt", redVeterinaria.getProveedores());
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

    console.log("Lista actualizada:", this.getProveedores());
    // guardarEnArchivo("proveedores.txt", redVeterinaria.getProveedores());
  }

  eliminarProveedor(id: number) {
    this.proveedores = this.proveedores.filter((pr) => pr.getId() !== id);
    console.log("Lista actualizada:", this.getProveedores());
    // guardarEnArchivo("proveedores.txt", redVeterinaria.getProveedores());
  }

  public getVeterinarias(): Veterinaria[] {
    return this.veterinarias; 
  }

  public getProveedores():Proveedor[] {
    return this.proveedores;
  }
}