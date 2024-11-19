
import { cargarDatosDesdeArchivo, mostrarMensaje, obtenerVeterinarias } from './funciones.js';
import { RedVeterinaria } from '../models/RedVeterinaria.js';
import { crearBoton, crearDiv, crearInput, crearLabel, crearSection, crearUl } from "./elementos.js";
import { Veterinaria } from "../models/Veterinaria";
document.addEventListener("DOMContentLoaded", async () => {
  const red = new RedVeterinaria(); 
  console.log("Red inicializada:", red);  // Asegúrate de que el objeto red esté bien inicializado
  
  await cargarDatosDesdeArchivo('../bd/data.json', red);

  console.log("Veterinarias después de cargar datos:", red.veterinarias);
  
  mostrarMensaje("Datos cargados exitosamente:");

  // Continue with your event listener for "Agregar" button
  const mostrarMenu1 = document.getElementById("mostrarMenu1");

  mostrarMenu1.addEventListener("click", () => {
    const modalExistente = document.querySelector("mostrarMenu1");

    if (!modalExistente) {
      verListaVeterinaria(red);
    }
  });
});



// paneles
export function panelAgregarVet(red) {
  const contenedor = crearSection("modal-agregar-vet", "modal-agregar");
  const div = crearDiv();

  const divContenedorDireccion = crearDiv();
  const labelDireccion = crearLabel("Direccion");
  const inputDireccion = crearInput("inputDireccion", "inp", "text", "Ej. Calle 1234");

  contenedor.appendChild(div);
  div.appendChild(divContenedorDireccion);
  divContenedorDireccion.appendChild(labelDireccion);
  divContenedorDireccion.appendChild(inputDireccion);


  const div2 = crearDiv()
  const divContenedorNombre = crearDiv();
  const labelNombre = crearLabel("Nombre:");
  const inputNombre = crearInput("inputNombre", "inp", "text", "Juan Perez");

  const btnAgregar = crearBoton("Agregar", "btnAgregar", "btn-primario", "button");
  btnAgregar.classList.add("mx-2");

  btnAgregar.addEventListener("click", () => {
    
    
    
    const nombre = inputNombre.value.trim();
    const direccion = inputDireccion.value.trim();
  
    if (!nombre || !direccion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Verifica si la red está correctamente pasada
    console.log("Antes de agregar nueva veterinaria:", red);
  
    if (red && red.darAltaVeterinaria) {
      // Crear una nueva veterinaria
      const id = `vet-${Date.now()}`;
      const nuevaVeterinaria = new Veterinaria(id, nombre, direccion);
  
      // Agregar la nueva veterinaria a la red
      red.darAltaVeterinaria(nuevaVeterinaria);
  
      // Actualizar la lista visualmente
      const listaVeterinarias = document.getElementById("listaVet");
      if (listaVeterinarias) {
        const li = document.createElement("li");
        li.classList.add("flex", "item");
        li.innerText = `ID: ${id}, Nombre: ${nuevaVeterinaria.nombre}, Dirección: ${nuevaVeterinaria.direccion}`;
        listaVeterinarias.appendChild(li);
      }
  
      // Limpiar los campos de entrada
      inputNombre.value = "";
      inputDireccion.value = "";
    } else {
      console.error("No se pudo acceder al método darAltaVeterinaria.");
    }
  });

  const btnCancelar = crearBoton("Cancelar", "btnCancelar", "btn-eliminar", "button");
  btnCancelar.addEventListener("click", () => {
    const modal = document.getElementById("modal-agregar-vet");
    if (modal) {
      modal.remove();
    }
  })

  contenedor.appendChild(div2);
  contenedor.appendChild(btnAgregar);
  contenedor.appendChild(btnCancelar);
  div2.appendChild(divContenedorNombre);
  divContenedorNombre.appendChild(labelNombre);
  divContenedorNombre.appendChild(inputNombre);

  document.body.appendChild(contenedor);

  return contenedor;
}




export async function verListaVeterinaria(red) {
  try {
    const listaVeterinas = await obtenerVeterinarias();
    console.log(listaVeterinas);
    const contenedorLayout = crearSection("contenedorLayout", "modal-panel");
    const divContenedor = crearDiv("div-contenedor", "centrar-contenedor");
    divContenedor.classList.add("divContenedor");
    const contenedor = crearSection("contenedorVet", "centrar-contenedor");
    const div = crearDiv();
    const contenedorDeLista = crearUl("listaVet", "");
    listaVeterinas.forEach(veterinaria => {
      const li = document.createElement("li");
      li.classList.add("flex");
      li.classList.add("item");
      const lNombre = crearLabel("Nombre:", "", "lNombre");
      const nombreVet = document.createElement("h2");
      nombreVet.textContent = veterinaria.nombre;
      nombreVet.classList.add("mx-2");
      const lDireccion = crearLabel("Direccion:", "", "lDireccion");
      const direcVet = document.createElement("h2");
      direcVet.classList.add("mx-2");
      direcVet.textContent = veterinaria.direccion;
      const btnModificarVet = crearBoton("Modificar", "modificar", "btn-modificar");
      btnModificarVet.classList.add("mx-2");
      const btnEliminarVet = crearBoton("Eliminar", "Eliminar", "btn-eliminar");
      li.appendChild(lNombre);
      li.appendChild(nombreVet);
      li.appendChild(lDireccion);
      li.appendChild(direcVet);
      li.appendChild(btnModificarVet);
      li.appendChild(btnEliminarVet);
      contenedorDeLista.appendChild(li);
      // Eliminar veterinaria
      btnEliminarVet.addEventListener("click", () => {
        red.darBajaVeterinaria(veterinaria.id);
        li.remove();
        mostrarMensaje(`Veterinaria ${veterinaria.nombre} eliminada!`);
      });
      // Modificar veterinaria
      btnModificarVet.addEventListener("click", () => {
    // Encuentra la veterinaria correspondiente al ID
  const veterinaria = red.veterinarias.find(vet => vet.id === vet.getId()); // Suponiendo que 'veterinariaId' es el ID de la veterinaria que estás intentando modificar
  if (!veterinaria) {
    console.error("Veterinaria no encontrada");
    return;
  }
  // Ahora puedes usar la veterinaria sin problemas
  const nombreModificado = inputNombre.value.trim();
  const direccionModificada = inputDireccion.value.trim();
  if (!nombreModificado || !direccionModificada) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  // Modificar la veterinaria
  red.modificarVeterinaria(veterinaria.id, nombreModificado, direccionModificada);
  // Actualizar visualmente la lista
  nombreVet.textContent = nombreModificado;
  direcVet.textContent = direccionModificada;
  // Limpiar los campos de entrada
  inputNombre.value = "";
  inputDireccion.value = "";
  // Cerrar el modal después de guardar los cambios
  const modal = document.getElementById("modal-modificar-vet");
  if (modal) {
    modal.remove();
  }
  mostrarMensaje("Veterinaria modificada exitosamente.");
      });
    });
    
    // Botones adicionales
    const btnAgregarVet = crearBoton("Agregar", "Agregar", "btn-mostrar");
    btnAgregarVet.classList.add("mx-2");
    const btnBorrarList = crearBoton("Borrar lista", "btnSalirModal", "btn-eliminar");
    btnBorrarList.classList.add("mx-2");
    const btnCancelarList = crearBoton("Salir", "btnSalir", "btn-primario");
    btnCancelarList.classList.add("mx-2");
    contenedorLayout.appendChild(divContenedor);
    divContenedor.appendChild(contenedor);
    contenedor.appendChild(contenedorDeLista);
    contenedor.appendChild(div);
    div.appendChild(btnAgregarVet);
    div.appendChild(btnBorrarList);
    div.appendChild(btnCancelarList);
    btnAgregarVet.addEventListener("click", () => {
      const modal = document.getElementById("modal-agregar-vet");
      if (!modal) {
        panelAgregarVet(red);
      }
    });
    btnCancelarList.addEventListener("click", () => {
      const modal = document.getElementById("contenedorLayout");
      if (modal) {
        modal.remove();
      }
    });
    document.body.appendChild(contenedorLayout);
  } catch (error) {
    console.error('Error al cargar veterinarias:', error);
  }
}
function mostrarFormularioModificar(veterinaria, red) {
  const contenedorFormulario = crearSection("modal-modificar-vet", "modal-modificar");
  const div = crearDiv();
  const labelNombre = crearLabel("Nombre:", "", "lNombre");
  const inputNombre = crearInput("inputNombre", "inp", "text", veterinaria.nombre);
  const labelDireccion = crearLabel("Direccion:", "", "lDireccion");
  const inputDireccion = crearInput("inputDireccion", "inp", "text", veterinaria.direccion);
  const btnGuardar = crearBoton("Guardar cambios", "btnGuardar", "btn-primario", "button");
  const btnCancelar = crearBoton("Cancelar", "btnCancelar", "btn-eliminar", "button");
  btnGuardar.addEventListener("click", () => {
    const nuevoNombre = inputNombre.value.trim();
    const nuevaDireccion = inputDireccion.value.trim();
    if (!nuevoNombre || !nuevaDireccion) {
      alert("Por favor, complete ambos campos.");
      return;
    }
    // Actualizar los datos de la veterinaria
    veterinaria.setNombre(nuevoNombre);
    veterinaria.setDireccion(nuevaDireccion);
    // Actualizar la veterinaria en la red
    red.darAltaVeterinaria(veterinaria);
    // Volver a cargar la lista
    verListaVeterinaria(red);
    // Cerrar el modal
    const modal = document.getElementById("modal-modificar-vet");
    if (modal) {
      modal.remove();
    }
    mostrarMensaje("Veterinaria actualizada correctamente.");
  });
  btnCancelar.addEventListener("click", () => {
    const modal = document.getElementById("modal-modificar-vet");
    if (modal) {
      modal.remove();
    }
  });
  div.appendChild(labelNombre);
  div.appendChild(inputNombre);
  div.appendChild(labelDireccion);
  div.appendChild(inputDireccion);
  div.appendChild(btnGuardar);
  div.appendChild(btnCancelar);
  contenedorFormulario.appendChild(div);
  document.body.appendChild(contenedorFormulario);
}