
import { Veterinaria } from '../models/veterinaria.ts'
import { crearBoton } from '../utils/elementos.js';
import { panelAgregarVet } from '../utils/paneles.js';
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




  const btnMostrarVet = crearBoton("Mostrar Lista", "Mostrar", "btn-mostrar");
  const btnAgregarVet = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnModificarVet = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminarVet = crearBoton("Eliminar", "Eliminar", "btn-eliminar");

  btnAgregarVet.addEventListener("click", () => {
    const modalExistente = document.querySelector(".modal-agregar");

    if (!modalExistente) {
      panelAgregarVet();
    }
  })

  desplegable1.appendChild(btnMostrarVet);
  desplegable1.appendChild(btnAgregarVet);
  desplegable1.appendChild(btnModificarVet)
  desplegable1.appendChild(btnEliminarVet);

  const btnMostrarProv = crearBoton("Mostrar Lista", "Mostrar", "btn-mostrar");
  const btnAgregarProv = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnModificarProv = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminarProv = crearBoton("Eliminar", "Eliminar", "btn-eliminar");

  btnAgregarProv.addEventListener("click", () => {

  })

  desplegable2.appendChild(btnMostrarProv);
  desplegable2.appendChild(btnAgregarProv);
  desplegable2.appendChild(btnModificarProv)
  desplegable2.appendChild(btnEliminarProv);


  mostrarMenu1.addEventListener("click", () => {
    desplegable1.classList.toggle("ocultar")
  })

  mostrarMenu2.addEventListener("click", () => {
    desplegable2.classList.toggle("ocultar")
  })


});

