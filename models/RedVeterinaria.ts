import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import * as readlineSync from "readline-sync";
import * as fs from "fs";

export class RedVeterinaria {
  private veterinarias: Veterinaria[] = [];
  private proveedores: Proveedor[] = [];

  constructor() {
    this.veterinarias = [];
    this.proveedores = [];
  }

  //Gestionar Veterinaria
  public crearVeterinaria(): void {
    const nombre = readlineSync.question("Nombre de la veterinaria: ");
    const direccion = readlineSync.question("Direccion: ");

    if (!nombre || !direccion) {
      console.error("Por favor ingresa datos validos.");
      return;
    }
    const nuevaVeterinaria: Veterinaria = new Veterinaria(nombre, direccion);

    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }
    // Parseamos los datos
    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
      pacientes: { nombre: string; especie: string; idDuenio: number }[];
    }[] = JSON.parse(data);

    // Verificamos si ya existe una veterinaria con el mismo nombre
    const veterinariaExistente = veterinariasTxt.find(
      (vet) => vet.nombre === nombre
    );

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
      pacientes: [],
    };

    veterinariasTxt.push(nuevaVeterinariaData);

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log("Veterinaria creada exitosamente!");
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }

    // Agregar la veterinaria a la lista interna
    this.darAltaVeterinaria(nuevaVeterinaria);
  }

  public modificarVeterinaria(
    id?: number,
    nombre?: string,
    direccion?: string
  ) {
    const veterinaria = this.veterinarias.find(
      (veterinaria) => veterinaria.getId() === id
    );
    if (veterinaria) {
      if (nombre) veterinaria.setNombre(nombre);
      if (direccion) veterinaria.setDireccion(direccion);
    }

    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
      if (!data) {
        console.log(
          "El archivo veterinarias.txt está vacío, inicializándolo..."
        );
        data = "[]"; // Inicializamos el archivo con un arreglo vacío
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }

    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
      pacientes: { nombre: string; especie: string; idDuenio: number }[];
    }[] = JSON.parse(data);

    const index = veterinariasTxt.findIndex((vet) => vet.id === id);

    if (index !== -1) {
      if (nombre) veterinariasTxt[index].nombre = nombre;
      if (direccion) veterinariasTxt[index].direccion = direccion;

      // Guardamos los cambios en el archivo
      try {
        fs.writeFileSync(
          "veterinarias.txt",
          JSON.stringify(veterinariasTxt, null, 2),
          "utf8"
        );
        console.log("Veterinaria modificada con éxito!");
      } catch (error) {
        console.error("Error al guardar el archivo:", error);
      }
    } else {
      console.log("Veterinaria no encontrada.");
    }
  }

  public darAltaVeterinaria(veterinaria: Veterinaria): void {
    this.veterinarias.push(veterinaria);
  }

  public darBajaVeterinaria(id: number): void {
    let data: string;
    try {
      data = fs.readFileSync("veterinarias.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const veterinariasTxt: {
      id: number;
      nombre: string;
      direccion: string;
      clientes: {
        id: number;
        nombre: string;
        telefono: string;
        visitas: number;
        esVip: boolean;
      }[];
      pacientes: { nombre: string; especie: string; idDuenio: number }[];
    }[] = JSON.parse(data);

    const veterinariaIndex: number = veterinariasTxt.findIndex(
      (vet) => vet.id === id
    );

    if (veterinariaIndex === -1) {
      console.error("No se encontró la veterinaria con el ID proporcionado.");
      return;
    }

    const veterinariaEliminada = veterinariasTxt.splice(veterinariaIndex, 1);

    try {
      fs.writeFileSync(
        "veterinarias.txt",
        JSON.stringify(veterinariasTxt, null, 2),
        "utf8"
      );
      console.log(
        `Veterinaria ${veterinariaEliminada[0].nombre} eliminada con éxito.`
      );
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }

  //Gestionar Proveedor
  public crearProveedor() {
    const nombreProveedor: string = readlineSync.question(
      "Nombre del proveedor: "
    );
    const Telefono: string = readlineSync.question("Telefono: ");

    const nuevoProveedor: Proveedor = new Proveedor(nombreProveedor, Telefono);

    let data: string;
    try {
      data = fs.readFileSync("proveedores.txt", "utf-8");

      if (!data) {
        console.log(
          "El archivo proveedores.txt está vacío, inicializándolo..."
        );
        data = "[]";
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const proveedoresTxt: {
      id: number;
      nombre: string;
      telefono: string;
    }[] = JSON.parse(data);

    const proveedorExistente = proveedoresTxt.find(
      (prov) => prov.nombre === nombreProveedor
    );

    if (proveedorExistente) {
      console.log("Ya existe un proveedor con ese nombre.");
      return [];
    }

    // Agregamos la nueva veterinaria al arreglo
    const nuevoProveedorData = {
      id: nuevoProveedor.getId(),
      nombre: nuevoProveedor.getNombre(),
      telefono: nuevoProveedor.getTelefono(),
    };

    proveedoresTxt.push(nuevoProveedorData);

    // Guardamos los datos actualizados en el archivo
    try {
      fs.writeFileSync(
        "proveedores.txt",
        JSON.stringify(proveedoresTxt, null, 2),
        "utf8"
      );
      console.log("Proveedor creada exitosamente!");
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }

    this.agregarProveedor(nuevoProveedor);
  }

  public agregarProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
  }

  public modificarProveedor(id: number, nombre?: string, telefono?: string) {
    const proveedor = this.proveedores.find((pr) => pr.getId() === id);
    if (proveedor) {
      if (nombre) proveedor.setNombre(nombre);
      if (telefono) proveedor.setTelefono(telefono);
    }

    let data: string;
    try {
      data = fs.readFileSync("proveedores.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }

    const proveedoresTxt: {
      id: number;
      nombre: string;
      telefono: string;
    }[] = JSON.parse(data);

    const index: number = proveedoresTxt.findIndex((prov) => prov.id === id);

    if (index !== -1) {
      if (nombre) proveedoresTxt[index].nombre = nombre;
      if (telefono) proveedoresTxt[index].telefono = telefono;

      // Guardamos los cambios en el archivo
      try {
        fs.writeFileSync(
          "proveedores.txt",
          JSON.stringify(proveedoresTxt, null, 2),
          "utf8"
        );
        console.log("Proveedor modificado con éxito!");
      } catch (error) {
        console.error("Error al guardar el archivo:", error);
      }
    } else {
      console.log("Proveedor no encontrada.");
    }
  }

  public eliminarProveedor(id: number): void {
    let data: string;
    try {
      data = fs.readFileSync("proveedores.txt", "utf-8");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    const proveedoresTxt: {
      id: number;
      nombre: string;
      telefono: string;
    }[] = JSON.parse(data);

    const proveedorIndex = proveedoresTxt.findIndex((prov) => prov.id === id);

    if (proveedorIndex === -1) {
      console.error("No se encontró el proveedor con el ID proporcionado.");
      return;
    }

    const proveedorEliminado = proveedoresTxt.splice(proveedorIndex, 1);

    try {
      fs.writeFileSync(
        "proveedores.txt",
        JSON.stringify(proveedoresTxt, null, 2),
        "utf8"
      );
      console.log(
        `Proveedor ${proveedorEliminado[0].nombre} eliminado con éxito.`
      );
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }

  public getVeterinarias() {
    try {
      // Leemos el archivo veterinarias.txt de forma síncrona
      const data = fs.readFileSync("veterinarias.txt", "utf-8");

      if (!data) {
        console.log("El archivo esta vacio");
        return [];
      }

      // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
      const veterinariasTxt: {
        nombre: string;
        direccion: string;
        id: number;
      }[] = JSON.parse(data);

      // Convertimos los objetos del JSON en instancias de la clase Veterinaria
      const listaVeterinarias: Veterinaria[] = veterinariasTxt.map(
        (vete) => new Veterinaria(vete.nombre, vete.direccion, vete.id) // Creamos la instancia de Veterinaria pasando el id
      );
      // Mostramos la información de las veterinarias
      listaVeterinarias.forEach((veterinaria, i) => {
        console.log("---");
        console.log(`Veterinaria ${i + 1}:`);
        console.log(`ID: ${veterinaria.getId()}`);
        console.log(`Nombre: ${veterinaria.getNombre()}`);
        console.log(`Dirección: ${veterinaria.getDireccion()}`);
        console.log("---");
      });
    } catch (err) {
      console.error(
        "Error al leer o parsear el archivo veterinarias.txt:",
        err
      );
      return [];
    }
  }

  public getProveedores() {
    try {
      // Leemos el archivo proveedores.txt de forma síncrona
      const data = fs.readFileSync("proveedores.txt", "utf-8");

      if (!data) {
        console.log("El archivo esta vacio");
        return [];
      }
      // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
      const proveedoresTxt: { id: number; nombre: string; telefono: string }[] =
        JSON.parse(data);

      // Convertimos los objetos del JSON en instancias de la clase proveedores
      const listaProveedores: Proveedor[] = proveedoresTxt.map(
        (prov) => new Proveedor(prov.nombre, prov.telefono) // Creamos la instancia de proveedores pasando el id
      );

      // Mostramos la información de las proveedores
      listaProveedores.forEach((proveedor, i) => {
        console.log("---");
        console.log(`Proveedor ${i + 1}:`);
        console.log(`ID: ${proveedor.getId()}`);
        console.log(`Nombre: ${proveedor.getNombre()}`);
        console.log(`Telefono: ${proveedor.getTelefono()}`);
        console.log("---");
      });
    } catch (err) {
      console.error("Error al leer o parsear el archivo proveedores.txt:", err);
      return [];
    }
  }
}
