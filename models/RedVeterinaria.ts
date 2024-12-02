
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
  crearVeterinaria(){
    const nombre = readlineSync.question("Nombre de la veterinaria: ");
    const direccion = readlineSync.question("Dirección: ");
    const nuevaVeterinaria = new Veterinaria(nombre, direccion);
    // Agregar veterinaria a la red
    this.darAltaVeterinaria(nuevaVeterinaria);
    console.log("Veterinaria agregada", nuevaVeterinaria);
  
    // Guardar veterinarias
    this.guardarArchivo("veterinarias.txt", this.getVeterinarias());
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
    this.guardarArchivo("veterinarias.txt", this.getVeterinarias());
  }

  public modificarVeterinaria(id?: number, nombre?: string, direccion?: string) {

    const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id);
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }

    
    console.log("Lista actualizada:", this.getVeterinarias());
    this.guardarArchivo("veterinarias.txt", this.getVeterinarias());
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
  
    this.guardarArchivo("proveedores.txt", this.getProveedores());
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
    this.guardarArchivo("proveedores.txt", this.getProveedores());
  }

  eliminarProveedor(id: number) {
    this.proveedores = this.proveedores.filter((pr) => pr.getId() !== id);
    console.log("Lista actualizada:", this.getProveedores());
    this.guardarArchivo("proveedores.txt", this.getProveedores());
  }

  public getVeterinarias(): Veterinaria[] {
    return this.veterinarias; 
  }

  public getProveedores():Proveedor[] {
    return this.proveedores;
  }


  guardarArchivo(nombreArchivo: string, datos: any[]):void{
    try {
      // Convertir los datos a formato JSON
      const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible
  
      fs.writeFileSync(nombreArchivo, contenido, "utf8");
      console.log(`El archivo se guardó correctamente como ${nombreArchivo}`);
    } catch (err) {
      console.error("Hubo un error al guardar el archivo: ", err);
    }
  };

  leerArchivo():void{
    try {
      // Leemos el archivo veterinarias.txt de forma síncrona
      const data = fs.readFileSync("veterinarias.txt", "utf-8");
  
      // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
      const veterinariasTxt: { nombre: string; direccion: string; id: number }[] =
        JSON.parse(data);
  
      // Convertimos los objetos del JSON en instancias de la clase Veterinaria
      const listaVeterinarias: Veterinaria[] = veterinariasTxt.map(
        (vete) => new Veterinaria(vete.nombre, vete.direccion, vete.id) // Creamos la instancia de Veterinaria pasando el id
      );
  
      // Mostramos la información de las veterinarias
      listaVeterinarias.forEach((veterinaria, i) => {
        console.log(`Veterinaria ${i + 1}:`);
        console.log(`ID: ${veterinaria.getId()}`);
        console.log(`Nombre: ${veterinaria.getNombre()}`);
        console.log(`Dirección: ${veterinaria.getDireccion()}`);
        console.log("---");
      });
    } catch (err) {
      console.error("Error al leer o parsear el archivo veterinarias.txt:", err);
    }
  };


  actualizarArchivo():void{

  };
}
