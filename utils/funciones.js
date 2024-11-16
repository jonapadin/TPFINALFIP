import { Veterinaria } from '../models/veterinaria.ts'
import { RedVeterinaria } from '../models/RedVeterinaria.ts'

const url = "../bd/veterinarias.json";

export async function obtenerVeterinarias() {

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }

}

 // Crear instancia de Veterinaria
const gestor1 = new RedVeterinaria();
const veterinaria1 = new Veterinaria("trim", "Juan");

export function agregarVeterinaria() {
  const inputNombre = document.getElementById("inputNombre");
  const inputDireccion = document.getElementById("inputDireccion");
  console.log(inputDireccion, inputNombre);
  

    // Limpiar los campos
  /*nombreVet.value = '';
  direccionVet.value = '';*/
}
