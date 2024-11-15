export class Paciente {
    constructor(nombre, especie, idDuenio) {
        this.nombre = nombre;
        this.especie = (especie === "Perro" || especie === "Gato") ? especie : "Exotica";
        this.idDuenio = idDuenio;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getEspecie() {
        return this.especie;
    }
    setEspecie(especie) {
        this.especie = especie;
    }
    getIdDuenio() {
        return this.idDuenio;
    }
    setIdDuenio(idDuenio) {
        this.idDuenio = idDuenio;
    }
}
