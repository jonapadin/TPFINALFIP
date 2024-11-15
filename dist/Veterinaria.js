export default class Veterinaria {
    constructor(nombre, direccion) {
        this.clientes = [];
        this.pacientes = [];
        this.id = Math.floor(Math.random() * 1000);
        this.nombre = nombre;
        this.direccion = direccion;
    }
    agregarCliente(cliente) {
        this.clientes.push(cliente);
    }
    modificarCliente(id, nombre, telefono) {
        const cliente = this.clientes.find(c => c.getId() === id);
        if (cliente) {
            if (nombre)
                cliente.setNombre(nombre);
            if (telefono)
                cliente.setTelefono(telefono);
        }
    }
    eliminarCliente(id) {
        this.clientes = this.clientes.filter((c => c.getId() !== id));
    }
    agregarPaciente(pacientes) {
        this.pacientes.push(pacientes);
    }
    modificarPaciente(id, nombre, especie) {
        const paciente = this.pacientes.find(pac => pac.getIdDuenio() === id);
        if (paciente) {
            if (nombre)
                paciente.setNombre(nombre);
            if (especie)
                paciente.setEspecie(especie);
        }
    }
    eliminarPaciente(id) {
        this.pacientes = this.pacientes.filter((pac => pac.getIdDuenio() !== id));
    }
    setId(id) {
        this.id = id;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setDireccion(direccion) {
        this.direccion = direccion;
    }
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getDireccion() {
        return this.direccion;
    }
}
