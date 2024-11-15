
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


  const btnMostrar = crearBoton("Mostrar Lista", "Mostrar", "btn-mostrar");
  const btnAgregar = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnModificar = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminar = crearBoton("Eliminar", "Eliminar", "btn-eliminar");

  desplegable1.appendChild(btnMostrar);
  desplegable1.appendChild(btnAgregar);
  desplegable1.appendChild(btnModificar)
  desplegable1.appendChild(btnEliminar);


  //Eventos
  mostrarMenu1.addEventListener("click", () => {
    desplegable1.classList.toggle("ocultar")
  })

  mostrarMenu2.addEventListener("click", () => {
    desplegable2.classList.toggle("ocultar")
  })


});

