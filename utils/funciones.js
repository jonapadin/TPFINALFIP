import { Veterinaria } from "../models/Veterinaria.js"
import { Proveedor } from "../models/Proveedor.js";



export async function cargarDatosDesdeArchivo(archivo, red) {
  try {
    const response = await fetch(archivo);
    const data = await response.json();

    // Llenar la red de veterinarias y proveedores con los datos del archivo
    const veterinarias = data.veterinarias.map(vetData => new Veterinaria(vetData.id, vetData.nombre, vetData.direccion));
    const proveedores = data.proveedores.map(prData => new Proveedor(prData.id, prData.nombre, prData.telefono));

    // Actualizar la red
    red.veterinarias = veterinarias;
    red.proveedores = proveedores;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}


export function mostrarMensaje(mensaje) {
  console.log(mensaje);
}

export async function obtenerVeterinarias() {
  try {
    const response = await fetch('../bd/data.json');
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.veterinarias;
  } catch (error) {
    console.error('Error al obtener veterinarias:', error);
  }
}




// Crear instancia de Veterinaria
//const veterinaria1 = new Veterinaria("trim", "Juan");
//const gestor1 = new RedVeterinaria();

// export function agregarVeterinaria() {
//   gestor1.darAltaVeterinaria(veterinaria1);
//   gestor1.getVeterinarias()
//   console.log(gestor1);
//
//
//   // Limpiar los campos
//   nombreVet.value = '';
//   direccionVet.value = '';
// }
