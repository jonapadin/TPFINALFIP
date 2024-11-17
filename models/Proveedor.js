export class Proveedor {
  constructor(id, nombre, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
  }

  getId() {
    return this.id;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setTelefono(telefono) {
    this.telefono = telefono;
  }
}
