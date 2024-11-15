
import { Veterinaria } from '../models/veterinaria.ts'
document.addEventListener("DOMContentLoaded", () => {

  const mostrarMenu1 = document.getElementById("mostrarMenu1");
  const mostrarMenu2 = document.getElementById("mostrarMenu2");

  const resultadoDiv = document.getElementById("resultado");
  const desplegable1 = document.getElementById("desplegable1");
  const desplegable2 = document.getElementById("desplegable2");


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



  function crearBoton(label = "", id = "", clase = '') {

    const btn = document.createElement("button");

    // Asignar el id al botón
    btn.id = id;

    btn.classList.add(clase);

    // Asignar el texto del botón
    btn.textContent = label;


    // Devolver el botón creado
    return btn;
  }


  const btnMostrarVet = crearBoton("Mostrar Lista", "Mostrar", "btn-mostrar");
  const btnAgregarVet = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnModificarVet = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminarVet = crearBoton("Eliminar", "Eliminar", "btn-eliminar");

  desplegable1.appendChild(btnMostrarVet);
  desplegable1.appendChild(btnAgregarVet);
  desplegable1.appendChild(btnModificarVet)
  desplegable1.appendChild(btnEliminarVet);

  const btnMostrarProv = crearBoton("Mostrar Lista", "Mostrar", "btn-mostrar");
  const btnAgregarProv = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnModificarProv = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminarProv = crearBoton("Eliminar", "Eliminar", "btn-eliminar");

  desplegable2.appendChild(btnMostrarProv);
  desplegable2.appendChild(btnAgregarProv);
  desplegable2.appendChild(btnModificarProv)
  desplegable2.appendChild(btnEliminarProv);

  //Eventos
  mostrarMenu1.addEventListener("click", () => {
    desplegable1.classList.toggle("ocultar")
  })

  mostrarMenu2.addEventListener("click", () => {
    desplegable2.classList.toggle("ocultar")
  })


});

