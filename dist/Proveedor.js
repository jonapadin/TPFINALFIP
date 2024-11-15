export class Proveedor {
    constructor(nombre, telefono) {
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.telefono = telefono;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getTelefono() {
        return this.telefono;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }
}
