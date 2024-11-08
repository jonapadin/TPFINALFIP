import { Cliente } from "./models/Cliente";
import { Paciente } from "./models/Paciente";
import { Proveedor } from "./models/Proveedor";
import { Veterinaria } from "./models/Veterinaria";


let veterinaria1 = new Veterinaria(1, "scooby", "Libertador 3200", 6545646);

let proveedor1 = new Proveedor(1, "Pedro", 665298);

let cliente1 = new Cliente(1, "Omar", "AvBaltica 2323,54654", 3)

let paciente1 = new Paciente(3, "Firulai", "anfiel2334", 545646, true, 6, "Perro", cliente1.getId())

veterinaria1.agregarCliente(cliente1);
veterinaria1.agregarProveedor(proveedor1);
veterinaria1.agregarPaciente(paciente1);

console.log(veterinaria1);

