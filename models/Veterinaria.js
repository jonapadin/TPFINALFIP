export class Veterinaria {
  constructor(id, nombre, direccion) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
  }

  getId() {
    return this.id;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setDireccion(direccion) {
    this.direccion = direccion;
  }
}
