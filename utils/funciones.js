import { Veterinaria } from '../models/veterinaria.ts'
import { RedVeterinaria } from '../models/RedVeterinaria.ts'

const url = "../bd/data.json";

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
const veterinaria1 = new Veterinaria("trim", "Juan");
const gestor1 = new RedVeterinaria();

export function agregarVeterinaria() {
  gestor1.darAltaVeterinaria(veterinaria1);
  gestor1.getVeterinarias()
  console.log(gestor1);


  // Limpiar los campos
  nombreVet.value = '';
  direccionVet.value = '';
}
