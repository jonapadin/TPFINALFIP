
import { Veterinaria } from '../models/veterinaria.ts'
import { crearBoton } from '../utils/elementos.js';
import { verListaVeterinaria } from '../utils/paneles.js';


document.addEventListener("DOMContentLoaded", () => {

  // menu desplegable
  const mostrarMenu1 = document.getElementById("mostrarMenu1");
  const mostrarMenu2 = document.getElementById("mostrarMenu2");
  const desplegable1 = document.getElementById("desplegable1");
  const desplegable2 = document.getElementById("desplegable2");

  const resultadoDiv = document.getElementById("resultado");

  // Crear instancia de Veterinaria
  const veterinaria1 = new Veterinaria();

  function agregarVeterinaria() {
    const nombre = nombreVet.value.trim();
    const direccion = direccionVet.value.trim();

    if (nombre && direccion) {

      veterinaria1.nombre = nombre;
      veterinaria1.direccion = direccion;

      // Mostrar los datos en el HTML
      resultadoDiv.innerHTML = `
        <h3>Veterinaria Registrada:</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
      `;
    } else {
      resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, completa ambos campos.</p>";
    }

    // Limpiar los campos
    nombreVet.value = '';
    direccionVet.value = '';
  }

  mostrarMenu1.addEventListener("click", () => {
    const modalExistente = document.querySelector("mostrarMenu1");

    if (!modalExistente) {
      verListaVeterinaria();
    }
  })


});
