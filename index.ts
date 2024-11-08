import { Cliente } from "./models/Cliente";
import { Paciente } from "./models/Paciente";
import { Proveedor } from "./models/Proveedor";
import { Veterinaria } from "./models/Veterinaria";


let veterinaria1 = new Veterinaria("scooby", "Av libertador 2323");

let proveedor1 = new Proveedor("Pedro", 665298);

let cliente1 = new Cliente("Omar", "AvBaltica 2323,54654", 3)

let paciente1 = new Paciente("Firulai", "anfiel2334", 545646, true, 6, "Perro", cliente1.getId())

veterinaria1.agregarCliente(cliente1);
veterinaria1.agregarProveedor(proveedor1);
veterinaria1.agregarPaciente(paciente1);

console.log(veterinaria1);

veterinaria1.eliminarCliente(1);

console.log(veterinaria1);

veterinaria1.modificarProveedor(proveedor1.getId(), "pepe", 23232323)

console.log(veterinaria1);



