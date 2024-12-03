
import { Proveedor } from "./Proveedor"
import { Veterinaria } from "./Veterinaria";
import * as readlineSync from 'readline-sync';
import * as fs from "fs";



export class RedVeterinaria {
 private  veterinarias: Veterinaria[] = [];
 private proveedores: Proveedor[] = [];


  constructor() {
    this.veterinarias = [];  
    this.proveedores = [];   
}

//Gestionar Veterinaria
 public crearVeterinaria(){

    const nombre = readlineSync.question("Nombre de la veterinaria: ");
    const direccion = readlineSync.question("Dirección: ");

    if (!nombre || !direccion) {
      console.error("Por favor ingresa datos válidos.");
      return;
  }

    const nuevaVeterinaria = new Veterinaria(nombre, direccion);

    let data: string;
    try {
        data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return;
    }
     // Parseamos los datos
     const veterinariasTxt: {
      id: number,
      nombre: string,
      direccion: string,
      clientes: { id: number, nombre: string, telefono: string, visitas: number, esVip: boolean }[],
      pacientes: { nombre: string, especie: string, idDuenio: number }[]
     }[] = JSON.parse(data);

      // Verificamos si ya existe una veterinaria con el mismo nombre
    const veterinariaExistente = veterinariasTxt.find(vet => vet.nombre === nombre);

    if (veterinariaExistente) {
        console.log("Ya existe una veterinaria con ese nombre.");
        return;
    }

      // Agregamos la nueva veterinaria al arreglo
      const nuevaVeterinariaData = {
        id: nuevaVeterinaria.getId(),
        nombre: nuevaVeterinaria.getNombre(),
        direccion: nuevaVeterinaria.getDireccion(),
        clientes: [],
        pacientes: []
    };

    veterinariasTxt.push(nuevaVeterinariaData);

     // Guardamos los datos actualizados en el archivo
     try {
       fs.writeFileSync("veterinarias.txt", JSON.stringify(veterinariasTxt, null, 2), "utf8");
       console.log("Veterinaria creada exitosamente!");
     } catch (error) {
        console.error("Error al guardar el archivo:", error);
     }

         // Agregar la veterinaria a la lista interna
      this.darAltaVeterinaria(nuevaVeterinaria);

  }


  public modificarVeterinaria(id?: number, nombre?: string, direccion?: string) {

    const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }

    let data: string;
    try {
        data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return [];
    }

    const veterinariasTxt: {
      id: number,
      nombre: string,
      direccion: string,
      clientes: { id: number, nombre: string, telefono: string, visitas: number, esVip: boolean }[],
      pacientes: { nombre: string, especie: string, idDuenio: number }[]
     }[] = JSON.parse(data);

     const index = veterinariasTxt.findIndex(vet => vet.id === id);

     if (index !== -1) {
      if (nombre) veterinariasTxt[index].nombre = nombre;
      if (direccion) veterinariasTxt[index].direccion = direccion;

      // Guardamos los cambios en el archivo
      try {
          fs.writeFileSync("veterinarias.txt", JSON.stringify(veterinariasTxt, null, 2), "utf8");
          console.log("Veterinaria modificada con éxito!");
      } catch (error) {
          console.error("Error al guardar el archivo:", error);
      }
     }else {
      console.log("Veterinaria no encontrada.");
  }
     

  }



  public darAltaVeterinaria(veterinaria: Veterinaria) {
    this.veterinarias.push(veterinaria); 
  }

  public darBajaVeterinaria(id: number) {
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const veterinariasTxt: {
      id: number,
      nombre: string,
      direccion: string,
      clientes: { id: number, nombre: string, telefono: string, visitas: number, esVip: boolean }[],
      pacientes: { nombre: string, especie: string, idDuenio: number }[]
     }[] = JSON.parse(data);

     const veterinariaIndex = veterinariasTxt.findIndex(vet => vet.id === id);

     if (veterinariaIndex === -1) {
      console.error("No se encontró la veterinaria con el ID proporcionado.");
      return;
     }

     const veterinariaEliminada = veterinariasTxt.splice(veterinariaIndex, 1);

     try {
      fs.writeFileSync("veterinarias.txt", JSON.stringify(veterinariasTxt, null, 2), "utf8");
      console.log(`Veterinaria ${veterinariaEliminada[0].nombre} eliminada con éxito.`);
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }


  }





//Gestionar Proveedor
  crearProveedor(){
    const nombreProveedor = readlineSync.question("Nombre del proveedor: ");
    const Telefono = readlineSync.question("Telefono: ");
    const proveedor1 = new Proveedor(nombreProveedor, Telefono);
  

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
