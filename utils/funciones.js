import { Veterinaria } from '../models/veterinaria.ts'
import { RedVeterinaria } from '../models/RedVeterinaria.ts'
import { Proveedor } from '../models/Proveedor.ts';



export async function cargarDatosDesdeArchivo(archivo, redVeterinaria) {
  try {
    const response = await fetch(archivo); // Espera la respuesta de fetch
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }

    const data = await response.json();

    data.proveedores.forEach(proveedorData => {
      const proveedor = new Proveedor(proveedorData.id, proveedorData.nombre, proveedorData.telefono);
      redVeterinaria.proveedores.push(proveedor);
    });

    data.veterinarias.forEach(veterinariaData => {
      const veterinaria = new Veterinaria(veterinariaData.id, veterinariaData.nombre, veterinariaData.direccion);
      redVeterinaria.veterinarias.push(veterinaria);
    });



  } catch (error) {
    console.error('Error cargando el archivo JSON:', error);
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
