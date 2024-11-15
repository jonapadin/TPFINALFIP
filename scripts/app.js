import { testFunction } from '../models/test.ts';
import { Veterinaria } from '../models/veterinaria.ts'
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world");

  testFunction()

  const nombreVet = document.getElementById("veterinaria");
  const direccionVet = document.getElementById("direccionVet");
  const btnAgreVet = document.getElementById("btnAgregarVet");
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


  btnAgreVet.addEventListener("click", agregarVeterinaria);

});

